"use client"

import * as React from "react"
import { props as styleProps } from "@kirana-style/core"
import { Input as InputPrimitive } from "react-aria-components"

import type { Sx } from "../../../lib/sx"
import { input } from "../../../styles/input.styles"

function Input({
  sx,
  type,
  ...props
}: Omit<React.ComponentProps<typeof InputPrimitive>, "className" | "style"> & {
  sx?: Sx
}) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      {...props}
      {...styleProps(input, sx)}
    />
  )
}

export { Input }
