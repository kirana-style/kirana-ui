/**
 * The primitives' live demos (`apps/preview-primitives/src/demos/<slug>/`), as the code a reader
 * would write for each styling. A demo is one piece of markup that takes its styles as `s`
 * (`{...s.trigger}`), with a CSS module, a list of Tailwind classes and Kirana handles beside
 * it: here `s` is written back as what each styling puts on the element.
 */
import { existsSync, readFileSync } from "node:fs"

const DEMOS = new URL("../../preview-primitives/src/demos/", import.meta.url)

export interface StyledCode {
  /** The component, styled with a CSS module, and the module. */
  css: { component: string; stylesheet: string }
  tailwind: string
  kirana: string
  /** The markup alone: what the component draws by itself. */
  raw: string
}

/** The few shared values each styling reads, as the files a reader would have. */
export const SHARED = {
  theme: readFileSync(new URL("../theme.css", DEMOS), "utf8").trim(),
  tailwind: readFileSync(new URL("../tailwind.css", DEMOS), "utf8").trim(),
  tokens: readFileSync(new URL("../tokens.ts", DEMOS), "utf8").trim(),
}

/** The markup with `s` taken out of its signature, and its type's import with it. */
function plain(source: string): string {
  return source
    .replace(/^import type \{ Styles \} from "[^"]+"\n/m, "")
    .replace(
      /export default function Demo\(\{\s*s,?\s*\}: \{\s*s: Styles<[\s\S]*?>;?\s*\}\)/,
      "export function Demo()"
    )
    .replace(/\n{3,}/g, "\n\n")
}

/** After the last import: where a styling's own import or its styles go. */
function afterImports(source: string, added: string): string {
  const lines = source.split("\n")
  let last = -1
  let open = false
  lines.forEach((line, at) => {
    if (line.startsWith("import ")) open = !/from "|^import "/.test(line)
    if (line.startsWith("import ") || open) last = at
    if (open && /from "/.test(line)) open = false
  })
  lines.splice(last + 1, 0, ...(last < 0 ? [added, ""] : ["", added]))
  return lines.join("\n")
}

const spread = /\{\.\.\.s\.(\w+)\}/g

/** Whether a component has a demo. */
export const hasDemo = (slug: string) =>
  existsSync(new URL(`${slug}/demo.tsx`, DEMOS))

/** A demo's code in each styling. */
export async function styledCode(slug: string): Promise<StyledCode> {
  const read = (file: string) =>
    readFileSync(new URL(`${slug}/${file}`, DEMOS), "utf8")
  const markup = plain(read("demo.tsx"))
  const classes = (
    (await import(new URL(`${slug}/tailwind.ts`, DEMOS).href)) as {
      default: Record<string, string>
    }
  ).default
  // Kirana's handles, as the reader's own `styles` beside the component.
  const handles = read("kirana.ts")
    .replace(
      /^import \{ theme \} from "[^"]+"\n/m,
      'import { theme } from "./tokens"\n'
    )
    .replace(/^import \{ css \} from "@kirana-style\/core"\n/m, "")
    .replace(/export default \{/, "const styles = {")
    .trim()
  const tokens =
    /^import \{ theme \} from ".\/tokens"\n/m.exec(handles)?.[0] ?? ""
  const kirana = afterImports(
    afterImports(
      markup.replace(spread, "{...props(styles.$1)}"),
      `${tokens ? 'import { theme } from "./tokens"\n\n' : ""}${handles.replace(tokens, "").trim()}`
    ),
    ""
  )
  return {
    css: {
      component: afterImports(
        markup.replace(spread, "className={styles.$1}"),
        'import styles from "./demo.module.css"'
      ),
      stylesheet: read("styles.module.css").trim(),
    },
    tailwind: markup.replace(
      spread,
      (_whole, name: string) => `className="${classes[name] ?? ""}"`
    ),
    kirana: `import { css, props } from "@kirana-style/core"\n${kirana.replace(/\n{3,}/g, "\n\n")}`,
    raw: markup.replace(/\s*\{\.\.\.s\.\w+\}/g, ""),
  }
}
