import { mergeProps, splitProps } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { Tooltip as TooltipPrimitive } from "@kirana-ui/solid/tooltip"
import { asRender } from "../../../lib/solid/element"
import { popupMotion } from "../../../styles/overlay.styles"
import { tooltip } from "../../../styles/tooltip.styles"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"
import type { AsChild } from "../../../lib/solid/element"

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
  const [local, , rest] = splitProps(
    mergeProps({ openDelay: 0 } as const, props),
    ["openDelay", "closeDelay", "onOpenChange", "children"],
    ["sx", "class"]
  )
  return (
    <TooltipPrimitive.Root
      {...rest}
      delay={local.openDelay}
      closeDelay={local.closeDelay}
      onOpenChange={(open) => local.onOpenChange?.({ open })}
    >
      {local.children}
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
  const [local, rest] = splitProps(
    mergeProps(
      { side: "top", sideOffset: 4, align: "center", alignOffset: 0 } as const,
      props
    ),
    ["side", "sideOffset", "align", "alignOffset", "class", "sx", "children"]
  )
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        side={local.side}
        sideOffset={local.sideOffset}
        align={local.align}
        alignOffset={local.alignOffset}
        {...styleProps(tooltip.positioner)}
      >
        <TooltipPrimitive.Popup
          data-slot="tooltip-content"
          {...rest}
          {...styleProps(local.class, popupMotion, tooltip.content, local.sx)}
        >
          {local.children}
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
  const [local, rest] = splitProps(props, [
    "asChild",
    "class",
    "sx",
    "children",
  ])
  return (
    <TooltipPrimitive.Trigger
      data-slot="tooltip-trigger"
      {...rest}
      {...styleProps(local.class, local.sx)}
      render={asRender(local.asChild)}
    >
      {local.children}
    </TooltipPrimitive.Trigger>
  )
}

export { Tooltip, TooltipContent, TooltipTrigger }
