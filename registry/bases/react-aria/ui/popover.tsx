"use client"

import * as React from "react"
import { props as styleProps } from "@kirana-style/core"
import {
  DialogTrigger,
  Heading,
  Popover as PopoverPrimitive,
} from "react-aria-components"
import type {
  DialogTriggerProps,
  PopoverProps as PopoverPrimitiveProps,
} from "react-aria-components"

import type { Sx } from "../../../lib/sx"
import { popupMotion } from "../../../styles/overlay.styles"
import { popover } from "../../../styles/popover.styles"

type El = Omit<React.ComponentProps<"div">, "className"> & { sx?: Sx }

function PopoverTrigger({ children, ...props }: DialogTriggerProps) {
  return (
    <DialogTrigger data-slot="popover-trigger" {...props}>
      {children}
    </DialogTrigger>
  )
}

function Popover({
  sx,
  placement = "bottom",
  offset = 4,
  crossOffset = 0,
  ...props
}: Omit<PopoverPrimitiveProps, "className" | "style"> & { sx?: Sx }) {
  return (
    <PopoverPrimitive
      data-slot="popover-content"
      placement={placement}
      offset={offset}
      crossOffset={crossOffset}
      {...props}
      {...styleProps(popupMotion, popover.content, sx)}
    />
  )
}

function PopoverHeader({ sx, ...props }: El) {
  return <div data-slot="popover-header" {...props} sx={[popover.header, sx]} />
}

function PopoverTitle({
  sx,
  ...props
}: Omit<React.ComponentProps<typeof Heading>, "className" | "style"> & {
  sx?: Sx
}) {
  return (
    <Heading
      data-slot="popover-title"
      {...props}
      {...styleProps(popover.title, sx)}
    />
  )
}

function PopoverDescription({ sx, ...props }: El) {
  return (
    <div
      data-slot="popover-description"
      {...props}
      sx={[popover.description, sx]}
    />
  )
}

export {
  Popover,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
}
