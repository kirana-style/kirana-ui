import { omit } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { Switch as SwitchPrimitive, SwitchThumb } from "@ui-sdk/solid/switch"
import type { Sx } from "@kirana-style/core"

import { UisdkPart } from "../../../lib/solid2/uisdk-part"
import type { AsChild } from "../../../lib/solid2/uisdk-part"
import { switchStyles } from "../../../styles/switch.styles"

/**
 * ui-sdk's switch: its root is the box (a `span`, as Base UI's), with its thumb, and the hidden
 * input ui-sdk renders beside it. Solid's Ark UI parts' props: `checked`, Base UI's
 * `defaultChecked`, and `onCheckedChange` called with `{ checked }`.
 */
function Switch(props: {
  id?: string
  /** Base UI's boolean: Ark's own takes `"indeterminate"` too, so a bare attribute would not read as `true`. */
  defaultChecked?: boolean
  checked?: boolean
  onCheckedChange?: (details: { checked: boolean }) => void
  disabled?: boolean
  size?: "sm" | "default"
  asChild?: AsChild<"button">
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const rest = omit(props, "size", "onCheckedChange", "asChild", "class", "sx")
  return (
    <UisdkPart
      part={SwitchPrimitive}
      slotName="switch"
      tag="span"
      asChild={props.asChild}
      data-size={props.size ?? "default"}
      {...rest}
      onCheckedChange={(checked: boolean) =>
        props.onCheckedChange?.({ checked })
      }
      {...styleProps(props.class, switchStyles.root, props.sx)}
    >
      <UisdkPart
        part={SwitchThumb}
        slotName="switch-thumb"
        tag="span"
        {...styleProps(switchStyles.thumb)}
      />
    </UisdkPart>
  )
}

export { Switch }
