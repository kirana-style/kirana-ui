"use client"

import { createContext, use, useLayoutEffect, useState } from "react"
import type { ComponentProps } from "react"
import * as HoverCardPrimitive from "@ui-sdk/react/hover-card"
import { props as styleProps } from "@kirana-style/core"

import type { Sx } from "../../../lib/sx"
import {
  popupContainer,
  sideOf,
  slotRender,
  slotOf,
} from "../../../lib/uisdk-slot"
import type { BaseSide } from "../../../lib/uisdk-slot"
import { hoverCard } from "../../../styles/hover-card.styles"
import { popupMotion } from "../../../styles/overlay.styles"

type Delays = { delay?: number; closeDelay?: number }

/**
 * Base UI's delays, which its trigger takes and ui-sdk's root: the trigger hands them up to the
 * root, before any pointer can rest on it.
 */
const SetDelays = createContext<(delays: Delays) => void>(() => {})

function HoverCard(props: ComponentProps<typeof HoverCardPrimitive.HoverCard>) {
  const [delays, setDelays] = useState<Delays>({})
  return (
    <SetDelays value={setDelays}>
      <HoverCardPrimitive.HoverCard
        data-slot="hover-card"
        container={popupContainer()}
        {...delays}
        {...props}
      />
    </SetDelays>
  )
}

function HoverCardTrigger({
  delay,
  closeDelay,
  ...props
}: ComponentProps<typeof HoverCardPrimitive.HoverCardTrigger> & Delays) {
  const setDelays = use(SetDelays)
  useLayoutEffect(() => {
    if (delay !== undefined || closeDelay !== undefined)
      setDelays({ delay, closeDelay })
  }, [delay, closeDelay, setDelays])
  return (
    <HoverCardPrimitive.HoverCardTrigger
      {...props}
      render={slotRender(
        slotOf(props, "hover-card-trigger"),
        "a",
        props.render
      )}
    />
  )
}

function HoverCardContent({
  sx,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 4,
  ...props
}: Omit<
  ComponentProps<typeof HoverCardPrimitive.HoverCardContent>,
  "className" | "side"
> & {
  sx?: Sx
  side?: BaseSide
}) {
  // ui-sdk's content places itself (no positioner): the positioner's styles join the content's.
  return (
    <HoverCardPrimitive.HoverCardContent
      sideOffset={sideOffset}
      align={align}
      alignOffset={alignOffset}
      {...props}
      side={sideOf(side)}
      render={slotRender(
        slotOf(props, "hover-card-content"),
        "div",
        props.render
      )}
      {...styleProps(hoverCard.positioner, popupMotion, hoverCard.content, sx)}
    />
  )
}

export { HoverCard, HoverCardTrigger, HoverCardContent }
