---
title: Sidebar
description: A composable, themeable and customizable sidebar component.
section: components
order: 15
keywords: [sidebar, component, base, aria]
---

# Sidebar

<!-- ::preview item="sidebar-07" height="640" combinations="react/base,react/aria" -->

The preview is the `sidebar-07` block: a sidebar that collapses to icons. Its open state is kept in a cookie, and on a narrow screen it opens as a sheet.

## Installation

With `kirana-style ui`, for every framework:

<!-- ::install exec="kirana-style ui add sidebar" -->

With shadcn/ui's CLI, for React, from the registry's [export](/docs/shadcn):

<!-- ::install run="shadcn@latest add @kirana/sidebar" -->

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

## Code

What installing it writes, in the default style, for the framework and base you choose:

<!-- ::component-code name="sidebar" combinations="react/base,react/aria" -->
