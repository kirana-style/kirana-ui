"use client"

import * as React from "react"

import type { Sx } from "../../../lib/sx"
import { scrollArea } from "../../../styles/scroll-area.styles"

function ScrollArea({
  sx,
  children,
  ...props
}: Omit<React.ComponentProps<"div">, "className"> & { sx?: Sx }) {
  // The browser's own scrollbar, thin and in the border colour.
  return (
    <div data-slot="scroll-area" {...props} sx={[scrollArea.native, sx]}>
      {children}
    </div>
  )
}

export { ScrollArea }
