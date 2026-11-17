"use client"

import * as React from "react"

import type { Sx } from "../../../lib/sx"
import { label } from "../../../styles/label.styles"

function Label({
  sx,
  ...props
}: Omit<React.ComponentProps<"label">, "className"> & { sx?: Sx }) {
  return <label data-slot="label" {...props} sx={[label, sx]} />
}

export { Label }
