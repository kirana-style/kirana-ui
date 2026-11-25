import { omit } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { RadioGroup as RadioGroupPrimitive } from "@kirana-ui/solid/radio-group"
import { asRender } from "../../../lib/solid2/element"
import { radioGroup } from "../../../styles/radio-group.styles"
import type { JSX } from "@solidjs/web"
import type { Sx } from "@kirana-style/core"
import type { AsChild } from "../../../lib/solid2/element"

/**
 * Kirana UI's radio group, with Solid's Ark UI part's `value`, `defaultValue` and
 * `onValueChange({ value })`: `""` when a form's reset takes the group back to none.
 */
function RadioGroup(props: {
  defaultValue?: string | null
  value?: string | null
  onValueChange?: (details: { value: string }) => void
  asChild?: AsChild<"div">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(
    props,
    "onValueChange",
    "asChild",
    "class",
    "sx",
    "children"
  )
  return (
    <RadioGroupPrimitive.Root
      render={asRender(props.asChild)}
      data-slot="radio-group"
      {...rest}
      onValueChange={(value: unknown) =>
        props.onValueChange?.({ value: (value as string | null) ?? "" })
      }
      {...styleProps(props.class, radioGroup.root, props.sx)}
    >
      {props.children}
    </RadioGroupPrimitive.Root>
  )
}

/**
 * The item holds the hidden native radio, which an `id` given to it goes on, so a `<Label for>`
 * beside it reaches the radio; `aria-invalid` marks it as upstream's demos do.
 */
function RadioGroupItem(props: {
  value: string
  id?: string
  asChild?: AsChild<"span">
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const rest = omit(props, "value", "asChild", "class", "sx")
  return (
    <RadioGroupPrimitive.Item
      render={asRender(props.asChild)}
      data-slot="radio-group-item"
      value={props.value}
      {...rest}
      {...styleProps(props.class, radioGroup.item, props.sx)}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        {...styleProps(radioGroup.indicator)}
      >
        <span sx={radioGroup.dot} />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }
