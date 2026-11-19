import { props as styleProps } from "@kirana-style/core"
import type { Sx } from "@kirana-style/core"
import {
  Toggle,
  ToggleGroup as ToggleGroupPrimitive,
} from "@ui-sdk/solid/toggle"
import { createContext, createMemo, omit, useContext } from "solid-js"
import type { JSX } from "@solidjs/web"

import { UisdkPart } from "../../../lib/solid2/uisdk-part"
import type { AsChild } from "../../../lib/solid2/uisdk-part"
import { toggleGroup } from "../../../styles/toggle-group.styles"
import { toggle, toggleScope } from "../../../styles/toggle.styles"

type ToggleVariants = NonNullable<Parameters<typeof toggle>[0]>

/** What a ToggleGroup hands its items, as React's context does: getters, so they follow it. */
type ToggleGroupContext = {
  readonly variant?: ToggleVariants["variant"]
  readonly size?: ToggleVariants["size"]
  readonly spacing: number
}

const ToggleGroupContext = createContext<ToggleGroupContext | null>(null)

/**
 * ui-sdk's toggle group, taking Solid's Ark UI parts' props: `value` and `defaultValue` as a list,
 * `multiple`, and `onValueChange` called with `{ value }`. Its items read the variant, size and
 * gap from it.
 */
function ToggleGroup(props: {
  variant?: ToggleVariants["variant"]
  size?: ToggleVariants["size"]
  spacing?: number
  orientation?: "horizontal" | "vertical"
  multiple?: boolean
  defaultValue?: string[]
  value?: string[]
  onValueChange?: (details: { value: string[] }) => void
  disabled?: boolean
  asChild?: AsChild
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(
    props,
    "variant",
    "size",
    "spacing",
    "orientation",
    "onValueChange",
    "asChild",
    "class",
    "sx"
  )
  const spacing = () => props.spacing ?? 2
  const orientation = () => props.orientation ?? "horizontal"
  const own = () => styleProps(props.class, toggleGroup.root, props.sx)
  return (
    <ToggleGroupContext
      value={{
        get variant() {
          return props.variant
        },
        get size() {
          return props.size
        },
        get spacing() {
          return spacing()
        },
      }}
    >
      {/* The gap, in steps of 0.25rem, as upstream hands it down. */}
      <UisdkPart
        part={ToggleGroupPrimitive}
        slotName="toggle-group"
        asChild={props.asChild}
        data-variant={props.variant}
        data-size={props.size}
        data-spacing={spacing()}
        data-orientation={orientation()}
        orientation={orientation()}
        {...rest}
        onValueChange={(value: string[]) => props.onValueChange?.({ value })}
        class={own().class}
        style={{ ...own().style, "--gap": String(spacing()) }}
      />
    </ToggleGroupContext>
  )
}

function ToggleGroupItem(props: {
  value: string
  variant?: ToggleVariants["variant"]
  size?: ToggleVariants["size"]
  disabled?: boolean
  asChild?: AsChild<"button">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "variant", "size", "asChild", "class", "sx")
  const context = useContext(ToggleGroupContext)
  const chosen = createMemo(() => ({
    variant: context?.variant || props.variant || "default",
    size: context?.size || props.size || "default",
  }))
  return (
    <UisdkPart
      part={Toggle}
      slotName="toggle-group-item"
      tag="button"
      asChild={props.asChild}
      data-variant={chosen().variant}
      data-size={chosen().size}
      data-spacing={context?.spacing ?? 2}
      {...rest}
      {...styleProps(
        props.class,
        toggleScope.anchor,
        toggle(chosen()),
        toggleGroup.item,
        props.sx
      )}
    />
  )
}

export { ToggleGroup, ToggleGroupItem }
