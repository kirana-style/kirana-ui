"use client"

import type { ComponentProps } from "react"

import * as TabsPrimitive from "@ui-sdk/react/tabs"
import { props as styleProps } from "@kirana-style/core"

import type { Sx } from "../../../lib/sx"
import { slotRender } from "../../../lib/uisdk-slot"
import { tabs } from "../../../styles/tabs.styles"

function Tabs({
  sx,
  orientation = "horizontal",
  ...props
}: Omit<ComponentProps<typeof TabsPrimitive.Tabs>, "className"> & { sx?: Sx }) {
  return (
    <TabsPrimitive.Tabs
      data-orientation={orientation}
      orientation={orientation}
      {...props}
      render={slotRender("tabs", "div", props.render)}
      {...styleProps(tabs.root, sx)}
    />
  )
}

function TabsList({
  sx,
  variant = "default",
  ...props
}: Omit<ComponentProps<typeof TabsPrimitive.TabsList>, "className"> & {
  sx?: Sx
  variant?: "default" | "line"
}) {
  return (
    <TabsPrimitive.TabsList
      data-variant={variant}
      {...props}
      render={slotRender("tabs-list", "div", props.render)}
      {...styleProps(
        tabs.list,
        variant === "line" ? tabs.listLine : tabs.listDefault,
        sx
      )}
    />
  )
}

function TabsTrigger({
  sx,
  ...props
}: Omit<ComponentProps<typeof TabsPrimitive.TabsTab>, "className"> & {
  sx?: Sx
}) {
  return (
    <TabsPrimitive.TabsTab
      {...props}
      render={slotRender("tabs-trigger", "button", props.render)}
      {...styleProps(tabs.trigger, sx)}
    />
  )
}

function TabsContent({
  sx,
  ...props
}: Omit<ComponentProps<typeof TabsPrimitive.TabsPanel>, "className"> & {
  sx?: Sx
}) {
  return (
    <TabsPrimitive.TabsPanel
      {...props}
      render={slotRender("tabs-content", "div", props.render)}
      {...styleProps(tabs.content, sx)}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
