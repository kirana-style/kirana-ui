---
title: Sidebar
description: A composable, themeable and customizable sidebar component.
section: components
variants: [react/base, react/aria]
keywords: [sidebar, component, base, aria]
---

# Sidebar

<!-- ::preview item="sidebar-07" height="640" combinations="react/base,react/aria" -->

The preview is the `sidebar-07` block: a sidebar that collapses to icons. Its open state is kept in a cookie, and on a narrow screen it opens as a sheet.

## Installation

<!-- ::installation name="sidebar" combinations="react/base,react/aria" -->

## Usage

```tsx
import {
  Sidebar,
  SidebarContent,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export function Example() {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarContent>{/* groups and menus */}</SidebarContent>
      </Sidebar>
      <SidebarInset>
        <SidebarTrigger />
      </SidebarInset>
    </SidebarProvider>
  )
}
```
