"use client"

import * as React from "react"
import { props as styleProps } from "@kirana-style/core"
import {
  Focusable,
  OverlayArrow,
  Tooltip as TooltipPrimitive,
  TooltipTrigger as TooltipTriggerPrimitive,
} from "react-aria-components"

import type { Sx } from "../../../lib/sx"
import { popupMotion } from "../../../styles/overlay.styles"
import { tooltip } from "../../../styles/tooltip.styles"

/** Its first child is the trigger, made focusable; its second the tooltip. */
function TooltipTrigger({
  delay = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipTriggerPrimitive>) {
  const [trigger, content] = React.Children.toArray(children)

  return (
    <TooltipTriggerPrimitive
      data-slot="tooltip-trigger"
      delay={delay}
      {...props}
    >
      <Focusable>
        {trigger as React.ComponentProps<typeof Focusable>["children"]}
      </Focusable>
      {content}
    </TooltipTriggerPrimitive>
  )
}

function Tooltip({
  sx,
  placement = "top",
  offset = 4,
  crossOffset = 0,
  children,
  ...props
}: Omit<
  React.ComponentProps<typeof TooltipPrimitive>,
  "children" | "className" | "style"
> & {
  sx?: Sx
  children?: React.ReactNode
}) {
  const arrow = styleProps(tooltip.arrow)
  return (
    <TooltipPrimitive
      data-slot="tooltip-content"
      placement={placement}
      offset={offset}
      crossOffset={crossOffset}
      {...props}
      {...styleProps(popupMotion, tooltip.content, sx)}
    >
      {children}
      <OverlayArrow
        className={arrow.className}
        // Upstream's: React Aria places the arrow, turned on its corner and set out from the side.
        style={({ placement: side, defaultStyle }) => ({
          ...arrow.style,
          ...defaultStyle,
          rotate: "0deg",
          translate: "0 0",
          transform:
            side === "bottom"
              ? "translate(-50%, calc(50% + 2px)) rotate(45deg)"
              : side === "top"
                ? "translate(-50%, calc(-50% - 2px)) rotate(45deg)"
                : side === "left"
                  ? "translate(calc(-50% - 2px), -50%) rotate(45deg)"
                  : "translate(calc(50% + 2px), -50%) rotate(45deg)",
        })}
      />
    </TooltipPrimitive>
  )
}

export { Tooltip, TooltipTrigger }
