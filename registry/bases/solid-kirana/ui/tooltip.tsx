import { omit } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { Tooltip as TooltipPrimitive } from "@kirana-ui/solid/tooltip"
import { asRender } from "../../../lib/solid2/element"
import { popupMotion } from "../../../styles/overlay.styles"
import { tooltip } from "../../../styles/tooltip.styles"
import type { JSX } from "@solidjs/web"
import type { Sx } from "@kirana-style/core"
import type { AsChild } from "../../../lib/solid2/element"

/**
 * Kirana UI's tooltip, taking the Ark UI parts' props: `open`, `defaultOpen`, `onOpenChange` (given
 * `{ open }`), `openDelay` and `closeDelay`. It opens at once, as shadcn/ui's `TooltipProvider`
 * (`delay = 0`) does, through the root's `delay`. It renders no element.
 */
function Tooltip(props: {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (details: { open: boolean }) => void
  openDelay?: number
  closeDelay?: number
  disabled?: boolean
  children?: JSX.Element
  [attribute: string]: unknown
  sx?: Sx
  class?: string
}) {
  const rest = omit(
    props,
    "openDelay",
    "closeDelay",
    "onOpenChange",
    "children",
    "sx",
    "class"
  )
  return (
    <TooltipPrimitive.Root
      {...rest}
      delay={props.openDelay ?? 0}
      closeDelay={props.closeDelay}
      onOpenChange={(open) => props.onOpenChange?.({ open })}
    >
      {props.children}
    </TooltipPrimitive.Root>
  )
}

function TooltipContent(props: {
  side?: "top" | "right" | "bottom" | "left" | "inline-start" | "inline-end"
  sideOffset?: number
  align?: "start" | "center" | "end"
  alignOffset?: number
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(
    props,
    "side",
    "sideOffset",
    "align",
    "alignOffset",
    "class",
    "sx",
    "children"
  )
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        side={props.side ?? "top"}
        sideOffset={props.sideOffset ?? 4}
        align={props.align ?? "center"}
        alignOffset={props.alignOffset ?? 0}
        {...styleProps(tooltip.positioner)}
      >
        <TooltipPrimitive.Popup
          data-slot="tooltip-content"
          {...rest}
          {...styleProps(props.class, popupMotion, tooltip.content, props.sx)}
        >
          {props.children}
          <TooltipPrimitive.Arrow {...styleProps(tooltip.arrow)} />
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  )
}

function TooltipTrigger(props: {
  asChild?: AsChild<"button">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "asChild", "class", "sx", "children")
  return (
    <TooltipPrimitive.Trigger
      data-slot="tooltip-trigger"
      {...rest}
      {...styleProps(props.class, props.sx)}
      render={asRender(props.asChild)}
    >
      {props.children}
    </TooltipPrimitive.Trigger>
  )
}

export { Tooltip, TooltipContent, TooltipTrigger }
