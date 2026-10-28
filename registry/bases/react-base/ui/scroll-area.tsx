"use client"

import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area"
import { props as styleProps } from "@kirana-style/core"

import type { Sx } from "../../../lib/sx"
import { scrollArea } from "../../../styles/scroll-area.styles"

function ScrollArea({
  sx,
  children,
  ...props
}: Omit<ScrollAreaPrimitive.Root.Props, "className"> & { sx?: Sx }) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      {...props}
      {...styleProps(scrollArea.root, sx)}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        {...styleProps(scrollArea.viewport)}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollBar({
  sx,
  orientation = "vertical",
  ...props
}: Omit<ScrollAreaPrimitive.Scrollbar.Props, "className"> & { sx?: Sx }) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      data-slot="scroll-area-scrollbar"
      data-orientation={orientation}
      orientation={orientation}
      {...props}
      {...styleProps(scrollArea.scrollbar, sx)}
    >
      <ScrollAreaPrimitive.Thumb
        data-slot="scroll-area-thumb"
        {...styleProps(scrollArea.thumb)}
      />
    </ScrollAreaPrimitive.Scrollbar>
  )
}

export { ScrollArea, ScrollBar }
