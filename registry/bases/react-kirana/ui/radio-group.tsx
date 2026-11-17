"use client"

import type { PartProps } from "../../../lib/kirana-render"

import { props as styleProps } from "@kirana-style/core"
import { RadioGroup as RadioGroupPrimitive } from "@kirana-ui/react/radio-group"

import type { Sx } from "../../../lib/sx"
import { radioGroup } from "../../../styles/radio-group.styles"

function RadioGroup({
  sx,
  ...props
}: Omit<PartProps<typeof RadioGroupPrimitive.Root>, "className"> & {
  sx?: Sx
}) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      {...props}
      {...styleProps(radioGroup.root, sx)}
    />
  )
}

function RadioGroupItem({
  sx,
  ...props
}: Omit<PartProps<typeof RadioGroupPrimitive.Item>, "className"> & {
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
