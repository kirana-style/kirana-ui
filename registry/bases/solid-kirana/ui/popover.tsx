import { mergeProps, splitProps } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { Popover as PopoverPrimitive } from "@kirana-ui/solid/popover"
import { asRender } from "../../../lib/solid/element"
import { popupMotion } from "../../../styles/overlay.styles"
import { popover } from "../../../styles/popover.styles"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"
import type { AsChild } from "../../../lib/solid/element"

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
  const [local, , rest] = splitProps(
    props,
    ["onOpenChange", "children"],
    ["sx", "class"]
  )
  return (
    <PopoverPrimitive.Root
      {...rest}
      onOpenChange={(open) => local.onOpenChange?.({ open })}
    >
      {local.children}
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
  const [local, rest] = splitProps(
    mergeProps(
      {
        side: "bottom",
        sideOffset: 4,
        align: "center",
        alignOffset: 0,
      } as const,
      props
    ),
    ["side", "sideOffset", "align", "alignOffset", "class", "sx", "children"]
  )
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        side={local.side}
        sideOffset={local.sideOffset}
        align={local.align}
        alignOffset={local.alignOffset}
        {...styleProps(popover.positioner)}
      >
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          {...rest}
          {...styleProps(local.class, popupMotion, popover.content, local.sx)}
        >
          {local.children}
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
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <PopoverPrimitive.Description
      data-slot="popover-description"
      {...rest}
      {...styleProps(local.class, popover.description, local.sx)}
    >
      {local.children}
    </PopoverPrimitive.Description>
  )
}

function PopoverHeader(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <div
      data-slot="popover-header"
      {...rest}
      {...styleProps(local.class, popover.header, local.sx)}
    >
      {local.children}
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
  const [local, rest] = splitProps(props, [
    "asChild",
    "class",
    "sx",
    "children",
  ])
  return (
    <PopoverPrimitive.Title
      data-slot="popover-title"
      {...rest}
      {...styleProps(local.class, popover.title, local.sx)}
      render={asRender(local.asChild)}
    >
      {local.children}
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
  const [local, rest] = splitProps(props, [
    "asChild",
    "class",
    "sx",
    "children",
  ])
  return (
    <PopoverPrimitive.Trigger
      data-slot="popover-trigger"
      {...rest}
      {...styleProps(local.class, local.sx)}
      render={asRender(local.asChild)}
    >
      {local.children}
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
