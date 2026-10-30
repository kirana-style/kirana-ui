"use client"

import { props as styleProps } from "@kirana-style/core"
import {
  DisclosurePanel as CollapsibleContentPrimitive,
  Disclosure as CollapsiblePrimitive,
  Button as CollapsibleTriggerPrimitive,
} from "react-aria-components"
import type {
  ButtonProps,
  DisclosurePanelProps,
  DisclosureProps,
} from "react-aria-components"

import type { Sx } from "../../../lib/sx"

// Unstyled, as upstream's: a caller's `sx` is all they draw.
type Props<P> = Omit<P, "className"> & { sx?: Sx }

function Collapsible({ sx, ...props }: Props<DisclosureProps>) {
  return (
    <CollapsiblePrimitive
      data-slot="collapsible"
      {...props}
      {...styleProps(sx)}
    />
  )
}

function CollapsibleTrigger({ sx, ...props }: Props<ButtonProps>) {
  return (
    <CollapsibleTriggerPrimitive
      slot="trigger"
      data-slot="collapsible-trigger"
      {...props}
      {...styleProps(sx)}
    />
  )
}

function CollapsibleContent({ sx, ...props }: Props<DisclosurePanelProps>) {
  return (
    <CollapsibleContentPrimitive
      data-slot="collapsible-content"
      {...props}
      {...styleProps(sx)}
    />
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
