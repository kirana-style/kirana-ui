"use client"

import type { ComponentProps } from "react"
import { Separator as SeparatorPrimitive } from "@ui-sdk/react/separator"
import { props as styleProps } from "@kirana-style/core"

import type { Sx } from "../../../lib/sx"
import { slotOf, slotRender } from "../../../lib/uisdk-slot"
import { separator } from "../../../styles/separator.styles"

function Separator({
  sx,
  orientation = "horizontal",
  ...props
}: Omit<ComponentProps<typeof SeparatorPrimitive>, "className"> & { sx?: Sx }) {
  return (
    <SeparatorPrimitive
      orientation={orientation}
      {...props}
      render={slotRender(slotOf(props, "separator"), "div", props.render)}
      {...styleProps(separator, sx)}
    />
  )
}

export { Separator }
