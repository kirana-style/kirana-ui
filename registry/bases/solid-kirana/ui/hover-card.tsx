import { mergeProps, splitProps } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { HoverCard as HoverCardPrimitive } from "@kirana-ui/solid/hover-card"
import { asRender } from "../../../lib/solid/element"
import { hoverCard } from "../../../styles/hover-card.styles"
import { popupMotion } from "../../../styles/overlay.styles"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"
import type { AsChild } from "../../../lib/solid/element"

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
  const [local, , rest] = splitProps(
    props,
    ["openDelay", "closeDelay", "onOpenChange", "children"],
    ["sx", "class"]
  )
  return (
    <HoverCardPrimitive.Root
      {...rest}
      delay={local.openDelay}
      closeDelay={local.closeDelay}
      onOpenChange={(open) => local.onOpenChange?.({ open })}
    >
      {local.children}
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
  const [local, rest] = splitProps(
    mergeProps(
      {
        side: "bottom",
        sideOffset: 4,
        align: "center",
        alignOffset: 4,
      } as const,
      props
    ),
    ["side", "sideOffset", "align", "alignOffset", "class", "sx", "children"]
  )
  return (
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Positioner
        side={local.side}
        sideOffset={local.sideOffset}
        align={local.align}
        alignOffset={local.alignOffset}
        {...styleProps(hoverCard.positioner)}
      >
        <HoverCardPrimitive.Popup
          data-slot="hover-card-content"
          {...rest}
          {...styleProps(local.class, popupMotion, hoverCard.content, local.sx)}
        >
          {local.children}
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
  const [local, rest] = splitProps(props, [
    "asChild",
    "class",
    "sx",
    "children",
  ])
  return (
    <HoverCardPrimitive.Trigger
      data-slot="hover-card-trigger"
      {...rest}
      {...styleProps(local.class, local.sx)}
      render={asRender(local.asChild)}
    >
      {local.children}
    </HoverCardPrimitive.Trigger>
  )
}

export { HoverCard, HoverCardContent, HoverCardTrigger }
