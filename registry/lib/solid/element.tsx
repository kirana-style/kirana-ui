/**
 * A design system's own element (a badge, an item, a breadcrumb's link) composed as a part is: drawn
 * as `as`, or through the caller's `asChild` (Ark UI's, which every Solid base takes), given the
 * props to spread. Kirana UI's Solid adapter has no such element (PF-033): React's has `useRender`
 * and Vue's `Primitive`.
 */
import { mergeProps, Show, splitProps } from "solid-js"
import type { JSX } from "solid-js"
import { Dynamic } from "solid-js/web"

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

/** `as` with the props it is given, or the caller's own element through `asChild`. */
export function Element<T extends Tag>(
  props: { as: T; asChild?: AsChild<T> } & Record<string, unknown>
) {
  const [local, rest] = splitProps(props, ["as", "asChild"])
  return (
    <Show
      when={local.asChild}
      fallback={<Dynamic component={local.as as Tag} {...rest} />}
    >
      {(asChild) =>
        asChild()(
          (userProps) =>
            mergeProps(userProps ?? {}, rest) as JSX.HTMLAttributes<any>
        )
      }
    </Show>
  )
}
