"use client"

import type * as React from "react"

import { HoverCard as PreviewCardPrimitive } from "@kirana-ui/react/hover-card"
import { props as styleProps } from "@kirana-style/core"

import type { Sx } from "../../../lib/sx"
import { hoverCard } from "../../../styles/hover-card.styles"
import { popupMotion } from "../../../styles/overlay.styles"

function HoverCard({
  ...props
}: React.ComponentProps<typeof PreviewCardPrimitive.Root>) {
  return <PreviewCardPrimitive.Root data-slot="hover-card" {...props} />
}

function HoverCardTrigger({
  ...props
}: React.ComponentProps<typeof PreviewCardPrimitive.Trigger>) {
  return (
    <PreviewCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
  )
}

function HoverCardContent({
  sx,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 4,
  ...props
}: Omit<React.ComponentProps<typeof PreviewCardPrimitive.Popup>, "className"> &
  Pick<
    React.ComponentProps<typeof PreviewCardPrimitive.Positioner>,
    "align" | "alignOffset" | "side" | "sideOffset"
  > & { sx?: Sx }) {
  return (
    <PreviewCardPrimitive.Portal data-slot="hover-card-portal">
      <PreviewCardPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        {...styleProps(hoverCard.positioner)}
      >
        <PreviewCardPrimitive.Popup
          data-slot="hover-card-content"
          {...props}
          {...styleProps(popupMotion, hoverCard.content, sx)}
        />
      </PreviewCardPrimitive.Positioner>
    </PreviewCardPrimitive.Portal>
  )
}

export { HoverCard, HoverCardTrigger, HoverCardContent }
