/**
 * Regenerates the docs content: `bun run generate:content`. The engine is `@workspace/docs-core`;
 * this file only says where the site's content lives and how its `llms.txt` introduces it. The
 * output is not committed: `predev`, `prebuild` and the workspace's `content` task write it.
 */
import { existsSync, readFileSync, readdirSync } from "node:fs"

import { generate } from "@workspace/docs-core/generate.ts"

import { VARIANTS } from "../src/lib/variants.ts"
import { FRAMEWORK_BASES, ITEMS } from "../../../packages/builder/src/items.ts"

/**
 * Pages that are guides to building a component from others, as upstream's: no item of their own,
 * so they take the variants of the one they build on.
 */
const BUILT_ON: Record<string, string> = {
  "data-table": "table",
  "date-picker": "calendar",
}

/**
 * The variants a component's markup exists in, by the registry's items: a page documents exactly
 * those (`checkVariants`).
 */
function markupOf(name: string): string[] | undefined {
  const item = ITEMS.find((entry) => entry.name === (BUILT_ON[name] ?? name))
  if (!item) return undefined
  return FRAMEWORK_BASES.filter((entry) =>
    item.files({ ...entry, id: `${entry.bases}-nova`, style: "nova" })
  ).map((entry) => `${entry.framework}/${entry.base}`)
}

/**
 * The variants an AI Elements page can have: React's bases with every demo it previews, since a
 * pattern is a composition of components and has no item of its own.
 */
function patternMarkup(name: string): string[] | undefined {
  const page = new URL(
    `../content/docs/ai-elements/${name}.md`,
    import.meta.url
  )
  if (!existsSync(page)) return undefined
  const demos = [
    ...readFileSync(page, "utf8").matchAll(/::preview item="([^"]+)"/g),
  ].map((match) => match[1])
  return ["base", "aria"]
    .filter((base) =>
      demos.every((demo) =>
        existsSync(
          new URL(
            `../../../registry/bases/react-${base}/examples/${demo}.tsx`,
            import.meta.url
          )
        )
      )
    )
    .map((base) => `react/${base}`)
}

/** A section's pages but its index, in the nav's order (`content/docs/<section>/`). */
function sectionPages(section: string) {
  const folder = new URL(`../content/docs/${section}/`, import.meta.url)
  if (!existsSync(folder)) return []
  return readdirSync(folder)
    .filter((file) => file.endsWith(".md") && file !== "index.md")
    .map((file) => {
      const text = readFileSync(new URL(file, folder), "utf8")
      return {
        title: /^title: (.+)$/m.exec(text)?.[1] ?? file.slice(0, -3),
        description: /^description: (.+)$/m.exec(text)?.[1] ?? "",
        href: `/docs/${section}/${file.slice(0, -3)}`,
      }
    })
    .sort((left, right) => left.title.localeCompare(right.title))
}

/** The component pages, by title, and whether each is new (`new: true`), for the list's twin. */
function componentPages() {
  const folder = new URL("../content/docs/components/", import.meta.url)
  return readdirSync(folder)
    .filter((file) => file.endsWith(".md") && file !== "index.md")
    .map((file) => {
      const text = readFileSync(new URL(file, folder), "utf8")
      return {
        name: file.slice(0, -3),
        title: /^title: (.+)$/m.exec(text)?.[1] ?? file.slice(0, -3),
        new: /^new: true$/m.test(text),
      }
    })
    .sort((left, right) => left.title.localeCompare(right.title))
}

await generate({
  root: new URL("..", import.meta.url).pathname,
  typesImport: "@/lib/content",
  generatedBy: "scripts/generate-content.ts",
  regenerateCommand: "bun run generate:content",
  check: process.argv.includes("--check"),
  variants: VARIANTS,
  checkVariants: (href, variants) => {
    const component = /^\/docs\/components\/([^/]+)$/.exec(href)?.[1]
    const pattern = /^\/docs\/ai-elements\/([^/]+)$/.exec(href)?.[1]
    const markup = component
      ? markupOf(component)
      : pattern
        ? patternMarkup(pattern)
        : undefined
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
    // The components list, from the pages themselves, as the page draws it.
    "components-list": ({ variant }) =>
      componentPages()
        .filter((page) => variant !== "new" || page.new)
        .map((page) => `- [${page.title}](/docs/components/${page.name})`)
        .join("\n"),
    // A section's pages as cards: each linked, with its description.
    "section-cards": ({ section }) =>
      sectionPages(section ?? "")
        .map((page) => `- [${page.title}](${page.href}): ${page.description}`)
        .join("\n"),
    // An illustration is its picture, with its caption.
    figure: ({ light, alt, caption }) =>
      `![${alt ?? ""}](https://ui.kirana.style${light ?? ""})${caption ? `\n\n${caption}` : ""}`,
    // A language model reads the preview as a link to the page that draws the item.
    preview: ({ item, combinations }) =>
      `[Preview: ${item}](https://ui.kirana.style/preview/${combinations?.split(",")[0] ?? "react/base"}/${item})`,
    // The Installation section: the command, then where the manual steps' files are. A pattern
    // names the components it is built from, the first its own.
    installation: ({ name = "", combinations }) => {
      const variant = combinations?.split(",")[0] ?? "react/base"
      const names = name.split(/\s+/).filter(Boolean)
      const first = names[0] ?? name
      return [
        "```bash",
        `npx kirana-style ui add ${names.join(" ")}`,
        "```",
        ...(variant.startsWith("react/")
          ? [
              "",
              "Or with shadcn/ui's CLI, from the registry's export:",
              "",
              "```bash",
              `npx shadcn@latest add ${names.map((each) => `@kirana/${each}`).join(" ")}`,
              "```",
            ]
          : []),
        "",
        `To install it by hand, copy its files from [${first}.json](/r/${first}.json), every framework and base in every style, into a project set up with \`kirana-style ui init\`.`,
      ].join("\n")
    },
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
