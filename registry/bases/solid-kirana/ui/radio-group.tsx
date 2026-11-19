import { splitProps } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { RadioGroup as RadioGroupPrimitive } from "@kirana-ui/solid/radio-group"
import { asRender } from "../../../lib/solid/element"
import { radioGroup } from "../../../styles/radio-group.styles"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"
import type { AsChild } from "../../../lib/solid/element"

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
  const [local, rest] = splitProps(props, [
    "onValueChange",
    "asChild",
    "class",
    "sx",
    "children",
  ])
  return (
    <RadioGroupPrimitive.Root
      render={asRender(local.asChild)}
      data-slot="radio-group"
      {...rest}
      onValueChange={(value: unknown) =>
        local.onValueChange?.({ value: (value as string | null) ?? "" })
      }
      {...styleProps(local.class, radioGroup.root, local.sx)}
    >
      {local.children}
    </RadioGroupPrimitive.Root>
  )
}

/**
 * The item holds the hidden native radio, so an `id` on it is what a `<Label for>` beside it
 * reaches, and `aria-invalid` marks it as upstream's demos do.
 */
function RadioGroupItem(props: {
  value: string
  id?: string
  asChild?: AsChild<"span">
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["value", "asChild", "class", "sx"])
  return (
    <RadioGroupPrimitive.Item
      render={asRender(local.asChild)}
      data-slot="radio-group-item"
      value={local.value}
      {...rest}
      {...styleProps(local.class, radioGroup.item, local.sx)}
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
