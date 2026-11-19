import { createContext, omit, useContext } from "solid-js"
import type { Accessor } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import {
  Collapsible as CollapsiblePrimitive,
  CollapsiblePanel,
  CollapsibleTrigger as CollapsibleTriggerPrimitive,
} from "@ui-sdk/solid/collapsible"
import type { JSX } from "@solidjs/web"
import type { Sx } from "@kirana-style/core"

import { UisdkPart } from "../../../lib/solid2/uisdk-part"
import type { AsChild } from "../../../lib/solid2/uisdk-part"

/** Whether the collapsible's panel stays in the page while closed (Ark's `unmountOnExit={false}`). */
const KeepMounted = createContext<Accessor<boolean> | null>(null)

/**
 * ui-sdk's collapsible, taking Solid's Ark UI parts' props: `open`, `defaultOpen`, and
 * `onOpenChange` called with `{ open }`. Unstyled, as upstream's: a caller's `sx` is all it draws.
 * A closed panel leaves the page, as Base UI's does, unless `unmountOnExit` is `false` (Ark's), which
 * keeps it there, hidden: ui-sdk's panel's `keepMounted`. `lazyMount` is taken and not needed.
 */
function Collapsible(props: {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (details: { open: boolean }) => void
  disabled?: boolean
  lazyMount?: boolean
  unmountOnExit?: boolean
  asChild?: AsChild
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(
    props,
    "onOpenChange",
    "lazyMount",
    "unmountOnExit",
    "asChild",
    "class",
    "sx"
  )
  return (
    <KeepMounted value={() => props.unmountOnExit === false}>
      <UisdkPart
        part={CollapsiblePrimitive}
        slotName="collapsible"
        asChild={props.asChild}
        {...rest}
        onOpenChange={(open: boolean) => props.onOpenChange?.({ open })}
        {...styleProps(props.class, props.sx)}
      />
    </KeepMounted>
  )
}

function CollapsibleContent(props: {
  /** In the page while closed, `hidden`: its collapsible's `unmountOnExit={false}` by default. */
  keepMounted?: boolean
  asChild?: AsChild
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "keepMounted", "asChild", "class", "sx")
  const keep = useContext(KeepMounted)
  return (
    <UisdkPart
      part={CollapsiblePanel}
      slotName="collapsible-content"
      asChild={props.asChild}
      keepMounted={props.keepMounted ?? keep?.() ?? false}
      {...rest}
      {...styleProps(props.class, props.sx)}
    />
  )
}

function CollapsibleTrigger(props: {
  asChild?: AsChild<"button">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "asChild", "class", "sx")
  return (
    <UisdkPart
      part={CollapsibleTriggerPrimitive}
      slotName="collapsible-trigger"
      tag="button"
      asChild={props.asChild}
      {...rest}
      {...styleProps(props.class, props.sx)}
    />
  )
}

export { Collapsible, CollapsibleContent, CollapsibleTrigger }
