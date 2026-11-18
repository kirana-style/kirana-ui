"use client"

import type * as React from "react"

import { props as styleProps } from "@kirana-style/core"
import { RadioGroup as RadioGroupPrimitive } from "@kirana-ui/react/radio-group"

import type { Sx } from "../../../lib/sx"
import { radioGroup } from "../../../styles/radio-group.styles"

/**
 * Base UI's root, whose change callback upstream's examples hand a state's setter: typed by the
 * value alone. The primitives report `null` only when a form's reset takes the group back to
 * none, and that reaches the caller as it is.
 */
function RadioGroup<Value = unknown>({
  sx,
  onValueChange,
  ...props
}: Omit<
  React.ComponentProps<typeof RadioGroupPrimitive.Root<Value>>,
  "className" | "onValueChange"
> & {
  onValueChange?: (
    value: Value,
    details: Parameters<
      NonNullable<
        React.ComponentProps<
          typeof RadioGroupPrimitive.Root<Value>
        >["onValueChange"]
      >
    >[1]
  ) => void
  sx?: Sx
}) {
  return (
    <RadioGroupPrimitive.Root<Value>
      data-slot="radio-group"
      onValueChange={
        onValueChange &&
        ((value, details) => onValueChange(value as Value, details))
      }
      {...props}
      {...styleProps(radioGroup.root, sx)}
    />
  )
}

function RadioGroupItem({
  sx,
  ...props
}: Omit<React.ComponentProps<typeof RadioGroupPrimitive.Item>, "className"> & {
  sx?: Sx
}) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      {...props}
      {...styleProps(radioGroup.item, sx)}
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
