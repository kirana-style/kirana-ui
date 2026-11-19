import { omit } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import {
  Tooltip as TooltipPrimitive,
  TooltipArrow,
  TooltipContent as TooltipContentPrimitive,
  TooltipTrigger as TooltipTriggerPrimitive,
} from "@ui-sdk/solid/tooltip"
import type { JSX } from "@solidjs/web"
import type { Sx } from "@kirana-style/core"

import type { AsChild } from "../../../lib/solid2/element"
import {
  popupContainer,
  sideOf,
  UisdkPart,
} from "../../../lib/solid2/uisdk-part"
import { popupMotion } from "../../../styles/overlay.styles"
import { tooltip } from "../../../styles/tooltip.styles"

/**
 * ui-sdk's tooltip, taking Ark UI's root's props: `openDelay` is its `delay`, `0` as upstream's
 * site opens a tooltip at once (shadcn/ui's `TooltipProvider`). `open` is given with
 * `onOpenChange` called with `{ open }`, as Solid's Ark UI parts take it. It renders no element;
 * its popup renders in the body, as Base UI's portal puts it.
 */
function Tooltip(props: {
  open?: boolean
  defaultOpen?: boolean
  openDelay?: number
  onOpenChange?: (details: { open: boolean }) => void
  children?: JSX.Element
  [attribute: string]: unknown
  sx?: Sx
  class?: string
}) {
  const rest = omit(
    props,
    "openDelay",
    "onOpenChange",
    "children",
    "sx",
    "class"
  )
  return (
    <TooltipPrimitive
      container={popupContainer()}
      delay={props.openDelay ?? 0}
      {...rest}
      onOpenChange={(open: boolean) => props.onOpenChange?.({ open })}
    >
      {props.children}
    </TooltipPrimitive>
  )
}

function TooltipContent(props: {
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
      part={TooltipContentPrimitive}
      slotName="tooltip-content"
      tag="div"
      side={sideOf(props.side ?? "top")}
      sideOffset={props.sideOffset ?? 4}
      align={props.align ?? "center"}
      alignOffset={props.alignOffset ?? 0}
      {...rest}
      {...styleProps(
        props.class,
        tooltip.positioner,
        popupMotion,
        tooltip.content,
        props.sx
      )}
    >
      {props.children}
      <TooltipArrow {...styleProps(tooltip.arrow)} />
    </UisdkPart>
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
  // `type="button"`, as every base's tooltip trigger: a trigger in a form never submits it (LF-021).
  // ui-sdk writes it on its own element too; this keeps it on the caller's (`asChild`).
  return (
    <UisdkPart
      part={TooltipTriggerPrimitive}
      slotName="tooltip-trigger"
      tag="button"
      asChild={props.asChild}
      type="button"
      {...rest}
      {...styleProps(props.class, props.sx)}
    >
      {props.children}
    </UisdkPart>
  )
}

export { Tooltip, TooltipContent, TooltipTrigger }
