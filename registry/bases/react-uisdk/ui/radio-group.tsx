"use client"

import { props as styleProps } from "@kirana-style/core"
import type { ComponentProps } from "react"
import * as RadioPrimitive from "@ui-sdk/react/radio"

import type { Sx } from "../../../lib/sx"
import { slotRender } from "../../../lib/uisdk-slot"
import { radioGroup } from "../../../styles/radio-group.styles"

type GroupProps = ComponentProps<typeof RadioPrimitive.RadioGroup>

/**
 * Base UI's RadioGroup's props, whose value is the caller's type (a form's field hands its own
 * setter), where ui-sdk's is a string or null.
 */
function RadioGroup<Value extends string = string>({
  sx,
  value,
  defaultValue,
  onValueChange,
  ...props
}: Omit<
  GroupProps,
  "className" | "value" | "defaultValue" | "onValueChange"
> & {
  sx?: Sx
  value?: Value
  defaultValue?: Value
  onValueChange?: (
    value: Value,
    details: Parameters<NonNullable<GroupProps["onValueChange"]>>[1]
  ) => void
}) {
  return (
    <RadioPrimitive.RadioGroup
      value={value}
      defaultValue={defaultValue}
      onValueChange={
        onValueChange &&
        ((next, details) => onValueChange(next as Value, details))
      }
      {...props}
      render={slotRender("radio-group", "div", props.render)}
      {...styleProps(radioGroup.root, sx)}
    />
  )
}

function RadioGroupItem({
  sx,
  ...props
}: Omit<ComponentProps<typeof RadioPrimitive.Radio>, "className"> & {
  sx?: Sx
}) {
  return (
    <RadioPrimitive.Radio
      {...props}
      render={slotRender("radio-group-item", "span", props.render)}
      {...styleProps(radioGroup.item, sx)}
    >
      <RadioPrimitive.RadioIndicator
        {...styleProps(radioGroup.indicator)}
        render={slotRender("radio-group-indicator", "span")}
      >
        <span sx={radioGroup.dot} />
      </RadioPrimitive.RadioIndicator>
    </RadioPrimitive.Radio>
  )
}

export { RadioGroup, RadioGroupItem }
