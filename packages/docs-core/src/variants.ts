/**
 * Pages written once and published once per variant: a component documented for every framework
 * and base it has (`react/base`, `vue/ark` …), each at a URL of its own for search engines, from one
 * source that says where they differ.
 *
 * A source lists its variants in its frontmatter (`variants: [react/base, react/aria, vue/ark]`),
 * the first the default. For each, the source is narrowed:
 *
 * - `<!-- ::start:only react/base,react/aria -->` … `<!-- ::end:only -->` stays on the variants it
 *   names and goes from the others;
 * - a tab group (`::start:tabs`) whose headings are all variant labels keeps the section of the
 *   page's own variant, without its heading, and goes where it has none; a heading may name
 *   several (`### Base UI, React Aria, Solid`), for code they share;
 * - an embed naming `combinations="…"` (a preview, the code panel) is pinned to the page's variant,
 *   and goes where its list leaves it out;
 * - `<!-- ::frameworks -->` follows the title: the links to the page's other variants.
 *
 * A page that must differ more has an override, `<name>/<framework>-<base>.md` beside the source,
 * which replaces that variant's page whole (its frontmatter, when it has none, is the source's).
 */

/** One variant a page can be published in. */
export type Variant = {
  /** As the URL and the registry name it: `vue/ark`. */
  id: string
  /** Short, for a tab: `Vue`, `Base UI`. */
  label: string
  /** Long, for a title: `Vue`, `React with Base UI`. */
  name: string
}

const ONLY =
  /<!--\s*::start:only\s+([^>]*?)\s*-->([\s\S]*?)<!--\s*::end:only\s*-->\n?/g
const TABS = /<!--\s*::start:tabs\s*-->([\s\S]*?)<!--\s*::end:tabs\s*-->\n?/g
const EMBED = /^<!--\s*::([\w-]+)((?:\s+[\w-]+="[^"]*")*)\s*-->\s*$/gm

const ids = (list: string) =>
  list
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean)

/** A tab group's sections, by heading, when every heading is a variant's label. */
function variantTabs(
  body: string,
  variants: readonly Variant[]
): Map<string, string> | undefined {
  const parts = body.split(/^### (.+)$/m)
  if (parts.length < 3) return undefined
  const sections = new Map<string, string>()
  for (let index = 1; index < parts.length; index += 2) {
    for (const label of parts[index]!.split(",")) {
      const variant = variants.find((entry) => entry.label === label.trim())
      if (!variant) return undefined
      sections.set(variant.id, parts[index + 1]!.trim())
    }
  }
  return sections
}

/** The source narrowed to one variant, as the page for it reads. */
export function narrow(
  source: string,
  variant: string,
  variants: readonly Variant[]
): string {
  const known = new Set(variants.map((entry) => entry.id))
  let out = source.replace(ONLY, (_, list: string, body: string) => {
    const named = ids(list)
    for (const id of named)
      if (!known.has(id)) throw new Error(`::only names ${id}, not a variant`)
    return named.includes(variant) ? `${body.trim()}\n\n` : ""
  })
  out = out.replace(TABS, (whole, body: string) => {
    const sections = variantTabs(body, variants)
    if (!sections) return whole
    const own = sections.get(variant)
    return own ? `${own}\n\n` : ""
  })
  out = out.replace(EMBED, (line, name: string, attributes: string) => {
    const list = /\scombinations="([^"]*)"/.exec(attributes)?.[1]
    if (list === undefined) return line
    if (!ids(list).includes(variant)) return ""
    return `<!-- ::${name}${attributes.replace(
      /\scombinations="[^"]*"/,
      ` combinations="${variant}"`
    )} -->`
  })
  // The links to the other variants, under the title.
  out = out.replace(/^(# .+)$/m, "$1\n\n<!-- ::frameworks -->")
  return out.replace(/\n{3,}/g, "\n\n")
}

/** A variant's URL: the variant between the page's folder and its name. */
export function variantHref(neutral: string, variant: string): string {
  const at = neutral.lastIndexOf("/")
  return `${neutral.slice(0, at)}/${variant}${neutral.slice(at)}`
}
