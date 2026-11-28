/**
 * A plain value written as TypeScript, laid out as the formatter would (two spaces, trailing
 * commas, keys unquoted where they can be), for the modules the builder writes.
 */
const IDENTIFIER = /^[A-Za-z_$][\w$]*$/

/** A string in double quotes, or single where that spares escaping them, as the formatter writes it. */
export const stringOf = (text: string) =>
  text.includes('"') && !text.includes("'") ? `'${text}'` : JSON.stringify(text)

const keyOf = (key: string) => (IDENTIFIER.test(key) ? key : stringOf(key))

/** `value` as a literal, its nested lines indented from `depth` levels of two spaces. */
export function generatedLiteral(value: unknown, depth: number): string {
  const inner = "  ".repeat(depth + 1)
  const outer = "  ".repeat(depth)
  if (typeof value === "string") return stringOf(value)
  if (typeof value === "number" || typeof value === "boolean")
    return String(value)
  if (value === null) return "null"
  if (Array.isArray(value)) {
    const items = value.map((item) => generatedLiteral(item, depth + 1))
    const flat = `[${items.join(", ")}]`
    if (flat.length + inner.length <= 100 && !flat.includes("\n")) return flat
    return `[\n${items.map((item) => `${inner}${item},`).join("\n")}\n${outer}]`
  }
  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>)
    if (entries.length === 0) return "{}"
    return `{\n${entries
      .map(
        ([key, item]) =>
          `${inner}${keyOf(key)}: ${generatedLiteral(item, depth + 1)},`
      )
      .join("\n")}\n${outer}}`
  }
  throw new Error(`no literal for ${typeof value}`)
}
