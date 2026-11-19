import { omit } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import {
  Checkbox as CheckboxPrimitive,
  CheckboxIndicator,
} from "@ui-sdk/solid/checkbox"
import type { Sx } from "@kirana-style/core"

import { UisdkPart } from "../../../lib/solid2/uisdk-part"
import type { AsChild } from "../../../lib/solid2/uisdk-part"
import { IconPlaceholder } from "./icon-placeholder"
import { checkbox } from "../../../styles/checkbox.styles"

/**
 * ui-sdk's checkbox: its root is the box (a `span`, as Base UI's), its indicator there while
 * checked or indeterminate, and the hidden input ui-sdk renders beside it. Solid's Ark UI parts'
 * props: `checked` (`true`, `false` or `"indeterminate"`), Base UI's `defaultChecked`, and
 * `onCheckedChange` called with `{ checked }`.
 */
function Checkbox(props: {
  id?: string
  /** Base UI's boolean: Ark's own takes `"indeterminate"` too, so a bare attribute would not read as `true`. */
  defaultChecked?: boolean
  checked?: boolean | "indeterminate"
  onCheckedChange?: (details: { checked: boolean | "indeterminate" }) => void
  disabled?: boolean
  name?: string
  asChild?: AsChild<"button">
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const rest = omit(props, "onCheckedChange", "asChild", "class", "sx")
  return (
    <UisdkPart
      part={CheckboxPrimitive}
      slotName="checkbox"
      tag="span"
      asChild={props.asChild}
      {...rest}
      onCheckedChange={(checked: boolean | "indeterminate") =>
        props.onCheckedChange?.({ checked })
      }
      {...styleProps(props.class, checkbox.root, props.sx)}
    >
      <UisdkPart
        part={CheckboxIndicator}
        slotName="checkbox-indicator"
        tag="span"
        {...styleProps(checkbox.indicator)}
      >
        <IconPlaceholder
          lucide="CheckIcon"
          tabler="IconCheck"
          hugeicons="Tick02Icon"
          phosphor="CheckIcon"
          remixicon="RiCheckLine"
        />
      </UisdkPart>
    </UisdkPart>
  )
}

export { Checkbox }
