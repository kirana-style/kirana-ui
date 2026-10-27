/**
 * Regenerates the docs content: `bun run generate:content`. The engine is `@workspace/docs-core`;
 * this file only says where the site's content lives and how its `llms.txt` introduces it. The
 * output is not committed: `predev`, `prebuild` and the workspace's `content` task write it.
 */
import { generate } from "@workspace/docs-core/generate.ts"

await generate({
  root: new URL("..", import.meta.url).pathname,
  typesImport: "@/lib/content",
  generatedBy: "scripts/generate-content.ts",
  regenerateCommand: "bun run generate:content",
  check: process.argv.includes("--check"),
  plain: {
    // A language model reads the preview as a link to the page that draws the item.
    preview: ({ item }) =>
      `[Preview: ${item}](https://ui.kirana.style/preview/react/base/${item})`,
    // The code panel reads the item's registry document in the browser; the twin links to it, and
    // to the flattened file shadcn/ui's CLI installs, which a model can read whole.
    "component-code": ({ name }) =>
      [
        `- Every framework and base, every style: [${name}.json](/r/${name}.json)`,
        `- Flattened for one combination, as shadcn/ui's CLI installs it: [react-base-nova/${name}.json](/r/shadcn/react-base-nova/${name}.json)`,
      ].join("\n"),
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
