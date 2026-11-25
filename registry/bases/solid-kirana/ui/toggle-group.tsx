import { Toggle as TogglePrimitive } from "@kirana-ui/solid/toggle"
import { ToggleGroup as ToggleGroupPrimitive } from "@kirana-ui/solid/toggle-group"
import { props as styleProps } from "@kirana-style/core"
import type { Sx } from "@kirana-style/core"
import { createContext, createMemo, merge, omit, useContext } from "solid-js"
import type { JSX } from "@solidjs/web"

import { asRender } from "../../../lib/solid2/element"
import type { AsChild } from "../../../lib/solid2/element"
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
  const local = merge(props, {
    get spacing() {
      return props.spacing ?? 2
    },
    get orientation() {
      return props.orientation ?? ("horizontal" as const)
    },
  })
  const rest = omit(
    local,
    "variant",
    "size",
    "spacing",
    "orientation",
    "onValueChange",
    "asChild",
    "class",
    "sx",
    "children"
  )
  const own = () => styleProps(local.class, toggleGroup.root, local.sx)
  return (
    <ToggleGroupContext
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
    </ToggleGroupContext>
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
  const local = merge(props, {
    get variant() {
      return props.variant ?? ("default" as const)
    },
    get size() {
      return props.size ?? ("default" as const)
    },
  })
  const rest = omit(
    local,
    "value",
    "variant",
    "size",
    "asChild",
    "class",
    "sx",
    "children"
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
