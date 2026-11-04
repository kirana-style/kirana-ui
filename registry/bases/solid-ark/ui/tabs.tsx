import { mergeProps, splitProps } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { TabContent, TabList, TabTrigger, TabsRoot } from "@ark-ui/solid"
import { tabs } from "../../../styles/tabs.styles"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"
import type {
  TabContentProps,
  TabListProps,
  TabTriggerProps,
  TabsRootProps,
} from "@ark-ui/solid"

function Tabs(props: {
  asChild?: TabsRootProps["asChild"]
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
    <TabsRoot
      asChild={local.asChild}
      data-slot="tabs"
      lazyMount
      unmountOnExit
      {...rest}
      {...styleProps(local.class, tabs.root, local.sx)}
    >
      {local.children}
    </TabsRoot>
  )
}

function TabsContent(props: {
  value: string
  asChild?: TabContentProps["asChild"]
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, [
    "value",
    "asChild",
    "class",
    "sx",
    "children",
  ])
  // Ark's required `value` is declared here and passed on, so a project's type checker sees it.
  return (
    <TabContent
      asChild={local.asChild}
      data-slot="tabs-content"
      value={local.value}
      {...rest}
      {...styleProps(local.class, tabs.content, local.sx)}
    >
      {local.children}
    </TabContent>
  )
}

function TabsList(props: {
  variant?: "default" | "line"
  asChild?: TabListProps["asChild"]
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ variant: "default" } as const, props),
    ["variant", "asChild", "class", "sx", "children"]
  )
  return (
    <TabList
      asChild={local.asChild}
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
    </TabList>
  )
}

function TabsTrigger(props: {
  value: string
  asChild?: TabTriggerProps["asChild"]
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, [
    "value",
    "asChild",
    "class",
    "sx",
    "children",
  ])
  // Ark's required `value` is declared here and passed on, so a project's type checker sees it.
  return (
    <TabTrigger
      asChild={local.asChild}
      data-slot="tabs-trigger"
      value={local.value}
      {...rest}
      {...styleProps(local.class, tabs.trigger, local.sx)}
    >
      {local.children}
    </TabTrigger>
  )
}

export { Tabs, TabsContent, TabsList, TabsTrigger }
