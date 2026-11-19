import { omit } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import {
  HoverCard as HoverCardPrimitive,
  HoverCardContent as HoverCardContentPrimitive,
  HoverCardTrigger as HoverCardTriggerPrimitive,
} from "@ui-sdk/solid/hover-card"
import type { JSX } from "@solidjs/web"
import type { Sx } from "@kirana-style/core"

import type { AsChild } from "../../../lib/solid2/element"
import {
  popupContainer,
  sideOf,
  UisdkPart,
} from "../../../lib/solid2/uisdk-part"
import { hoverCard } from "../../../styles/hover-card.styles"
import { popupMotion } from "../../../styles/overlay.styles"

/**
 * ui-sdk's hover card, taking Ark UI's root's props: `openDelay` and `closeDelay` are its `delay`
 * and `closeDelay`. `open` is given with `onOpenChange` called with `{ open }`, as Solid's Ark UI
 * parts take it. It renders no element; its popup renders in the body, as Base UI's portal puts it.
 */
function HoverCard(props: {
  open?: boolean
  defaultOpen?: boolean
  openDelay?: number
  closeDelay?: number
  onOpenChange?: (details: { open: boolean }) => void
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
    <HoverCardPrimitive
      container={popupContainer()}
      delay={props.openDelay}
      closeDelay={props.closeDelay}
      {...rest}
      onOpenChange={(open: boolean) => props.onOpenChange?.({ open })}
    >
      {props.children}
    </HoverCardPrimitive>
  )
}

function HoverCardContent(props: {
  // Declared here, not imported: Vue resolves an imported props type through TypeScript's
  // JavaScript API, which TypeScript 7 does not have.
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
    <UisdkPart
      part={HoverCardContentPrimitive}
      slotName="hover-card-content"
      tag="div"
      side={sideOf(props.side ?? "bottom")}
      sideOffset={props.sideOffset ?? 4}
      align={props.align ?? "center"}
      alignOffset={props.alignOffset ?? 4}
      {...rest}
      {...styleProps(
        props.class,
        hoverCard.positioner,
        popupMotion,
        hoverCard.content,
        props.sx
      )}
    >
      {props.children}
    </UisdkPart>
  )
}

function HoverCardTrigger(props: {
  asChild?: AsChild<"button">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "asChild", "class", "sx", "children")
  return (
    <UisdkPart
      part={HoverCardTriggerPrimitive}
      slotName="hover-card-trigger"
      tag="a"
      asChild={props.asChild}
      {...rest}
      {...styleProps(props.class, props.sx)}
    >
      {props.children}
    </UisdkPart>
  )
}

export { HoverCard, HoverCardContent, HoverCardTrigger }
