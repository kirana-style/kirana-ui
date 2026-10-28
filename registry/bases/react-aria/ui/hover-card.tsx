"use client"

import { props as styleProps } from "@kirana-style/core"
import {
  Popover as PopoverPrimitive,
  PreviewTrigger as PreviewTriggerPrimitive,
} from "react-aria-components"
import type {
  PopoverProps as PopoverPrimitiveProps,
  PreviewTriggerProps,
} from "react-aria-components"

import type { Sx } from "../../../lib/sx"
import { hoverCard } from "../../../styles/hover-card.styles"
import { popupMotion } from "../../../styles/overlay.styles"

function HoverCardTrigger({ children, ...props }: PreviewTriggerProps) {
  return (
    <PreviewTriggerPrimitive data-slot="hover-card-trigger" {...props}>
      {children}
    </PreviewTriggerPrimitive>
  )
}

function HoverCard({
  sx,
  placement = "bottom",
  offset = 4,
  crossOffset = 0,
  ...props
}: Omit<PopoverPrimitiveProps, "className" | "style"> & { sx?: Sx }) {
  return (
    <PopoverPrimitive
      data-slot="hover-card-content"
      placement={placement}
      offset={offset}
      crossOffset={crossOffset}
      {...props}
      {...styleProps(popupMotion, hoverCard.content, sx)}
    />
  )
}

export { HoverCard, HoverCardTrigger }
