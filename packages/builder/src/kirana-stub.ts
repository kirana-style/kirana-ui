/**
 * `@kirana-style/core` as the builder evaluates a style module: every call records what it was
 * given instead of compiling it. `evaluate.ts` puts this module in place of the real one.
 *
 * - `css(…)` and `recipe(…)` return descriptions (`StyleHandle`, `RecipeHandle`) with the call's
 *   source line, which Kirana's `trace()` takes;
 * - a variable token, a relation's anchor and reads, a `select` target and a keyframes rule are
 *   markers (`markers.ts`); a constant token is its value, as the compiler would inline it;
 * - `media()`, `container()` and `supports()` return the at-rule key they stand for.
 */
import { marker } from "./markers"

export type StyleObject = { [key: string]: unknown }

export type StyleHandle = {
  kind: "style"
  anchors: string[]
  styles: StyleObject[]
  site: Site
}

export type RecipeHandle = { kind: "recipe"; config: StyleObject; site: Site }

export type Site = { file: string; line: number }

/** Where the caller of a stub sits in its source: the frame above this module's. */
function callSite(): Site {
  const frames = (new Error().stack ?? "").split("\n").slice(1)
  for (const frame of frames) {
    const match = /\(?(\/[^():]+):(\d+):\d+\)?$/.exec(frame.trim())
    if (match && !match[1].endsWith("kirana-stub.ts")) {
      return { file: match[1], line: Number(match[2]) }
    }
  }
  return { file: "", line: 0 }
}

export function css(...args: unknown[]): StyleHandle {
  const anchors: string[] = []
  const styles: StyleObject[] = []
  for (const arg of args.flat(Infinity)) {
    if (typeof arg === "string") anchors.push(arg)
    else if (
      arg &&
      typeof arg === "object" &&
      (arg as StyleHandle).kind === "style"
    ) {
      anchors.push(...(arg as StyleHandle).anchors)
      styles.push(...(arg as StyleHandle).styles)
    } else if (arg && typeof arg === "object") styles.push(arg as StyleObject)
  }
  return { kind: "style", anchors, styles, site: callSite() }
}

export function recipe(config: StyleObject): RecipeHandle {
  return { kind: "recipe", config, site: callSite() }
}

export function relation(name: string) {
  const read =
    (how: "within" | "after" | "before") =>
    (condition = "") =>
      marker({ kind: "read", relation: name, how, condition })
  return {
    name,
    anchor: marker({ kind: "anchor", relation: name }),
    within: read("within"),
    after: read("after"),
    before: read("before"),
  }
}

export const select = {
  child: (selector: string) =>
    marker({ kind: "target", how: "child", selector }),
  descendant: (selector: string) =>
    marker({ kind: "target", how: "descendant", selector }),
}

/** Every keyframes rule a module declared, by id, with the line that declared it. */
export const declaredKeyframes = new Map<
  string,
  { frames: StyleObject; site: Site }
>()

export function keyframes(frames: StyleObject): string {
  const id = String(declaredKeyframes.size)
  declaredKeyframes.set(id, { frames, site: callSite() })
  return marker({ kind: "keyframes", id })
}

export function defineTokens<T extends Record<string, unknown>>(
  group: string,
  values: T,
  options?: { variable?: boolean }
): T {
  if (!options?.variable) return values
  return Object.fromEntries(
    Object.keys(values).map((key) => [
      key,
      marker({ kind: "token", group, key }),
    ])
  ) as T
}

export const media = (query: string) => `@media ${query}`
export const container = (query: string, name?: string) =>
  name ? `@container ${name} ${query}` : `@container ${query}`
export const supports = (condition: string) => `@supports ${condition}`

function unsupported(name: string) {
  return () => {
    throw new Error(
      `The builder does not evaluate ${name}() in a style module yet.`
    )
  }
}
export const cx = unsupported("cx")
export const props = unsupported("props")
export const defineTheme = unsupported("defineTheme")
export const firstThatWorks = unsupported("firstThatWorks")
export const positionTry = unsupported("positionTry")
export const viewTransition = unsupported("viewTransition")
export const counterStyle = unsupported("counterStyle")
export const mode = {}
