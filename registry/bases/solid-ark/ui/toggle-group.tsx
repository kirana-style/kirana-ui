import {
  ToggleGroupItem as ArkToggleGroupItem,
  ToggleGroupRoot,
} from "@ark-ui/solid"
import type { ToggleGroupItemProps, ToggleGroupRootProps } from "@ark-ui/solid"
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

function ToggleGroup(props: {
  variant?: ToggleVariants["variant"]
  size?: ToggleVariants["size"]
  spacing?: number
  orientation?: "horizontal" | "vertical"
  asChild?: ToggleGroupRootProps["asChild"]
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ spacing: 2, orientation: "horizontal" } as const, props),
    ["variant", "size", "spacing", "orientation", "class", "sx", "children"]
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
      <ToggleGroupRoot
        data-slot="toggle-group"
        data-variant={local.variant}
        data-size={local.size}
        data-spacing={local.spacing}
        data-orientation={local.orientation}
        orientation={local.orientation}
        {...rest}
        class={own().class}
        style={{ ...own().style, "--gap": String(local.spacing) }}
      >
        {local.children}
      </ToggleGroupRoot>
    </ToggleGroupContext.Provider>
  )
}

function ToggleGroupItem(props: {
  value: string
  variant?: ToggleVariants["variant"]
  size?: ToggleVariants["size"]
  asChild?: ToggleGroupItemProps["asChild"]
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ variant: "default", size: "default" } as const, props),
    ["value", "variant", "size", "class", "sx", "children"]
  )
  const context = useContext(ToggleGroupContext)
  const chosen = createMemo(() => ({
    variant: context?.variant || local.variant,
    size: context?.size || local.size,
  }))
  return (
    <ArkToggleGroupItem
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
    </ArkToggleGroupItem>
  )
}

export { ToggleGroup, ToggleGroupItem }
