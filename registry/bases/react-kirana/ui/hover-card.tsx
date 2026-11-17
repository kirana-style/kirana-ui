"use client"

import type { PartProps } from "../../../lib/kirana-render"
import { useSide } from "../../../lib/kirana-side"
import type { Side } from "../../../lib/placement"

import { HoverCard as PreviewCardPrimitive } from "@kirana-ui/react/hover-card"
import { props as styleProps } from "@kirana-style/core"

import type { Sx } from "../../../lib/sx"
import { hoverCard } from "../../../styles/hover-card.styles"
import { popupMotion } from "../../../styles/overlay.styles"

function HoverCard({ ...props }: PartProps<typeof PreviewCardPrimitive.Root>) {
  return <PreviewCardPrimitive.Root data-slot="hover-card" {...props} />
}

function HoverCardTrigger({
  ...props
}: PartProps<typeof PreviewCardPrimitive.Trigger>) {
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
}: Omit<PartProps<typeof PreviewCardPrimitive.Popup>, "className"> &
  Pick<
    PartProps<typeof PreviewCardPrimitive.Positioner>,
    "align" | "alignOffset" | "sideOffset"
  > & {
    /** Base UI\'s sides, the logical two among them (PF-016). */
    side?: Side
  } & { sx?: Sx }) {
  return (
    <PreviewCardPrimitive.Portal data-slot="hover-card-portal">
      <PreviewCardPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={useSide(side)}
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
