/**
 * Regenerates the docs content: `bun run generate:content`. The engine is `@workspace/docs-core`;
 * this file only says where the site's content lives and how its `llms.txt` introduces it. The
 * output is not committed: `predev`, `prebuild` and the workspace's `content` task write it.
 */
import { generate } from "@workspace/docs-core/generate.ts"

import { VARIANTS } from "../src/lib/variants.ts"
import { FRAMEWORK_BASES, ITEMS } from "../../../packages/builder/src/items.ts"

/**
 * The variants a component's markup exists in, by the registry's items: a page documents exactly
 * those (`checkVariants`).
 */
function markupOf(name: string): string[] | undefined {
  const item = ITEMS.find((entry) => entry.name === name)
  if (!item) return undefined
  return FRAMEWORK_BASES.filter((entry) =>
    item.files({ ...entry, id: `${entry.bases}-nova`, style: "nova" })
  ).map((entry) => `${entry.framework}/${entry.base}`)
}

await generate({
  root: new URL("..", import.meta.url).pathname,
  typesImport: "@/lib/content",
  generatedBy: "scripts/generate-content.ts",
  regenerateCommand: "bun run generate:content",
  check: process.argv.includes("--check"),
  variants: VARIANTS,
  checkVariants: (href, variants) => {
    const name = /^\/docs\/components\/([^/]+)$/.exec(href)?.[1]
    const markup = name ? markupOf(name) : undefined
    if (!markup)
      return `${href} lists variants, but no registry item is named for it`
    const expected = VARIANTS.map((variant) => variant.id).filter((id) =>
      markup.includes(id)
    )
    return expected.join() === variants.join()
      ? undefined
      : `its variants (${variants.join(", ")}) differ from the frameworks and bases its markup is in, in order (${expected.join(", ")})`
  },
  plain: {
    // The links between a component's frameworks: the twin's header names them instead.
    frameworks: () => "",
    // A language model reads the preview as a link to the page that draws the item.
    preview: ({ item, combinations }) =>
      `[Preview: ${item}](https://ui.kirana.style/preview/${combinations?.split(",")[0] ?? "react/base"}/${item})`,
    // The code panel reads the item's registry document in the browser; the twin links to it, and
    // to the flattened file shadcn/ui's CLI installs, which a model can read whole.
    "component-code": ({ name, combinations }) => {
      const variant = combinations?.split(",")[0] ?? "react/base"
      return [
        `- Every framework and base, every style: [${name}.json](/r/${name}.json)`,
        // shadcn/ui's CLI installs React only.
        ...(variant.startsWith("react/")
          ? [
              `- Flattened for one combination, as shadcn/ui's CLI installs it: [${variant.replace("/", "-")}-nova/${name}.json](/r/shadcn/${variant.replace("/", "-")}-nova/${name}.json)`,
            ]
          : []),
      ].join("\n")
    },
  },
  site: {
    url: "https://ui.kirana.style",
    fullTitle: "kirana/ui documentation",
    llms: [
      "# kirana/ui",
      "",
      "> shadcn/ui's components, blocks and styles, rebuilt on Kirana's compiled styles and",
      "> installed into your own project with `kirana-style ui` or shadcn/ui's CLI.",
      "",
    ],
  },
})
