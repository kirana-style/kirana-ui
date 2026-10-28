/**
 * What the typeset builder writes from a typeset (`lib/typeset.ts`): the preset as a Kirana style,
 * the wrapper, the fonts to install, and one prompt for a coding agent, as upstream's docs panel
 * writes them. Only the builder's page loads it.
 */
import { FONT_INFO } from "@workspace/registry/core/config"

import { fontsOf, measureOf, typesetVariables } from "@/lib/typeset"
import type { TypesetParams } from "@/lib/typeset"

/** The preset's name, after the content it was made for: `docsTypeset`. */
export const presetName = (params: TypesetParams) => `${params.item}Typeset`

/** The preset, as a Kirana handle: the three rhythm values, the fonts and the measure. */
export function presetCode(params: TypesetParams): string {
  const lines = Object.entries(typesetVariables(params)).map(
    ([name, value]) => `  "${name}": ${JSON.stringify(value)},`
  )
  return [
    `import { css } from "@kirana-style/core"`,
    "",
    `export const ${presetName(params)} = css({`,
    ...lines,
    `  maxWidth: "${measureOf(params)}",`,
    `})`,
  ].join("\n")
}

/** The wrapper around the content. */
export function wrapperCode(params: TypesetParams): string {
  return `<div className="typeset" sx={[typeset, ${presetName(params)}]}>
  {content}
</div>`
}

/** The packages for the fonts, and their imports. */
export function fontInstall(params: TypesetParams) {
  const packages = fontsOf(params).map((font) => FONT_INFO[font].dependency)
  return {
    command: `npm install ${packages.join(" ")}`,
    imports: packages.map((name) => `import "${name}"`).join("\n"),
  }
}

/** One prompt with the reader's picks, for a coding agent, as upstream's. */
export function typesetPrompt(params: TypesetParams, site: string): string {
  const fonts = fontInstall(params)
  return `Add typeset to this project, which uses Kirana and kirana/ui.

Typeset styles rendered markdown and other HTML: wrap the output in a container with the \`typeset\` class and the \`typeset\` handle, and everything inside (headings, lists, tables, code, blockquotes, math) is styled. Everything outside is untouched.

1. Add the typeset item, which writes \`typeset.css\` and \`typeset.styles.ts\` into the project's ui folder:

npx kirana-style ui add typeset

Then import \`typeset.css\` in the app's entry, after Kirana's stylesheet and the registry's reset. Its rules are in the \`typeset\` layer; the project's \`kirana.config.ts\` lists it under \`layers.before\` (kirana/ui's \`installConfig\` does).

2. Install the fonts and import them in the app's entry:

${fonts.command}

${fonts.imports}

3. Add this preset beside the component that renders the content. If a handle with this name already exists, update its values in place:

${presetCode(params)}

4. Do not wrap anything yet. Search the project for surfaces that render markdown or rich content (a markdown renderer, MDX components, HTML set from parsed markdown, a CMS renderer). List the candidates and ask the user which one should use typeset. Then wrap only the surface they pick:

${wrapperCode(params)}

If the surface already has its own typography (styled markdown components, a prose class), list those styles and let the user decide what to remove before wrapping.

Notes:

- To keep an embedded component out of typeset's styles, give it the \`data-not-typeset\` attribute. An element with a \`data-slot\` (every kirana/ui component) keeps its own styles.
- Verify on the surface the user picked: headings, lists, tables and code inside the container are styled with no styles on the content itself.
- Docs: ${site}/docs/design-system/typeset`
}
