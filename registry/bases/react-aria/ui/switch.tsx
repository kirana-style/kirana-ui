"use client"

import { props as styleProps } from "@kirana-style/core"
import {
  composeRenderProps,
  Switch as SwitchPrimitive,
} from "react-aria-components"
import type { SwitchProps } from "react-aria-components"

import type { Sx } from "../../../lib/sx"
import { switchStyles } from "../../../styles/switch.styles"

function Switch({
  sx,
  size = "default",
  children,
  ...props
}: Omit<SwitchProps, "className" | "style"> & {
  sx?: Sx
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive
      data-slot="switch"
      data-size={size}
      {...props}
      {...styleProps(switchStyles.root, sx)}
    >
      {composeRenderProps(children, (content, { isSelected }) => (
        <>
          <span
            data-slot="switch-thumb"
            data-selected={isSelected || undefined}
            sx={switchStyles.thumb}
          />
          {content}
        </>
      ))}
    </SwitchPrimitive>
  )
}

export { Switch }
