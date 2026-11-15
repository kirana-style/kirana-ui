"use client"

import type { ComponentProps } from "react"

import * as ScrollAreaPrimitive from "@ui-sdk/react/scroll-area"
import { props as styleProps } from "@kirana-style/core"

import type { Sx } from "../../../lib/sx"
import { slotRender, slotOf } from "../../../lib/uisdk-slot"
import { scrollArea } from "../../../styles/scroll-area.styles"

function ScrollArea({
  sx,
  children,
  ...props
}: Omit<ComponentProps<typeof ScrollAreaPrimitive.ScrollArea>, "className"> & {
  sx?: Sx
}) {
  return (
    <ScrollAreaPrimitive.ScrollArea
      {...props}
      render={slotRender(slotOf(props, "scroll-area"), "div", props.render)}
      {...styleProps(scrollArea.root, sx)}
    >
      <ScrollAreaPrimitive.ScrollAreaViewport
        {...styleProps(scrollArea.viewport)}
        render={slotRender("scroll-area-viewport", "div")}
      >
        {children}
      </ScrollAreaPrimitive.ScrollAreaViewport>
      <ScrollBar />
      <ScrollAreaPrimitive.ScrollAreaCorner />
    </ScrollAreaPrimitive.ScrollArea>
  )
}

function ScrollBar({
  sx,
  orientation = "vertical",
  ...props
}: Omit<
  ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  "className"
> & { sx?: Sx }) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-orientation={orientation}
      orientation={orientation}
      {...props}
      render={slotRender(
        slotOf(props, "scroll-area-scrollbar"),
        "div",
        props.render
      )}
      {...styleProps(scrollArea.scrollbar, sx)}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        {...styleProps(scrollArea.thumb)}
        render={slotRender("scroll-area-thumb", "div")}
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}

export { ScrollArea, ScrollBar }
