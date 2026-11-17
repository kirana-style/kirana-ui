"use client"

import type { PartProps } from "../../../lib/kirana-render"

import { Tabs as TabsPrimitive } from "@kirana-ui/react/tabs"
import { props as styleProps } from "@kirana-style/core"

import type { Sx } from "../../../lib/sx"
import { tabs } from "../../../styles/tabs.styles"

function Tabs({
  sx,
  orientation = "horizontal",
  ...props
}: Omit<PartProps<typeof TabsPrimitive.Root>, "className"> & { sx?: Sx }) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      orientation={orientation}
      {...props}
      {...styleProps(tabs.root, sx)}
    />
  )
}

function TabsList({
  sx,
  variant = "default",
  ...props
}: Omit<PartProps<typeof TabsPrimitive.List>, "className"> & {
  sx?: Sx
  variant?: "default" | "line"
}) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      {...props}
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
}: Omit<PartProps<typeof TabsPrimitive.Tab>, "className"> & { sx?: Sx }) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      {...props}
      {...styleProps(tabs.trigger, sx)}
    />
  )
}

function TabsContent({
  sx,
  ...props
}: Omit<PartProps<typeof TabsPrimitive.Panel>, "className"> & { sx?: Sx }) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      {...props}
      {...styleProps(tabs.content, sx)}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
