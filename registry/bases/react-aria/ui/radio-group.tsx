"use client"

import { props as styleProps } from "@kirana-style/core"
import {
  composeRenderProps,
  Radio as RadioPrimitive,
  RadioGroup as RadioGroupPrimitive,
} from "react-aria-components"
import type { RadioGroupProps, RadioProps } from "react-aria-components"

import type { Sx } from "../../../lib/sx"
import { radioGroup } from "../../../styles/radio-group.styles"

function RadioGroup({
  sx,
  ...props
}: Omit<RadioGroupProps, "className" | "style"> & { sx?: Sx }) {
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
  children,
  ...props
}: Omit<RadioProps, "className" | "style"> & { sx?: Sx }) {
  return (
    <RadioPrimitive
      data-slot="radio-group-item"
      {...props}
      {...styleProps(radioGroup.item, sx)}
    >
      {composeRenderProps(children, (content, { isSelected }) => (
        <>
          <span data-slot="radio-group-indicator" sx={radioGroup.indicator}>
            {isSelected && <span sx={radioGroup.dot} />}
          </span>
          {content}
        </>
      ))}
    </RadioPrimitive>
  )
}

export { RadioGroup, RadioGroupItem }
