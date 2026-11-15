"use client"

import type { ComponentProps } from "react"

import * as CollapsiblePrimitive from "@ui-sdk/react/collapsible"
import { props as styleProps } from "@kirana-style/core"

import type { Sx } from "../../../lib/sx"
import { slotRender, slotOf } from "../../../lib/uisdk-slot"

// Unstyled, as upstream's: a caller's `sx` is all they draw.
type Props<P> = Omit<P, "className"> & { sx?: Sx }

function Collapsible({
  sx,
  ...props
}: Props<ComponentProps<typeof CollapsiblePrimitive.Collapsible>>) {
  return (
    <CollapsiblePrimitive.Collapsible
      {...props}
      render={slotRender(slotOf(props, "collapsible"), "div", props.render)}
      {...styleProps(sx)}
    />
  )
}

function CollapsibleTrigger({
  sx,
  ...props
}: Props<ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>>) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      {...props}
      render={slotRender(
        slotOf(props, "collapsible-trigger"),
        "button",
        props.render
      )}
      {...styleProps(sx)}
    />
  )
}

function CollapsibleContent({
  sx,
  ...props
}: Props<ComponentProps<typeof CollapsiblePrimitive.CollapsiblePanel>>) {
  return (
    <CollapsiblePrimitive.CollapsiblePanel
      {...props}
      render={slotRender(
        slotOf(props, "collapsible-content"),
        "div",
        props.render
      )}
      {...styleProps(sx)}
    />
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
