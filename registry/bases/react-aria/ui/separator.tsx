"use client"

import * as React from "react"
import { props as styleProps } from "@kirana-style/core"
import { Separator as SeparatorPrimitive } from "react-aria-components"

import type { Sx } from "../../../lib/sx"
import { separator } from "../../../styles/separator.styles"

function Separator({
  sx,
  orientation = "horizontal",
  ...props
}: Omit<
  React.ComponentProps<typeof SeparatorPrimitive>,
  "className" | "style"
> & { sx?: Sx }) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      {...props}
      {...styleProps(separator, sx)}
    />
  )
}

export { Separator }
