"use client"

import { props as styleProps } from "@kirana-style/core"
import { ToggleButton as TogglePrimitive } from "react-aria-components"
import type { ToggleButtonProps } from "react-aria-components"

import type { Sx } from "../../../lib/sx"
import { toggle, toggleScope } from "../../../styles/toggle.styles"

type ToggleVariants = NonNullable<Parameters<typeof toggle>[0]>

function Toggle({
  sx,
  variant = "default",
  size = "default",
  ...props
}: Omit<ToggleButtonProps, "className" | "style"> &
  ToggleVariants & { sx?: Sx }) {
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
