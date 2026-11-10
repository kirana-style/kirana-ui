/**
 * `asChild`, as Ark UI's Svelte parts take it, for parts on a base with no element factory of its
 * own (Bits UI). The caller's snippet receives a props function and spreads what it returns on its
 * own element:
 *
 *   {#snippet asChild(props)}<a {...props({ href: "/" })}>Home</a>{/snippet}
 *
 * `propsFn(own)` builds that function: the part's attributes merged with the caller's, the caller's
 * winning (classes joined, both event handlers run, an attachment kept). `Element.svelte` renders a
 * part's element, or calls the snippet with it, as Ark UI's `Ark` does.
 */
import type { Snippet } from "svelte"
import type { HTMLAttributes, SvelteHTMLElements } from "svelte/elements"

export type HTMLTag = keyof SvelteHTMLElements

/** Ark UI's `PropsFn`: the part's attributes merged with what the caller passes. */
export type PropsFn<T extends HTMLTag = HTMLTag> = (
  props?: SvelteHTMLElements[T]
) => HTMLAttributes<HTMLElement>

/** A part's `asChild`: the caller's snippet, given the props function. */
export type AsChild<T extends HTMLTag = HTMLTag> = Snippet<[PropsFn<T>]>

type Props = Record<PropertyKey, unknown>

const isHandler = (key: string, value: unknown) =>
  /^on[a-z]/.test(key) && typeof value === "function"

/** `own`, then each of `others` over it: the last value wins but for classes, styles and handlers. */
export function mergeProps(own: Props, ...others: Props[]): Props {
  const result: Props = { ...own }
  for (const props of others) {
    for (const key of Object.keys(props)) {
      const before = result[key]
      const after = props[key]
      if (isHandler(key, before) && isHandler(key, after)) {
        result[key] = (...args: unknown[]) => {
          ;(before as (...args: unknown[]) => void)(...args)
          ;(after as (...args: unknown[]) => void)(...args)
        }
      } else if (key === "class" && before && after) {
        // Svelte joins a list of class values.
        result[key] = [before, after]
      } else if (key === "style" && before && after) {
        result[key] = `${String(before)};${String(after)}`
      } else if (after !== undefined) {
        result[key] = after
      }
    }
    // An attachment (`{@attach}`) arrives under a symbol.
    for (const key of Object.getOwnPropertySymbols(props))
      if (props[key] !== undefined) result[key] = props[key]
  }
  return result
}

/** The props function for a part whose own attributes are `own`. */
export function propsFn<T extends HTMLTag>(own: Props): PropsFn<T> {
  return (props) =>
    mergeProps(own, (props ?? {}) as Props) as HTMLAttributes<HTMLElement>
}
