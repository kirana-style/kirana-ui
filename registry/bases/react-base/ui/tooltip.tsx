"use client"

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"
import { props as styleProps } from "@kirana-style/core"

import type { Sx } from "../../../lib/sx"
import { popupMotion } from "../../../styles/overlay.styles"
import { tooltip } from "../../../styles/tooltip.styles"

function TooltipProvider({
  delay = 0,
  ...props
}: TooltipPrimitive.Provider.Props) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delay={delay}
      {...props}
    />
  )
}

function Tooltip({ ...props }: TooltipPrimitive.Root.Props) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />
}

function TooltipTrigger({ ...props }: TooltipPrimitive.Trigger.Props) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  sx,
  side = "top",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  children,
  ...props
}: Omit<TooltipPrimitive.Popup.Props, "className"> &
  Pick<
    TooltipPrimitive.Positioner.Props,
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
