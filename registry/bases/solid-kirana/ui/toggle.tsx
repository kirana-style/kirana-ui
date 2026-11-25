import { merge, omit } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { Toggle as TogglePrimitive } from "@kirana-ui/solid/toggle"
import { asRender } from "../../../lib/solid2/element"
import { toggle, toggleScope } from "../../../styles/toggle.styles"
import type { JSX } from "@solidjs/web"
import type { Sx } from "@kirana-style/core"
import type { AsChild } from "../../../lib/solid2/element"

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
  const local = merge(props, {
    get variant() {
      return props.variant ?? ("default" as const)
    },
    get size() {
      return props.size ?? ("default" as const)
    },
  })
  const rest = omit(
    local,
    "variant",
    "size",
    "asChild",
    "class",
    "sx",
    "children"
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
