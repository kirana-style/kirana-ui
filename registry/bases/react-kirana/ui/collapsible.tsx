"use client"

import type * as React from "react"

import { Collapsible as CollapsiblePrimitive } from "@kirana-ui/react/collapsible"
import { props as styleProps } from "@kirana-style/core"

import type { Sx } from "../../../lib/sx"

// Unstyled, as upstream's: a caller's `sx` is all they draw.
type Props<P> = Omit<P, "className"> & { sx?: Sx }

function Collapsible({
  sx,
  ...props
}: Props<React.ComponentProps<typeof CollapsiblePrimitive.Root>>) {
  return (
    <CollapsiblePrimitive.Root
      data-slot="collapsible"
      {...props}
      {...styleProps(sx)}
    />
  )
}

function CollapsibleTrigger({
  sx,
  ...props
}: Props<React.ComponentProps<typeof CollapsiblePrimitive.Trigger>>) {
  return (
    <CollapsiblePrimitive.Trigger
      data-slot="collapsible-trigger"
      {...props}
      {...styleProps(sx)}
    />
  )
}

function CollapsibleContent({
  sx,
  ...props
}: Props<React.ComponentProps<typeof CollapsiblePrimitive.Panel>>) {
  return (
    <CollapsiblePrimitive.Panel
      data-slot="collapsible-content"
      {...props}
      {...styleProps(sx)}
    />
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
