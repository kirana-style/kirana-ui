import { omit } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import {
  Radio,
  RadioGroup as RadioGroupPrimitive,
  RadioIndicator,
} from "@ui-sdk/solid/radio"
import type { JSX } from "@solidjs/web"
import type { Sx } from "@kirana-style/core"

import { UisdkPart } from "../../../lib/solid2/uisdk-part"
import type { AsChild } from "../../../lib/solid2/uisdk-part"
import { radioGroup } from "../../../styles/radio-group.styles"

/**
 * ui-sdk's radio group, taking Solid's Ark UI parts' props: `value`, `defaultValue`, and
 * `onValueChange` called with `{ value }`.
 */
function RadioGroup(props: {
  defaultValue?: string
  value?: string
  onValueChange?: (details: { value: string }) => void
  disabled?: boolean
  asChild?: AsChild
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "onValueChange", "asChild", "class", "sx")
  return (
    <UisdkPart
      part={RadioGroupPrimitive}
      slotName="radio-group"
      asChild={props.asChild}
      {...rest}
      onValueChange={(value: string | null) =>
        props.onValueChange?.({ value: value as string })
      }
      {...styleProps(props.class, radioGroup.root, props.sx)}
    />
  )
}

/** A radio (a `span`, as Base UI's), its dot there while checked, and ui-sdk's hidden radio beside it. */
function RadioGroupItem(props: {
  value: string
  id?: string
  disabled?: boolean
  asChild?: AsChild<"button">
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const rest = omit(props, "asChild", "class", "sx")
  return (
    <UisdkPart
      part={Radio}
      slotName="radio-group-item"
      tag="span"
      asChild={props.asChild}
      {...rest}
      {...styleProps(props.class, radioGroup.item, props.sx)}
    >
      <UisdkPart
        part={RadioIndicator}
        slotName="radio-group-indicator"
        tag="span"
        {...styleProps(radioGroup.indicator)}
      >
        <span sx={radioGroup.dot} />
      </UisdkPart>
    </UisdkPart>
  )
}

export { RadioGroup, RadioGroupItem }
