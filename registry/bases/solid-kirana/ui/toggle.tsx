import { mergeProps, splitProps } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { Toggle as TogglePrimitive } from "@kirana-ui/solid/toggle"
import { asRender } from "../../../lib/solid/element"
import { toggle, toggleScope } from "../../../styles/toggle.styles"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"
import type { AsChild } from "../../../lib/solid/element"

type ToggleVariants = NonNullable<Parameters<typeof toggle>[0]>

/**
 * Kirana UI's toggle, with Solid's Ark UI part's `pressed`, `defaultPressed` and
 * `onPressedChange(pressed)`, which Kirana UI's callback is (its details come second).
 */
function Toggle(props: {
  variant?: ToggleVariants["variant"]
  size?: ToggleVariants["size"]
  asChild?: AsChild<"button">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ variant: "default", size: "default" } as const, props),
    ["variant", "size", "asChild", "class", "sx", "children"]
  )
  return (
    <TogglePrimitive
      render={asRender(local.asChild)}
      data-slot="toggle"
      {...rest}
      {...styleProps(
        local.class,
        toggleScope.anchor,
        toggle({ variant: local.variant, size: local.size }),
        local.sx
      )}
    >
      {local.children}
    </TogglePrimitive>
  )
}

export { Toggle }
export { toggle as toggleVariants } from "../../../styles/toggle.styles"
