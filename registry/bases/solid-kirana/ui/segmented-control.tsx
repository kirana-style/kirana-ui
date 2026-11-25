import { Toggle as TogglePrimitive } from "@kirana-ui/solid/toggle"
import type { ChangeDetails } from "@kirana-ui/solid"
import { ToggleGroup as ToggleGroupPrimitive } from "@kirana-ui/solid/toggle-group"
import { props as styleProps } from "@kirana-style/core"
import type { Sx } from "@kirana-style/core"
import { createContext, merge, omit, useContext } from "solid-js"
import type { JSX } from "@solidjs/web"

import { segmentedControl } from "../../../styles/segmented-control.styles"
import { tabs } from "../../../styles/tabs.styles"

type SegmentedControlSize = "sm" | "default" | "lg"

/** What a SegmentedControl hands its items, as React's context does: a getter, so it follows. */
const SegmentedControlContext = createContext<{
  readonly size: SegmentedControlSize
} | null>(null)

/**
 * One value chosen from a few, on Kirana UI's toggle group: `value`, `defaultValue` and
 * `onValueChange(value)` hold one value, not the group's list.
 */
function SegmentedControl(props: {
  size?: SegmentedControlSize
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const local = merge(props, {
    get size() {
      return props.size ?? ("default" as const)
    },
  })
  const rest = omit(
    local,
    "size",
    "value",
    "defaultValue",
    "onValueChange",
    "class",
    "sx",
    "children"
  )
  return (
    <SegmentedControlContext
      value={{
        get size() {
          return local.size
        },
      }}
    >
      <ToggleGroupPrimitive
        data-slot="segmented-control"
        data-size={local.size}
        value={local.value === undefined ? undefined : [local.value]}
        defaultValue={
          local.defaultValue === undefined ? undefined : [local.defaultValue]
        }
        onValueChange={(next: unknown[], details: ChangeDetails) => {
          // One item is always chosen: pressing the chosen one again would leave none, so it is
          // refused.
          if (next.length === 0) {
            details.cancel()
            return
          }
          local.onValueChange?.(next[0] as string)
        }}
        {...rest}
        {...styleProps(
          local.class,
          tabs.list,
          tabs.listDefault,
          segmentedControl.root,
          local.sx
        )}
      >
        {local.children}
      </ToggleGroupPrimitive>
    </SegmentedControlContext>
  )
}

/** One choice: Kirana UI's toggle with a `value`, which the control holds while it is chosen. */
function SegmentedControlItem(props: {
  value: string
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "value", "class", "sx", "children")
  const context = useContext(SegmentedControlContext)
  return (
    <TogglePrimitive
      data-slot="segmented-control-item"
      data-size={context?.size ?? "default"}
      value={props.value}
      {...rest}
      {...styleProps(
        props.class,
        tabs.trigger,
        segmentedControl.item,
        props.sx
      )}
    >
      {props.children}
    </TogglePrimitive>
  )
}

export { SegmentedControl, SegmentedControlItem }
export type { SegmentedControlSize }
