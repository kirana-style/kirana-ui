import { omit } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { Toggle as TogglePrimitive } from "@ui-sdk/solid/toggle"
import type { JSX } from "@solidjs/web"
import type { Sx } from "@kirana-style/core"

import { UisdkPart } from "../../../lib/solid2/uisdk-part"
import type { AsChild } from "../../../lib/solid2/uisdk-part"
import { toggle, toggleScope } from "../../../styles/toggle.styles"

type ToggleVariants = NonNullable<Parameters<typeof toggle>[0]>

/** ui-sdk's toggle, taking Solid's Ark UI parts' props: `pressed`, `defaultPressed`, `onPressedChange`. */
function Toggle(props: {
  variant?: ToggleVariants["variant"]
  size?: ToggleVariants["size"]
  pressed?: boolean
  defaultPressed?: boolean
  onPressedChange?: (pressed: boolean) => void
  asChild?: AsChild<"button">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(
    props,
    "variant",
    "size",
    "onPressedChange",
    "asChild",
    "class",
    "sx"
  )
  return (
    <UisdkPart
      part={TogglePrimitive}
      slotName="toggle"
      tag="button"
      asChild={props.asChild}
      {...rest}
      onPressedChange={(pressed: boolean) => props.onPressedChange?.(pressed)}
      {...styleProps(
        props.class,
        toggleScope.anchor,
        toggle({
          variant: props.variant ?? "default",
          size: props.size ?? "default",
        }),
        props.sx
      )}
    />
  )
}

export { Toggle }
export { toggle as toggleVariants } from "../../../styles/toggle.styles"
