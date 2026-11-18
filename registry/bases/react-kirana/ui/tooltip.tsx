"use client"

import * as React from "react"

import { Tooltip as TooltipPrimitive } from "@kirana-ui/react/tooltip"
import { props as styleProps } from "@kirana-style/core"

import type { Sx } from "../../../lib/sx"
import { popupMotion } from "../../../styles/overlay.styles"
import { tooltip } from "../../../styles/tooltip.styles"

/**
 * Base UI's provider, which gives its tooltips their delays: the primitives' tooltip has none, its
 * trigger taking its own `delay` and `closeDelay` (PF-011), so the registry's carries them to each
 * trigger inside it. `0`, as upstream's site opens a tooltip at once.
 */
const Delays = React.createContext<{ delay?: number; closeDelay?: number }>({})

function TooltipProvider({
  delay = 0,
  closeDelay,
  children,
}: {
  delay?: number
  closeDelay?: number
  children?: React.ReactNode
}) {
  return <Delays value={{ delay, closeDelay }}>{children}</Delays>
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  const delays = React.use(Delays)
  return (
    <TooltipPrimitive.Trigger
      data-slot="tooltip-trigger"
      delay={delays.delay}
      closeDelay={delays.closeDelay}
      {...props}
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
}: Omit<React.ComponentProps<typeof TooltipPrimitive.Popup>, "className"> &
  Pick<
    React.ComponentProps<typeof TooltipPrimitive.Positioner>,
    "align" | "alignOffset" | "side" | "sideOffset"
  > & { sx?: Sx }) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        {...styleProps(tooltip.positioner)}
      >
        <TooltipPrimitive.Popup
          data-slot="tooltip-content"
          {...props}
          {...styleProps(popupMotion, tooltip.content, sx)}
        >
          {children}
          <TooltipPrimitive.Arrow {...styleProps(tooltip.arrow)} />
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
