/**
 * The project skeletons Get Code offers, written into the site's static files beside the registry:
 * every combination the catalog allows (`packages/create`), each composed from its app, tooling
 * and workspace layers and packed as `r/templates/<id>.tgz`, and `r/templates/index.json`, the
 * list in Kirana's registry-templates schema, which `kirana-style ui init --template
 * @kirana/<id>` reads next to the registry's index (each archive relative to it).
 *
 *   bun scripts/templates.ts [<out dir>]   # what `vp run templates` runs; default apps/site/dist/client
 *
 * Kirana's and Vite+'s releases are this repository's (the catalog in package.json).
 */
import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs"
import { join } from "node:path"
import { gzipSync } from "node:zlib"

import {
  MONOREPO_LABELS,
  TEMPLATES_PATH,
  TEMPLATE_LABELS,
  TOOLING_LABELS,
} from "../packages/create/src/catalog"
import { everySkeleton, skeletonId } from "../packages/create/src/choices"
import { composeProject } from "../packages/create/src/compose"
import { tar } from "../packages/create/src/tar"

const ROOT = join(import.meta.dirname, "..")
const out = join(
  process.argv[2] ?? join(ROOT, "apps", "site", "dist", "client"),
  TEMPLATES_PATH
)

const catalog = (
  JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8")) as {
    workspaces: { catalog: Record<string, string> }
  }
).workspaces.catalog
const versions = {
  kirana: catalog["@kirana-style/core"]!,
  vitePlus: catalog["vite-plus"]!,
}

if (existsSync(out)) rmSync(out, { recursive: true })
mkdirSync(out, { recursive: true })
const skeletons = everySkeleton()
let bytes = 0
for (const skeleton of skeletons) {
  const id = skeletonId(skeleton)
  const archive = gzipSync(tar(composeProject(skeleton, versions), id), {
    level: 9,
  })
  writeFileSync(join(out, `${id}.tgz`), archive)
  bytes += archive.length
}
/** A skeleton's title, as the dialog names its parts. */
const titleOf = (skeleton: (typeof skeletons)[number]) =>
  [
    TEMPLATE_LABELS[skeleton.template],
    skeleton.monorepo === "none"
      ? undefined
      : `in a ${MONOREPO_LABELS[skeleton.monorepo]}`,
    `with ${TOOLING_LABELS[skeleton.tooling]}`,
  ]
    .filter(Boolean)
    .join(" ")
writeFileSync(
  join(out, "index.json"),
  `${JSON.stringify(
    {
      $schema: "https://kirana.style/schema/registry-templates.json",
      templates: skeletons.map((skeleton) => ({
        name: skeletonId(skeleton),
        title: titleOf(skeleton),
        file: `${skeletonId(skeleton)}.tgz`,
        meta: { ...skeleton, versions },
      })),
    },
    null,
    2
  )}\n`
)
console.log(
  `templates: ${skeletons.length} skeletons, ${(bytes / 1024).toFixed(0)} KB, in ${out}`
)
