/**
 * What a style module's Kirana values become when the builder evaluates it without the compiler:
 * marker strings, so they survive being used as object keys, spread, and written into template
 * strings (`calc(${radiusBase.value} * 0.6)`), and the generator can write each back as code.
 *
 * A marker is `<kind>:<payload>`, in Unicode's private use area, which no CSS value or
 * condition contains.
 */
const OPEN = ""
const CLOSE = ""

export type Marker =
  | { kind: "token"; group: string; key: string }
  | {
      kind: "read"
      relation: string
      how: "within" | "parent" | "after" | "before"
      condition: string
    }
  | { kind: "anchor"; relation: string }
  | { kind: "target"; how: "child" | "descendant"; selector: string }
  | { kind: "keyframes"; id: string }
  | { kind: "state"; base: "base" | "aria" | "ark"; key: string }

export function marker(value: Marker): string {
  return `${OPEN}${JSON.stringify(value)}${CLOSE}`
}

/** The parts of a string: plain text, and the markers inside it. */
export function split(text: string): (string | Marker)[] {
  const parts: (string | Marker)[] = []
  let rest = text
  for (;;) {
    const start = rest.indexOf(OPEN)
    if (start < 0) break
    const end = rest.indexOf(CLOSE, start)
    if (start > 0) parts.push(rest.slice(0, start))
    parts.push(JSON.parse(rest.slice(start + 1, end)) as Marker)
    rest = rest.slice(end + 1)
  }
  if (rest) parts.push(rest)
  return parts
}

/** The marker a string is, when it is exactly one. */
export function only(text: string): Marker | undefined {
  const parts = split(text)
  return parts.length === 1 && typeof parts[0] !== "string"
    ? parts[0]
    : undefined
}

export const hasMarker = (text: string) => text.includes(OPEN)
