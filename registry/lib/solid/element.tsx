/**
 * Ark UI's `asChild`, which every Solid base takes, on Kirana UI's parts: their `render`, and that
 * of `Primitive` (`@kirana-ui/solid/primitive`), the adapter's element for a design system's own
 * (a badge, an item, a breadcrumb's link) composed as a part is.
 */
import { mergeProps } from "solid-js"
import type { JSX } from "solid-js"

type Tag = keyof JSX.IntrinsicElements

/**
 * Ark UI's `asChild`: called with the props as a function, which merges what the caller gives it
 * under them; the element it returns spreads them (`<a {...props()} />`).
 */
export type AsChild<T extends Tag = "div"> = (
  props: (userProps?: JSX.IntrinsicElements[T]) => JSX.HTMLAttributes<any>
) => JSX.Element

/** Ark UI's `asChild` as a Kirana UI part's `render`, which gets the part's props as an accessor. */
export function asRender<T extends Tag>(asChild: AsChild<T> | undefined) {
  if (!asChild) return undefined
  return (props: () => Record<string, unknown>) =>
    asChild(
      (userProps) =>
        mergeProps(userProps ?? {}, props()) as JSX.HTMLAttributes<any>
    )
}
