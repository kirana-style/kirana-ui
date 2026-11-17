"use client"

import type * as React from "react"
import type { PartProps } from "../../../lib/kirana-render"

import { ScrollArea as ScrollAreaPrimitive } from "@kirana-ui/react/scroll-area"
import { props as styleProps } from "@kirana-style/core"

import type { Sx } from "../../../lib/sx"
import { scrollArea } from "../../../styles/scroll-area.styles"

function ScrollArea({
  sx,
  children,
  ...props
}: Omit<PartProps<typeof ScrollAreaPrimitive.Root>, "className"> & {
  sx?: Sx
}) {
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

/**
 * Base UI's placement of a scrollbar, which it writes inline and the primitives do not (PF-020):
 * along its edge, short of the corner. Remove with the release that places it.
 */
const PLACEMENT = {
  vertical: {
    position: "absolute",
    top: 0,
    bottom: "var(--scroll-area-corner-height)",
    insetInlineEnd: 0,
  },
  horizontal: {
    position: "absolute",
    insetInlineStart: 0,
    insetInlineEnd: "var(--scroll-area-corner-width)",
    bottom: 0,
  },
} satisfies Record<string, React.CSSProperties>

function ScrollBar({
  sx,
  orientation = "vertical",
  style,
  ...props
}: Omit<PartProps<typeof ScrollAreaPrimitive.Scrollbar>, "className"> & {
  sx?: Sx
}) {
  const styled = styleProps(scrollArea.scrollbar, sx)
  return (
    <ScrollAreaPrimitive.Scrollbar
      data-slot="scroll-area-scrollbar"
      data-orientation={orientation}
      orientation={orientation}
      {...props}
      {...styled}
      style={{
        ...PLACEMENT[orientation === "horizontal" ? "horizontal" : "vertical"],
        ...styled.style,
        ...style,
      }}
    >
      <ScrollAreaPrimitive.Thumb
        data-slot="scroll-area-thumb"
        {...styleProps(scrollArea.thumb)}
      />
    </ScrollAreaPrimitive.Scrollbar>
  )
}

export { ScrollArea, ScrollBar }
