import { omit } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import {
  Popover as PopoverPrimitive,
  PopoverContent as PopoverContentPrimitive,
  PopoverDescription as PopoverDescriptionPrimitive,
  PopoverTitle as PopoverTitlePrimitive,
  PopoverTrigger as PopoverTriggerPrimitive,
} from "@ui-sdk/solid/popover"
import type { JSX } from "@solidjs/web"
import type { Sx } from "@kirana-style/core"

import type { AsChild } from "../../../lib/solid2/element"
import {
  popupContainer,
  sideOf,
  UisdkPart,
} from "../../../lib/solid2/uisdk-part"
import { popupMotion } from "../../../styles/overlay.styles"
import { popover } from "../../../styles/popover.styles"

/**
 * ui-sdk's popover, taking Ark UI's root's props: `open` is given with `onOpenChange` called with
 * `{ open }`, as Solid's Ark UI parts take it. It renders no element; its popup renders in the
 * body, as Base UI's portal puts it.
 */
function Popover(props: {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (details: { open: boolean }) => void
  children?: JSX.Element
  [attribute: string]: unknown
  sx?: Sx
  class?: string
}) {
  const rest = omit(props, "onOpenChange", "children", "sx", "class")
  return (
    <PopoverPrimitive
      container={popupContainer()}
      {...rest}
      onOpenChange={(open: boolean) => props.onOpenChange?.({ open })}
    >
      {props.children}
    </PopoverPrimitive>
  )
}

function PopoverContent(props: {
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
      part={PopoverContentPrimitive}
      slotName="popover-content"
      tag="div"
      side={sideOf(props.side ?? "bottom")}
      sideOffset={props.sideOffset ?? 4}
      align={props.align ?? "center"}
      alignOffset={props.alignOffset ?? 0}
      {...rest}
      {...styleProps(
        props.class,
        popover.positioner,
        popupMotion,
        popover.content,
        props.sx
      )}
    >
      {props.children}
    </UisdkPart>
  )
}

function PopoverDescription(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <UisdkPart
      part={PopoverDescriptionPrimitive}
      slotName="popover-description"
      tag="p"
      {...rest}
      {...styleProps(props.class, popover.description, props.sx)}
    >
      {props.children}
    </UisdkPart>
  )
}

function PopoverHeader(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <div
      data-slot="popover-header"
      {...rest}
      {...styleProps(props.class, popover.header, props.sx)}
    >
      {props.children}
    </div>
  )
}

function PopoverTitle(props: {
  asChild?: AsChild<"h2">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "asChild", "class", "sx", "children")
  return (
    <UisdkPart
      part={PopoverTitlePrimitive}
      slotName="popover-title"
      tag="h2"
      asChild={props.asChild}
      {...rest}
      {...styleProps(props.class, popover.title, props.sx)}
    >
      {props.children}
    </UisdkPart>
  )
}

function PopoverTrigger(props: {
  asChild?: AsChild<"button">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "asChild", "class", "sx", "children")
  return (
    <UisdkPart
      part={PopoverTriggerPrimitive}
      slotName="popover-trigger"
      tag="button"
      asChild={props.asChild}
      {...rest}
      {...styleProps(props.class, props.sx)}
    >
      {props.children}
    </UisdkPart>
  )
}

export {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
}
