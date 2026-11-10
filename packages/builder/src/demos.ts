/**
 * Each docs demo's code as a project writes it, for the panel under its preview on the docs pages
 * (upstream's "View Code"): `<out>/demos/<item>.json`, its source for every framework and base that
 * has it. The preview's frame comes off (`page.example`, `page.narrow`: what upstream's preview
 * page does around a demo, not the demo's own code), so does the note a port opens with (a leading
 * doc comment, written for whoever keeps the port), its imports go to `kirana-style ui init`'s
 * default aliases, and its icon placeholders resolve for each icon library as `ui add` resolves
 * them; a demo without icons is one source.
 */
import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"

import {
  DEFAULT_ALIASES,
  ICON_LIBRARIES,
  resolveIcons,
} from "@kirana-style/registry"
import type { Framework, IconLibrary } from "@kirana-style/registry"

import type { Combination } from "./items"
import { resolveSource, rewriteImports } from "./registry"

/** A demo's code per `framework/base`: one source, or one per icon library when it draws icons. */
export type DemoCode = Record<
  string,
  string | Partial<Record<IconLibrary, string>>
>

const EXTENSIONS: Record<string, string> = {
  react: ".tsx",
  solid: ".tsx",
  vue: ".vue",
  svelte: ".svelte",
  angular: ".ts",
}

/** The frameworks whose icons Kirana's installer resolves (`resolveIcons`). */
const ICON_FRAMEWORKS: readonly string[] = ["react", "vue"]

/** The frame's handles, as each framework's markup binds a style. */
const FRAME = String.raw`page\.(?:example|narrow)`

/**
 * The demo without the preview's frame: an element that only frames is unwrapped (its children
 * one level out; in JSX, a fragment when it held more than one), one that also has its own style
 * keeps that, and an element the frame narrowed keeps none of it. The import of `page` goes once
 * nothing reads it.
 */
export function withoutFrame(code: string, framework: string): string {
  const jsx = framework === "react" || framework === "solid"
  // `sx={[page.example, own]}` and its kin keep the own style.
  let out = code
    .replace(
      new RegExp(
        String.raw`(\s(?::sx|\[sx\]|sx)=)([{"])\[${FRAME}, ([^\]]+)\]([}"])`,
        "g"
      ),
      (_, attribute, open, rest, close) =>
        rest.includes(",")
          ? `${attribute}${open}[${rest}]${close}`
          : `${attribute}${open}${rest}${close}`
    )
    .replace(
      new RegExp(
        String.raw`(\s(?::sx|\[sx\]|sx)=)([{"])\[([^\]]+), ${FRAME}\]([}"])`,
        "g"
      ),
      (_, attribute, open, rest, close) =>
        rest.includes(",")
          ? `${attribute}${open}[${rest}]${close}`
          : `${attribute}${open}${rest}${close}`
    )
  let lines = out.split("\n")
  const wrapper = new RegExp(
    String.raw`^(\s*)<div (?::sx|\[sx\]|sx)=[{"]${FRAME}[}"]>$`
  )
  // Each frame that only frames, outermost first, until none is left.
  for (;;) {
    const at = lines.findIndex((line) => wrapper.test(line))
    if (at < 0) break
    const indent = wrapper.exec(lines[at]!)![1]!
    const close = lines.findIndex(
      (line, index) => index > at && line === `${indent}</div>`
    )
    if (close < 0) break
    const children = lines
      .slice(at + 1, close)
      .map((child) => child.replace(/^ {2}/, ""))
    const roots = children.filter(
      (child) =>
        child.startsWith(`${indent}<`) && !child.startsWith(`${indent}</`)
    ).length
    const inner =
      jsx && roots > 1
        ? [
            `${indent}<>`,
            ...children.map((child) => `  ${child}`),
            `${indent}</>`,
          ]
        : children
    lines = [...lines.slice(0, at), ...inner, ...lines.slice(close + 1)]
  }
  // The frame on an element that is the demo's own: the attribute goes.
  out = lines
    .map((line) =>
      line.replace(
        new RegExp(String.raw`\s(?::sx|\[sx\]|sx)=[{"]${FRAME}[}"]`),
        ""
      )
    )
    .join("\n")
  // Angular binds the handle on its class.
  out = out.replace(/\n\s*protected readonly page = page\n/, "\n")
  const reads = out.replace(/^.*\bimport\b[^\n]*\bpage\b[^\n]*$/m, "")
  if (!/\bpage\./.test(reads))
    out = out.replace(
      /^\s*import \{ page \} from "[^"]+page\.styles(?:\.ts)?"\n/m,
      ""
    )
  return out
}

