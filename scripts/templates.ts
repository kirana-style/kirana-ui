/**
 * The project skeletons Get Code offers, written into the site's static files: every combination
 * the catalog allows (`packages/create`), each composed from its app, tooling and workspace layers
 * and packed as `templates/<id>.tgz`, which `giget` unpacks; and `templates/index.json`, the list
 * with each skeleton's choices, for a registry client that would start from one (KF-108).
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

import { TEMPLATES_PATH } from "../packages/create/src/catalog"
import { everySkeleton, skeletonId } from "../packages/create/src/choices"
import { composeProject } from "../packages/create/src/compose"
import { tar } from "../packages/create/src/tar"
import { PACKAGE_MANAGERS } from "../packages/create/src/versions"
import type { PackageManagerName } from "../packages/create/src/versions"

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
let count = 0
/** A Turborepo once per package manager it can name; the others once. */
const variants = (monorepo: string): (PackageManagerName | undefined)[] =>
  monorepo === "turbo"
    ? (Object.keys(PACKAGE_MANAGERS) as PackageManagerName[])
    : [undefined]
const fileOf = (id: string, packageManager?: PackageManagerName) =>
  packageManager ? `${id}.${packageManager}.tgz` : `${id}.tgz`
for (const skeleton of skeletons) {
  const id = skeletonId(skeleton)
  for (const packageManager of variants(skeleton.monorepo)) {
    const archive = gzipSync(
      tar(composeProject(skeleton, versions, { packageManager }), id),
      { level: 9 }
    )
    writeFileSync(join(out, fileOf(id, packageManager)), archive)
    bytes += archive.length
    count += 1
  }
}
writeFileSync(
  join(out, "index.json"),
  `${JSON.stringify(
    {
      versions,
      skeletons: skeletons.map((skeleton) => ({
        id: skeletonId(skeleton),
        ...skeleton,
        files: variants(skeleton.monorepo).map(
          (packageManager) =>
            `${TEMPLATES_PATH}/${fileOf(skeletonId(skeleton), packageManager)}`
        ),
      })),
    },
    null,
    2
  )}\n`
)
console.log(
  `templates: ${skeletons.length} skeletons in ${count} files, ${(bytes / 1024).toFixed(0)} KB, in ${out}`
)
