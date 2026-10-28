"use client"

import * as React from "react"
import { Popover as PopoverPrimitive } from "@base-ui/react/popover"
import { props as styleProps } from "@kirana-style/core"

import type { Sx } from "../../../lib/sx"
import { popupMotion } from "../../../styles/overlay.styles"
import { popover } from "../../../styles/popover.styles"

type Props<P> = Omit<P, "className"> & { sx?: Sx }

function Popover({ ...props }: PopoverPrimitive.Root.Props) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

function PopoverTrigger({ ...props }: PopoverPrimitive.Trigger.Props) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

function PopoverContent({
  sx,
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  ...props
}: Props<PopoverPrimitive.Popup.Props> &
  Pick<
    PopoverPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        {...styleProps(popover.positioner)}
      >
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          {...props}
          {...styleProps(popupMotion, popover.content, sx)}
        />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  )
}

function PopoverHeader({
  sx,
  ...props
}: Omit<React.ComponentProps<"div">, "className"> & { sx?: Sx }) {
  return <div data-slot="popover-header" {...props} sx={[popover.header, sx]} />
}

function PopoverTitle({ sx, ...props }: Props<PopoverPrimitive.Title.Props>) {
  return (
    <PopoverPrimitive.Title
      data-slot="popover-title"
      {...props}
      {...styleProps(popover.title, sx)}
    />
  )
}

function PopoverDescription({
  sx,
  ...props
}: Props<PopoverPrimitive.Description.Props>) {
  return (
    <PopoverPrimitive.Description
      data-slot="popover-description"
      {...props}
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
