"use client"

import type { ComponentProps } from "react"

import * as CheckboxPrimitive from "@ui-sdk/react/checkbox"
import { props as styleProps } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import type { Sx } from "../../../lib/sx"
import { slotRender } from "../../../lib/uisdk-slot"
import { checkbox } from "../../../styles/checkbox.styles"

type CheckboxProps = ComponentProps<typeof CheckboxPrimitive.Checkbox>

/**
 * Base UI's Checkbox's props, as every React base's part takes them: `indeterminate` is its own
 * prop there, where ui-sdk's is a checked state (`checked="indeterminate"`), and a change reports
 * a boolean, where ui-sdk's reports that state.
 */
function Checkbox({
  sx,
  indeterminate,
  checked,
  onCheckedChange,
  ...props
}: Omit<CheckboxProps, "className" | "checked" | "onCheckedChange"> & {
  sx?: Sx
  checked?: boolean
  indeterminate?: boolean
  onCheckedChange?: (
    checked: boolean,
    details: Parameters<NonNullable<CheckboxProps["onCheckedChange"]>>[1]
  ) => void
}) {
  return (
    <CheckboxPrimitive.Checkbox
      {...props}
      render={slotRender("checkbox", "span", props.render)}
      checked={indeterminate ? "indeterminate" : checked}
      onCheckedChange={
        onCheckedChange &&
        ((state, details) => onCheckedChange(state === true, details))
      }
      {...styleProps(checkbox.root, sx)}
    >
      <CheckboxPrimitive.CheckboxIndicator
        {...styleProps(checkbox.indicator)}
        render={slotRender("checkbox-indicator", "span")}
      >
        <IconPlaceholder
          lucide="CheckIcon"
          tabler="IconCheck"
          hugeicons="Tick02Icon"
          phosphor="CheckIcon"
          remixicon="RiCheckLine"
        />
      </CheckboxPrimitive.CheckboxIndicator>
    </CheckboxPrimitive.Checkbox>
  )
}

export { Checkbox }
