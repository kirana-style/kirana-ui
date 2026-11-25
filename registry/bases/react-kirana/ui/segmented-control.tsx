"use client"

import * as React from "react"

import { props as styleProps } from "@kirana-style/core"
import { Toggle as TogglePrimitive } from "@kirana-ui/react/toggle"
import { ToggleGroup as ToggleGroupPrimitive } from "@kirana-ui/react/toggle-group"

import type { Sx } from "../../../lib/sx"
import { segmentedControl } from "../../../styles/segmented-control.styles"
import { tabs } from "../../../styles/tabs.styles"

type SegmentedControlSize = "sm" | "default" | "lg"

const SegmentedControlContext =
  React.createContext<SegmentedControlSize>("default")

function SegmentedControl<Value = string>({
  sx,
  size = "default",
  value,
  defaultValue,
  onValueChange,
  children,
  ...props
}: Omit<
  React.ComponentProps<typeof ToggleGroupPrimitive<Value>>,
  | "className"
  | "style"
  | "value"
  | "defaultValue"
  | "onValueChange"
  | "multiple"
  | "orientation"
> & {
  /** The chosen item's value, when the caller holds it. */
  value?: Value
  /** The item chosen at the start, when the caller does not hold `value`. */
  defaultValue?: Value
  /** Heard when another item is chosen, with its value. */
  onValueChange?: (value: Value) => void
  size?: SegmentedControlSize
  sx?: Sx
}) {
  return (
    <ToggleGroupPrimitive<Value>
      data-slot="segmented-control"
      data-size={size}
      value={value === undefined ? undefined : [value]}
      defaultValue={defaultValue === undefined ? undefined : [defaultValue]}
      onValueChange={(next, details) => {
        // One item is always chosen: pressing the chosen one again would leave none, so it is refused.
        if (next.length === 0) {
          details.cancel()
          return
        }
        onValueChange?.(next[0] as Value)
      }}
      {...props}
      {...styleProps(tabs.list, tabs.listDefault, segmentedControl.root, sx)}
    >
      <SegmentedControlContext.Provider value={size}>
        {children}
      </SegmentedControlContext.Provider>
    </ToggleGroupPrimitive>
  )
}

function SegmentedControlItem({
  sx,
  ...props
}: Omit<
  React.ComponentProps<typeof TogglePrimitive>,
  "className" | "value" | "pressed" | "defaultPressed" | "onPressedChange"
> & {
  /** What the control's value is while this item is chosen. */
  value: unknown
  sx?: Sx
}) {
  const size = React.useContext(SegmentedControlContext)
  return (
    <TogglePrimitive
      data-slot="segmented-control-item"
      data-size={size}
      {...props}
      {...styleProps(tabs.trigger, segmentedControl.item, sx)}
    />
  )
}

export { SegmentedControl, SegmentedControlItem }
export type { SegmentedControlSize }
