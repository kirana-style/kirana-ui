import { Toggle as TogglePrimitive } from "@kirana-ui/solid/toggle"
import { ToggleGroup as ToggleGroupPrimitive } from "@kirana-ui/solid/toggle-group"
import { props as styleProps } from "@kirana-style/core"
import type { Sx } from "@kirana-style/core"
import {
  createContext,
  createMemo,
  mergeProps,
  splitProps,
  useContext,
} from "solid-js"
import type { JSX } from "solid-js"

import { asRender } from "../../../lib/solid/element"
import type { AsChild } from "../../../lib/solid/element"
import { toggleGroup } from "../../../styles/toggle-group.styles"
import { toggle, toggleScope } from "../../../styles/toggle.styles"

type ToggleVariants = NonNullable<Parameters<typeof toggle>[0]>

/** What a ToggleGroup hands its items, as React's context does: getters, so they follow it. */
type ToggleGroupContext = {
  readonly variant?: ToggleVariants["variant"]
  readonly size?: ToggleVariants["size"]
  readonly spacing: number
}

const ToggleGroupContext = createContext<ToggleGroupContext>()

/**
 * Kirana UI's toggle group, with Solid's Ark UI part's props: `multiple`, and a value that is
 * always a list (`defaultValue`, `value`, `onValueChange({ value })`), as Kirana UI's is.
 */
function ToggleGroup(props: {
  variant?: ToggleVariants["variant"]
  size?: ToggleVariants["size"]
  spacing?: number
  orientation?: "horizontal" | "vertical"
  defaultValue?: string[]
  value?: string[]
  onValueChange?: (details: { value: string[] }) => void
  asChild?: AsChild<"div">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ spacing: 2, orientation: "horizontal" } as const, props),
    [
      "variant",
      "size",
      "spacing",
      "orientation",
      "onValueChange",
      "asChild",
      "class",
      "sx",
      "children",
    ]
  )
  const own = () => styleProps(local.class, toggleGroup.root, local.sx)
  return (
    <ToggleGroupContext.Provider
      value={{
        get variant() {
          return local.variant
        },
        get size() {
          return local.size
        },
        get spacing() {
          return local.spacing
        },
      }}
    >
      {/* The gap, in steps of 0.25rem, as upstream hands it down. */}
      <ToggleGroupPrimitive
        render={asRender(local.asChild)}
        data-slot="toggle-group"
        data-variant={local.variant}
        data-size={local.size}
        data-spacing={local.spacing}
        data-orientation={local.orientation}
        orientation={local.orientation}
        {...rest}
        onValueChange={(value: unknown[]) =>
          local.onValueChange?.({ value: value as string[] })
        }
        class={own().class}
        style={{ ...own().style, "--gap": String(local.spacing) }}
      >
        {local.children}
      </ToggleGroupPrimitive>
    </ToggleGroupContext.Provider>
  )
}

function ToggleGroupItem(props: {
  value: string
  variant?: ToggleVariants["variant"]
  size?: ToggleVariants["size"]
  asChild?: AsChild<"button">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ variant: "default", size: "default" } as const, props),
    ["value", "variant", "size", "asChild", "class", "sx", "children"]
  )
  const context = useContext(ToggleGroupContext)
  const chosen = createMemo(() => ({
    variant: context?.variant || local.variant,
    size: context?.size || local.size,
  }))
  return (
    <TogglePrimitive
      render={asRender(local.asChild)}
      data-slot="toggle-group-item"
      value={local.value}
      data-variant={chosen().variant}
      data-size={chosen().size}
      data-spacing={context?.spacing ?? 2}
      {...rest}
      {...styleProps(
        local.class,
        toggleScope.anchor,
        toggle(chosen()),
        toggleGroup.item,
        local.sx
      )}
    >
      {local.children}
    </TogglePrimitive>
  )
}

export { ToggleGroup, ToggleGroupItem }
