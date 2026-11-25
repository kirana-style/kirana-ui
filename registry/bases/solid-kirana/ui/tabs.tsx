import { merge, omit } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { Tabs as TabsPrimitive } from "@kirana-ui/solid/tabs"
import { asRender } from "../../../lib/solid2/element"
import { tabs } from "../../../styles/tabs.styles"
import type { JSX } from "@solidjs/web"
import type { Sx } from "@kirana-style/core"
import type { AsChild } from "../../../lib/solid2/element"

/**
 * Kirana UI's tabs, with Solid's Ark UI part's `value`, `defaultValue` and
 * `onValueChange({ value })`. A panel whose tab is not the active one leaves the page, as Ark UI's
 * `lazyMount` and `unmountOnExit` had it.
 */
function Tabs(props: {
  defaultValue?: string
  value?: string
  onValueChange?: (details: { value: string }) => void
  orientation?: "horizontal" | "vertical"
  asChild?: AsChild<"div">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const local = merge(props, {
    get orientation() {
      return props.orientation ?? ("horizontal" as const)
    },
  })
  const rest = omit(
    local,
    "onValueChange",
    "orientation",
    "asChild",
    "class",
    "sx",
    "children"
  )
  return (
    <TabsPrimitive.Root
      render={asRender(local.asChild)}
      data-slot="tabs"
      data-orientation={local.orientation}
      orientation={local.orientation}
      {...rest}
      onValueChange={(value: unknown) =>
        local.onValueChange?.({ value: value as string })
      }
      {...styleProps(local.class, tabs.root, local.sx)}
    >
      {local.children}
    </TabsPrimitive.Root>
  )
}

function TabsContent(props: {
  value: string
  asChild?: AsChild<"div">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "value", "asChild", "class", "sx", "children")
  // Ark's required `value` is declared here and passed on, so a project's type checker sees it.
  return (
    <TabsPrimitive.Panel
      render={asRender(props.asChild)}
      data-slot="tabs-content"
      value={props.value}
      {...rest}
      {...styleProps(props.class, tabs.content, props.sx)}
    >
      {props.children}
    </TabsPrimitive.Panel>
  )
}

function TabsList(props: {
  variant?: "default" | "line"
  asChild?: AsChild<"div">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const local = merge(props, {
    get variant() {
      return props.variant ?? ("default" as const)
    },
  })
  const rest = omit(local, "variant", "asChild", "class", "sx", "children")
  return (
    <TabsPrimitive.List
      render={asRender(local.asChild)}
      data-slot="tabs-list"
      data-variant={local.variant}
      {...rest}
      {...styleProps(
        local.class,
        tabs.list,
        local.variant === "line" ? tabs.listLine : tabs.listDefault,
        local.sx
      )}
    >
      {local.children}
    </TabsPrimitive.List>
  )
}

function TabsTrigger(props: {
  value: string
  asChild?: AsChild<"button">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "value", "asChild", "class", "sx", "children")
  // Ark's required `value` is declared here and passed on, so a project's type checker sees it.
  return (
    <TabsPrimitive.Tab
      render={asRender(props.asChild)}
      data-slot="tabs-trigger"
      value={props.value}
      {...rest}
      {...styleProps(props.class, tabs.trigger, props.sx)}
    >
      {props.children}
    </TabsPrimitive.Tab>
  )
}

export { Tabs, TabsContent, TabsList, TabsTrigger }
