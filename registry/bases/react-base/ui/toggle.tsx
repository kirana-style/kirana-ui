"use client"

import { props as styleProps } from "@kirana-style/core"
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"

import type { Sx } from "../../../lib/sx"
import { toggle, toggleScope } from "../../../styles/toggle.styles"

type ToggleVariants = NonNullable<Parameters<typeof toggle>[0]>

function Toggle({
  sx,
  variant = "default",
  size = "default",
  ...props
}: Omit<TogglePrimitive.Props, "className"> & ToggleVariants & { sx?: Sx }) {
  return (
    <TogglePrimitive
      data-slot="toggle"
      {...props}
      {...styleProps(toggleScope.anchor, toggle({ variant, size }), sx)}
    />
  )
}

export { Toggle, toggle as toggleVariants }
export type { ToggleVariants }
