"use client"

import { props as styleProps } from "@kirana-style/core"
import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"

import type { Sx } from "../../../lib/sx"
import { radioGroup } from "../../../styles/radio-group.styles"

function RadioGroup({
  sx,
  ...props
}: Omit<RadioGroupPrimitive.Props, "className"> & { sx?: Sx }) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      {...props}
      {...styleProps(radioGroup.root, sx)}
    />
  )
}

function RadioGroupItem({
  sx,
  ...props
}: Omit<RadioPrimitive.Root.Props, "className"> & { sx?: Sx }) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      {...props}
      {...styleProps(radioGroup.item, sx)}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        {...styleProps(radioGroup.indicator)}
      >
        <span sx={radioGroup.dot} />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  )
}

export { RadioGroup, RadioGroupItem }
