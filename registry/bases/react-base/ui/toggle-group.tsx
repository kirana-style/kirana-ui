"use client"

import * as React from "react"
import { props as styleProps } from "@kirana-style/core"
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group"

import type { Sx } from "../../../lib/sx"
import { toggleGroup } from "../../../styles/toggle-group.styles"
import { toggle, toggleScope } from "../../../styles/toggle.styles"
import type { ToggleVariants } from "./toggle"

type GroupContext = ToggleVariants & {
  spacing?: number
  orientation?: "horizontal" | "vertical"
}

const ToggleGroupContext = React.createContext<GroupContext>({
  size: "default",
  variant: "default",
  spacing: 2,
  orientation: "horizontal",
})

function ToggleGroup({
  sx,
  variant,
  size,
  spacing = 2,
  orientation = "horizontal",
  children,
  ...props
}: Omit<ToggleGroupPrimitive.Props, "className" | "style"> &
  GroupContext & { sx?: Sx }) {
  const own = styleProps(toggleGroup.root, sx)
  return (
    <ToggleGroupPrimitive
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      data-spacing={spacing}
      data-orientation={orientation}
      orientation={orientation}
      {...props}
      className={own.className}
      // The gap, in steps of 0.25rem, as upstream hands it down.
      style={{ "--gap": spacing, ...own.style } as React.CSSProperties}
    >
      <ToggleGroupContext.Provider
        value={{ variant, size, spacing, orientation }}
      >
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive>
  )
}

function ToggleGroupItem({
  sx,
  variant = "default",
  size = "default",
  ...props
}: Omit<TogglePrimitive.Props, "className"> & ToggleVariants & { sx?: Sx }) {
  const context = React.useContext(ToggleGroupContext)
  const chosen = {
    variant: context.variant || variant,
    size: context.size || size,
  }
  return (
    <TogglePrimitive
      data-slot="toggle-group-item"
      data-variant={chosen.variant}
      data-size={chosen.size}
      data-spacing={context.spacing}
      {...props}
      {...styleProps(toggleScope.anchor, toggle(chosen), toggleGroup.item, sx)}
    />
  )
}

export { ToggleGroup, ToggleGroupItem }
