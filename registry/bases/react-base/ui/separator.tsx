"use client"

import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"
import { props as styleProps } from "@kirana-style/core"

import type { Sx } from "../../../lib/sx"
import { separator } from "../../../styles/separator.styles"

function Separator({
  sx,
  orientation = "horizontal",
  ...props
}: Omit<SeparatorPrimitive.Props, "className"> & { sx?: Sx }) {
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
