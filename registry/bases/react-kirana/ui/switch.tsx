"use client"

import type { PartProps } from "../../../lib/kirana-render"

import { props as styleProps } from "@kirana-style/core"
import { Switch as SwitchPrimitive } from "@kirana-ui/react/switch"

import type { Sx } from "../../../lib/sx"
import { switchStyles } from "../../../styles/switch.styles"

function Switch({
  sx,
  size = "default",
  ...props
}: Omit<PartProps<typeof SwitchPrimitive.Root>, "className"> & {
  sx?: Sx
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      {...props}
      {...styleProps(switchStyles.root, sx)}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        {...styleProps(switchStyles.thumb)}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
