"use client"

import { createContext, use } from "react"
import type { ComponentProps, ReactNode } from "react"
import * as TooltipPrimitive from "@ui-sdk/react/tooltip"
import { props as styleProps } from "@kirana-style/core"

import type { Sx } from "../../../lib/sx"
import { popupContainer, sideOf, slotRender } from "../../../lib/uisdk-slot"
import type { BaseSide } from "../../../lib/uisdk-slot"
import { popupMotion } from "../../../styles/overlay.styles"
import { tooltip } from "../../../styles/tooltip.styles"

/**
 * Base UI's Tooltip.Provider, which ui-sdk has no part for (its tooltips open at once after another
 * on their own): the delays the tooltips inside it start with, `0` by default as upstream's site has
 * it.
 */
const Delays = createContext<{ delay?: number; closeDelay?: number }>({})

function TooltipProvider({
  delay = 0,
  closeDelay,
  children,
}: {
  delay?: number
  closeDelay?: number
  children?: ReactNode
}) {
  return <Delays value={{ delay, closeDelay }}>{children}</Delays>
}

function Tooltip(props: ComponentProps<typeof TooltipPrimitive.Tooltip>) {
  const delays = use(Delays)
  return (
    <TooltipPrimitive.Tooltip
      data-slot="tooltip"
      container={popupContainer()}
      delay={delays.delay}
      closeDelay={delays.closeDelay}
      {...props}
    />
  )
}

function TooltipTrigger(
  props: ComponentProps<typeof TooltipPrimitive.TooltipTrigger>
) {
  return (
    <TooltipPrimitive.TooltipTrigger
      {...props}
      render={slotRender("tooltip-trigger", "button", props.render)}
    />
  )
}

function TooltipContent({
  sx,
  side = "top",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  children,
  ...props
}: Omit<
  ComponentProps<typeof TooltipPrimitive.TooltipContent>,
  "className" | "children" | "side"
> & { sx?: Sx; children?: ReactNode; side?: BaseSide }) {
  // ui-sdk's content places itself (no positioner): the positioner's styles join the content's.
  return (
    <TooltipPrimitive.TooltipContent
      sideOffset={sideOffset}
      align={align}
      alignOffset={alignOffset}
      {...props}
      side={sideOf(side)}
      render={slotRender("tooltip-content", "div", props.render)}
      {...styleProps(tooltip.positioner, popupMotion, tooltip.content, sx)}
    >
      {children}
      <TooltipPrimitive.TooltipArrow {...styleProps(tooltip.arrow)} />
    </TooltipPrimitive.TooltipContent>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
