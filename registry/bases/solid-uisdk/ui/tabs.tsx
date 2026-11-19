import { omit } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import {
  Tabs as TabsPrimitive,
  TabsList as TabsListPrimitive,
  TabsPanel,
  TabsTab,
} from "@ui-sdk/solid/tabs"
import type { JSX } from "@solidjs/web"
import type { Sx } from "@kirana-style/core"

import { UisdkPart } from "../../../lib/solid2/uisdk-part"
import type { AsChild } from "../../../lib/solid2/uisdk-part"
import { tabs } from "../../../styles/tabs.styles"

/**
 * ui-sdk's tabs, taking Solid's Ark UI parts' props: `value`, `defaultValue`, and `onValueChange`
 * called with `{ value }`. A panel whose tab is not selected leaves the page, as Base UI's does.
 */
function Tabs(props: {
  defaultValue?: string
  value?: string
  onValueChange?: (details: { value: string }) => void
  orientation?: "horizontal" | "vertical"
  asChild?: AsChild
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "onValueChange", "asChild", "class", "sx")
  return (
    <UisdkPart
      part={TabsPrimitive}
      slotName="tabs"
      asChild={props.asChild}
      {...rest}
      onValueChange={(value: string | null) =>
        props.onValueChange?.({ value: value as string })
      }
      {...styleProps(props.class, tabs.root, props.sx)}
    />
  )
}

function TabsContent(props: {
  value: string
  asChild?: AsChild
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "asChild", "class", "sx")
  return (
    <UisdkPart
      part={TabsPanel}
      slotName="tabs-content"
      asChild={props.asChild}
      {...rest}
      {...styleProps(props.class, tabs.content, props.sx)}
    />
  )
}

function TabsList(props: {
  variant?: "default" | "line"
  asChild?: AsChild
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "variant", "asChild", "class", "sx")
  const variant = () => props.variant ?? "default"
  return (
    <UisdkPart
      part={TabsListPrimitive}
      slotName="tabs-list"
      asChild={props.asChild}
      data-variant={variant()}
      {...rest}
      {...styleProps(
        props.class,
        tabs.list,
        variant() === "line" ? tabs.listLine : tabs.listDefault,
        props.sx
      )}
    />
  )
}

function TabsTrigger(props: {
  value: string
  disabled?: boolean
  asChild?: AsChild<"button">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "asChild", "class", "sx")
  return (
    <UisdkPart
      part={TabsTab}
      slotName="tabs-trigger"
      tag="button"
      asChild={props.asChild}
      {...rest}
      {...styleProps(props.class, tabs.trigger, props.sx)}
    />
  )
}

export { Tabs, TabsContent, TabsList, TabsTrigger }
