import { mergeProps, splitProps } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { Switch as SwitchPrimitive } from "@kirana-ui/solid/switch"
import { asRender } from "../../../lib/solid/element"
import { switchStyles } from "../../../styles/switch.styles"
import type { Sx } from "@kirana-style/core"
import type { AsChild } from "../../../lib/solid/element"

/**
 * Kirana UI's switch, with Solid's Ark UI part's `checked`, `defaultChecked` and
 * `onCheckedChange({ checked })`. The track holds the hidden native checkbox, so an `id` on it is
 * what a `<Label for>` beside it reaches, and `aria-invalid` marks it as upstream's demos do.
 */
function Switch(props: {
  id?: string
  defaultChecked?: boolean
  checked?: boolean
  onCheckedChange?: (details: { checked: boolean }) => void
  size?: "sm" | "default"
  asChild?: AsChild<"span">
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ size: "default" } as const, props),
    ["onCheckedChange", "size", "asChild", "class", "sx"]
  )
  return (
    <SwitchPrimitive.Root
      render={asRender(local.asChild)}
      data-slot="switch"
      data-size={local.size}
      {...rest}
      onCheckedChange={(checked: boolean) =>
        local.onCheckedChange?.({ checked })
      }
      {...styleProps(local.class, switchStyles.root, local.sx)}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        {...styleProps(switchStyles.thumb)}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
