import { omit } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { Popover as PopoverPrimitive } from "@kirana-ui/solid/popover"
import { asRender } from "../../../lib/solid2/element"
import { popupMotion } from "../../../styles/overlay.styles"
import { popover } from "../../../styles/popover.styles"
import type { JSX } from "@solidjs/web"
import type { Sx } from "@kirana-style/core"
import type { AsChild } from "../../../lib/solid2/element"

/**
 * Kirana UI's popover, taking the Ark UI parts' props: `open`, `defaultOpen` and `onOpenChange`
 * (given `{ open }`). It renders no element; the content places the popup.
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
    <PopoverPrimitive.Root
      {...rest}
      onOpenChange={(open) => props.onOpenChange?.({ open })}
    >
      {props.children}
    </PopoverPrimitive.Root>
  )
}

function PopoverContent(props: {
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
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        side={props.side ?? "bottom"}
        sideOffset={props.sideOffset ?? 4}
        align={props.align ?? "center"}
        alignOffset={props.alignOffset ?? 0}
        {...styleProps(popover.positioner)}
      >
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          {...rest}
          {...styleProps(props.class, popupMotion, popover.content, props.sx)}
        >
          {props.children}
        </PopoverPrimitive.Popup>
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
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
    <PopoverPrimitive.Description
      data-slot="popover-description"
      {...rest}
      {...styleProps(props.class, popover.description, props.sx)}
    >
      {props.children}
    </PopoverPrimitive.Description>
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
    <PopoverPrimitive.Title
      data-slot="popover-title"
      {...rest}
      {...styleProps(props.class, popover.title, props.sx)}
      render={asRender(props.asChild)}
    >
      {props.children}
    </PopoverPrimitive.Title>
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
    <PopoverPrimitive.Trigger
      data-slot="popover-trigger"
      {...rest}
      {...styleProps(props.class, props.sx)}
      render={asRender(props.asChild)}
    >
      {props.children}
    </PopoverPrimitive.Trigger>
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