/** `@/registry/<type>/…`, the builder's names, at `ui init`'s default aliases. */
export function atDefaultAliases(code: string): string {
  return code.replace(
    /@\/registry\/(ui|component|lib|hook)\//g,
    (_, type: keyof typeof DEFAULT_ALIASES) => `${DEFAULT_ALIASES[type]}/`
  )
}

/** The demo without the doc comment its file opens with: the port's note, not the demo. */
export function withoutPortNote(code: string): string {
  return code.replace(/^\/\*\*[\s\S]*?\*\/\n+/, "")
}

/** One demo's code for one framework and base, or `undefined` where it has none. */
export function demoCode(
  registry: string,
  combination: Combination,
  item: string
): string | Partial<Record<IconLibrary, string>> | undefined {
  const folder = `bases/${combination.framework}-${combination.base}`
  const extension = EXTENSIONS[combination.framework] ?? ".tsx"
  const source = [
    `${folder}/examples/${item}${extension}`,
    `${folder}/charts/${item}${extension}`,
  ].find((path) => existsSync(join(registry, path)))
  if (!source) return undefined
  const code = rewriteImports(
    registry,
    source,
    withoutFrame(
      withoutPortNote(readFileSync(join(registry, source), "utf8")),
      combination.framework
    ),
    combination,
    "@/registry"
  )
  // Kirana's installer draws icons on React and Vue so far: on the others a demo's code keeps its
  // placeholders until its icon tables come.
  if (
    !code.includes("icon-placeholder") ||
    !ICON_FRAMEWORKS.includes(combination.framework)
  )
    return atDefaultAliases(code)
  return Object.fromEntries(
    ICON_LIBRARIES.map((library) => [
      library,
      atDefaultAliases(
        // A demo whose first line imported the placeholder keeps its line break.
        resolveIcons(
          source,
          code,
          combination.framework as Framework,
          library
        ).content.trimStart()
      ),
    ])
  )
}

/** A demo's parts per `framework/base`: each file's code by its path in the base's folder. */
export type DemoParts = Record<
  string,
  Record<string, string | Partial<Record<IconLibrary, string>>>
>

/**
 * A demo's own parts for one framework and base: the files of its folder in `components/`
 * (`components/tool-demo/ToolRow.vue`, Angular's `components/tool-demo.ts`) that it imports, and
 * those they import, each as a project writes it (the imports at `ui init`'s aliases, the icons
 * resolved as in `demoCode`), by its path in the base's folder. React's demos keep their parts in
 * the demo's file, so they have none.
 */
export function demoParts(
  registry: string,
  combination: Combination,
  item: string
): Record<string, string | Partial<Record<IconLibrary, string>>> {
  const folder = `bases/${combination.framework}-${combination.base}`
  const extension = EXTENSIONS[combination.framework] ?? ".tsx"
  const example = `${folder}/examples/${item}${extension}`
  if (!existsSync(join(registry, example))) return {}
  const own = (path: string) =>
    path.startsWith(`${folder}/components/${item}/`) ||
    path.startsWith(`${folder}/components/${item}.`)
  const found: string[] = []
  const visit = (from: string) => {
    const code = readFileSync(join(registry, from), "utf8")
    for (const [, specifier] of code.matchAll(
      /\bfrom\s*["'](\.{1,2}\/[^"']+)["']/g
    )) {
      let target: string
      try {
        target = resolveSource(registry, from, specifier!)
      } catch {
        continue
      }
      if (!own(target) || found.includes(target)) continue
      found.push(target)
      visit(target)
    }
  }
  visit(example)
  return Object.fromEntries(
    found.map((source) => {
      const code = rewriteImports(
        registry,
        source,
        withoutPortNote(readFileSync(join(registry, source), "utf8")),
        combination,
        "@/registry"
      )
      const path = source.slice(folder.length + 1)
      if (
        !code.includes("icon-placeholder") ||
        !ICON_FRAMEWORKS.includes(combination.framework)
      )
        return [path, atDefaultAliases(code)]
      return [
        path,
        Object.fromEntries(
          ICON_LIBRARIES.map((library) => [
            library,
            atDefaultAliases(
              resolveIcons(
                source,
                code,
                combination.framework as Framework,
                library
              ).content.trimStart()
            ),
          ])
        ),
      ]
    })
  )
}

/** Every item the docs preview (`<!-- ::preview item="…" -->`), from their markdown sources. */
export function previewedItems(markdown: readonly string[]): string[] {
  const items = new Set<string>()
  for (const text of markdown)
    for (const match of text.matchAll(/::preview item="([^"]+)"/g))
      items.add(match[1]!)
  return [...items].sort()
}
