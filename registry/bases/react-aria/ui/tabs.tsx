"use client"

import * as React from "react"
import { props as styleProps } from "@kirana-style/core"
import {
  TabList as TabListPrimitive,
  TabPanel as TabPanelPrimitive,
  Tab as TabPrimitive,
  Tabs as TabsPrimitive,
} from "react-aria-components"

import type { Sx } from "../../../lib/sx"
import { tabs } from "../../../styles/tabs.styles"

type Own<T extends React.ElementType> = Omit<
  React.ComponentProps<T>,
  "className" | "style"
> & { sx?: Sx }

function Tabs({ sx, ...props }: Own<typeof TabsPrimitive>) {
  return (
    <TabsPrimitive data-slot="tabs" {...props} {...styleProps(tabs.root, sx)} />
  )
}

function TabsList<T extends object>({
  sx,
  variant = "default",
  ...props
}: Omit<
  React.ComponentProps<typeof TabListPrimitive<T>>,
  "className" | "style"
> & { sx?: Sx; variant?: "default" | "line" }) {
  return (
    <TabListPrimitive
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

function TabsTrigger({ sx, ...props }: Own<typeof TabPrimitive>) {
  return (
    <TabPrimitive
      data-slot="tabs-trigger"
      {...props}
      {...styleProps(tabs.trigger, sx)}
    />
  )
}

function TabsContent({ sx, ...props }: Own<typeof TabPanelPrimitive>) {
  return (
    <TabPanelPrimitive
      data-slot="tabs-content"
      {...props}
      {...styleProps(tabs.content, sx)}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
