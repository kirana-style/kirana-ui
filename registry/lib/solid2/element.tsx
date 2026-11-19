/**
 * A design system's own element (a badge, an item, a breadcrumb's link) composed as a part is, on
 * Solid 2: drawn as `as`, or through the caller's `asChild` (Ark UI's, which every Solid base
 * takes), given the props to spread. ui-sdk has no such element for a part without behaviour, and
 * Solid has none of its own: React's base has `useRender` and Vue's `Primitive`.
 */
import { merge, omit, Show } from "solid-js"
import { Dynamic } from "@solidjs/web"
import type { JSX } from "@solidjs/web"

type Tag = keyof JSX.IntrinsicElements

/**
 * What `asChild`'s function returns, to spread: its class one string, as the registry's parts take
 * `class` (Solid 2's elements take any class value). `lib/solid2/uisdk-part.tsx` has the same.
 */
export type AsChildProps = Omit<JSX.HTMLAttributes<any>, "class"> & {
  class?: string
}

/**
 * Ark UI's `asChild`: called with the props as a function, which merges what the caller gives it
 * under them; the element it returns spreads them (`<a {...props()} />`).
 */
export type AsChild<T extends Tag = "div"> = (
  props: (userProps?: JSX.IntrinsicElements[T]) => AsChildProps
) => JSX.Element

/** Ark UI's `asChild` as a part's `render`, which gets the part's props as an accessor. */
export function asRender<T extends Tag>(asChild: AsChild<T> | undefined) {
  if (!asChild) return undefined
  return (props: () => Record<string, unknown>) =>
    asChild((userProps) => merge(userProps ?? {}, props()) as AsChildProps)
}

/** `as` with the props it is given, or the caller's own element through `asChild`. */
export function Element<T extends Tag>(
  props: { as: T; asChild?: AsChild<T> } & Record<string, unknown>
) {
  const rest = omit(props, "as", "asChild")
  return (
    <Show
      when={props.asChild}
      fallback={<Dynamic component={props.as as Tag} {...rest} />}
    >
      {(asChild) =>
        asChild()((userProps) => merge(userProps ?? {}, rest) as AsChildProps)
      }
    </Show>
  )
}
