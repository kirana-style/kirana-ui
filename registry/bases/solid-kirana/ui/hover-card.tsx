import { omit } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { HoverCard as HoverCardPrimitive } from "@kirana-ui/solid/hover-card"
import { asRender } from "../../../lib/solid2/element"
import { hoverCard } from "../../../styles/hover-card.styles"
import { popupMotion } from "../../../styles/overlay.styles"
import type { JSX } from "@solidjs/web"
import type { Sx } from "@kirana-style/core"
import type { AsChild } from "../../../lib/solid2/element"

/**
 * Kirana UI's hover card, taking the Ark UI parts' props: `open`, `defaultOpen`, `onOpenChange`
 * (given `{ open }`), `openDelay` (the root's `delay`) and `closeDelay`. It renders no element.
 */
function HoverCard(props: {
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
    <HoverCardPrimitive.Root
      {...rest}
      delay={props.openDelay}
      closeDelay={props.closeDelay}
      onOpenChange={(open) => props.onOpenChange?.({ open })}
    >
      {props.children}
    </HoverCardPrimitive.Root>
  )
}

function HoverCardContent(props: {
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
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Positioner
        side={props.side ?? "bottom"}
        sideOffset={props.sideOffset ?? 4}
        align={props.align ?? "center"}
        alignOffset={props.alignOffset ?? 4}
        {...styleProps(hoverCard.positioner)}
      >
        <HoverCardPrimitive.Popup
          data-slot="hover-card-content"
          {...rest}
          {...styleProps(props.class, popupMotion, hoverCard.content, props.sx)}
        >
          {props.children}
        </HoverCardPrimitive.Popup>
      </HoverCardPrimitive.Positioner>
    </HoverCardPrimitive.Portal>
  )
}

function HoverCardTrigger(props: {
  asChild?: AsChild<"a">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "asChild", "class", "sx", "children")
  return (
    <HoverCardPrimitive.Trigger
      data-slot="hover-card-trigger"
      {...rest}
      {...styleProps(props.class, props.sx)}
      render={asRender(props.asChild)}
    >
      {props.children}
    </HoverCardPrimitive.Trigger>
  )
}

export { HoverCard, HoverCardContent, HoverCardTrigger }
