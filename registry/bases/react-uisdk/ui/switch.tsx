"use client"

import type { ComponentProps } from "react"

import { props as styleProps } from "@kirana-style/core"
import * as SwitchPrimitive from "@ui-sdk/react/switch"

import type { Sx } from "../../../lib/sx"
import { slotRender } from "../../../lib/uisdk-slot"
import { switchStyles } from "../../../styles/switch.styles"

function Switch({
  sx,
  size = "default",
  ...props
}: Omit<ComponentProps<typeof SwitchPrimitive.Switch>, "className"> & {
  sx?: Sx
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive.Switch
      data-size={size}
      {...props}
      render={slotRender("switch", "span", props.render)}
      {...styleProps(switchStyles.root, sx)}
    >
      <SwitchPrimitive.SwitchThumb
        {...styleProps(switchStyles.thumb)}
        render={slotRender("switch-thumb", "span")}
      />
    </SwitchPrimitive.Switch>
  )
}

export { Switch }
