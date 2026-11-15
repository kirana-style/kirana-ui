"use client"

import * as React from "react"
import * as PopoverPrimitive from "@ui-sdk/react/popover"
import { props as styleProps } from "@kirana-style/core"

import type { Sx } from "../../../lib/sx"
import { popupContainer, sideOf, slotRender } from "../../../lib/uisdk-slot"
import type { BaseSide } from "../../../lib/uisdk-slot"
import { popupMotion } from "../../../styles/overlay.styles"
import { popover } from "../../../styles/popover.styles"

type Props<P> = Omit<P, "className"> & { sx?: Sx }

function Popover(props: React.ComponentProps<typeof PopoverPrimitive.Popover>) {
  return (
    <PopoverPrimitive.Popover
      data-slot="popover"
      container={popupContainer()}
      {...props}
    />
  )
}

function PopoverTrigger(
  props: React.ComponentProps<typeof PopoverPrimitive.PopoverTrigger>
) {
  return (
    <PopoverPrimitive.PopoverTrigger
      {...props}
      render={slotRender("popover-trigger", "button", props.render)}
    />
  )
}

function PopoverContent({
  sx,
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  ...props
}: Props<
  Omit<React.ComponentProps<typeof PopoverPrimitive.PopoverContent>, "side">
> & { side?: BaseSide }) {
  // ui-sdk's content places itself (no positioner): the positioner's styles join the content's.
  return (
    <PopoverPrimitive.PopoverContent
      align={align}
      alignOffset={alignOffset}
      sideOffset={sideOffset}
      {...props}
      side={sideOf(side)}
      render={slotRender("popover-content", "div", props.render)}
      {...styleProps(popover.positioner, popupMotion, popover.content, sx)}
    />
  )
}

function PopoverHeader({
  sx,
  ...props
}: Omit<React.ComponentProps<"div">, "className"> & { sx?: Sx }) {
  return <div data-slot="popover-header" {...props} sx={[popover.header, sx]} />
}

function PopoverTitle({
  sx,
  ...props
}: Props<React.ComponentProps<typeof PopoverPrimitive.PopoverTitle>>) {
  return (
    <PopoverPrimitive.PopoverTitle
      {...props}
      render={slotRender("popover-title", "h2", props.render)}
      {...styleProps(popover.title, sx)}
    />
  )
}

function PopoverDescription({
  sx,
  ...props
}: Props<React.ComponentProps<typeof PopoverPrimitive.PopoverDescription>>) {
  return (
    <PopoverPrimitive.PopoverDescription
      {...props}
      render={slotRender("popover-description", "p", props.render)}
      {...styleProps(popover.description, sx)}
    />
  )
}

export {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
}
