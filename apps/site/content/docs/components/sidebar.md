---
title: Sidebar
description: A composable, themeable and customizable sidebar component.
section: components
variants: [react/base, react/aria]
keywords: [sidebar, component, base, aria]
---

# Sidebar

<!-- ::preview item="sidebar-demo" height="640" combinations="react/base,react/aria" -->

A sidebar that collapses to icons. Its open state is kept in a cookie, and on a narrow screen it opens as a sheet.

Sidebars are one of the most complex components to build. They are central to any application and
often contain a lot of moving parts. This one is composable, themeable and customizable.

[Browse the Blocks Library](/blocks).

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

## Composition

Use the following composition to build a `Sidebar` layout:

```text
SidebarProvider
├── Sidebar
│   ├── SidebarHeader
│   ├── SidebarContent
│   │   ├── SidebarGroup
│   │   │   ├── SidebarGroupLabel
│   │   │   ├── SidebarGroupAction
│   │   │   ├── SidebarGroupContent
│   │   │   └── SidebarMenu
│   │   │       ├── SidebarMenuItem
│   │   │       │   ├── SidebarMenuButton
│   │   │       │   ├── SidebarMenuAction
│   │   │       │   └── SidebarMenuBadge
│   │   │       └── SidebarMenuItem
│   │   │           ├── SidebarMenuButton
│   │   │           └── SidebarMenuSub
│   │   │               ├── SidebarMenuSubItem
│   │   │               └── SidebarMenuSubItem
│   │   └── SidebarGroup
│   │       └── SidebarMenu
│   │           ├── SidebarMenuItem
│   │           └── SidebarMenuItem
│   ├── SidebarFooter
│   └── SidebarRail
├── SidebarInset
└── SidebarTrigger
```

## Structure

- **SidebarProvider** — Handles collapsible state and provides sidebar context to child components.
- **Sidebar** — The main collapsible sidebar panel.
- **SidebarHeader** — Sticky at the top; use for branding, titles, or workspace switchers.
- **SidebarFooter** — Sticky at the bottom; use for user menus, settings, or actions.
- **SidebarContent** — Scrollable region between the header and footer.
- **SidebarGroup** — Groups related navigation with optional label, action, and content areas.
- **SidebarMenu** / **SidebarMenuItem** — Menu structure for links, badges, actions, and nested submenus.
- **SidebarRail** — Resize handle for adjusting sidebar width when applicable.
- **SidebarInset** — Wraps main content when using the `inset` variant.
- **SidebarTrigger** — Control that toggles the sidebar open or collapsed.

## SidebarProvider

The `SidebarProvider` component is used to provide the sidebar context to the `Sidebar` component. You should always wrap your application in a `SidebarProvider` component.

### Props

| Name           | Type                      | Description                                  |
| -------------- | ------------------------- | -------------------------------------------- |
| `defaultOpen`  | `boolean`                 | Default open state of the sidebar.           |
| `open`         | `boolean`                 | Open state of the sidebar (controlled).      |
| `onOpenChange` | `(open: boolean) => void` | Sets open state of the sidebar (controlled). |

### Width

The sidebar's widths are context tokens in `lib/kirana/context.ts`: `sidebarCtx.width` (16rem)
and `sidebarCtx.widthIcon` (3rem, collapsed to its icons). Set them on the provider, through its
`sx`, for one sidebar or for each of several. On a small screen the sidebar opens as a sheet 18rem
wide, set in `sidebar.styles.ts` (`mobile`).

```tsx showLineNumbers
import { css } from "@kirana-style/core"

import { sidebarCtx } from "@/lib/kirana/context"

const wide = css({ [sidebarCtx.width]: "20rem" })

<SidebarProvider sx={wide}>
  <Sidebar />
</SidebarProvider>
```

### Keyboard Shortcut

To trigger the sidebar, you use the `cmd+b` keyboard shortcut on Mac and `ctrl+b` on Windows.

```tsx showLineNumbers title="components/ui/sidebar.tsx"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"
```

## Sidebar

The main `Sidebar` component used to render a collapsible sidebar.

### Props

| Property      | Type                              | Description                       |
| ------------- | --------------------------------- | --------------------------------- |
| `side`        | `left` or `right`                 | The side of the sidebar.          |
| `variant`     | `sidebar`, `floating`, or `inset` | The variant of the sidebar.       |
| `collapsible` | `offcanvas`, `icon`, or `none`    | Collapsible state of the sidebar. |

| Prop        | Description                                                  |
| ----------- | ------------------------------------------------------------ |
| `offcanvas` | A collapsible sidebar that slides in from the left or right. |
| `icon`      | A sidebar that collapses to icons.                           |
| `none`      | A non-collapsible sidebar.                                   |

> **Note:** If you use the `inset` variant, remember to wrap your main content in a `SidebarInset` component.

```tsx showLineNumbers
<SidebarProvider>
  <Sidebar variant="inset" />
  <SidebarInset>
    <main>{children}</main>
  </SidebarInset>
</SidebarProvider>
```

## useSidebar

The `useSidebar` hook is used to control the sidebar.

```tsx showLineNumbers
import { useSidebar } from "@/components/ui/sidebar"

export function AppSidebar() {
  const {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar()
}
```

| Property        | Type                      | Description                                   |
| --------------- | ------------------------- | --------------------------------------------- |
| `state`         | `expanded` or `collapsed` | The current state of the sidebar.             |
| `open`          | `boolean`                 | Whether the sidebar is open.                  |
| `setOpen`       | `(open: boolean) => void` | Sets the open state of the sidebar.           |
| `openMobile`    | `boolean`                 | Whether the sidebar is open on mobile.        |
| `setOpenMobile` | `(open: boolean) => void` | Sets the open state of the sidebar on mobile. |
| `isMobile`      | `boolean`                 | Whether the sidebar is on mobile.             |
| `toggleSidebar` | `() => void`              | Toggles the sidebar. Desktop and mobile.      |

## SidebarHeader

Use the `SidebarHeader` component to add a sticky header to the sidebar. The examples here style
with `css()` handles from `@kirana-style/core`; an icon, which does not read `sx`, takes them
through `props()`:

```tsx showLineNumbers
import { css, props } from "@kirana-style/core"

const styles = {
  // A chevron at the row's end.
  end: css({ marginInlineStart: "auto" }),
  // React Aria's menu, as wide as its trigger.
  menu: css({ width: { "*": null, base: "var(--trigger-width)" } }),
}
```

<!-- ::start:only react/base -->

```tsx showLineNumbers title="components/app-sidebar.tsx"
<Sidebar>
  <SidebarHeader>
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger render={<SidebarMenuButton />}>
            Select Workspace
            <ChevronDown {...props(styles.end)} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <span>Acme Inc</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarHeader>
</Sidebar>
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx showLineNumbers title="components/app-sidebar.tsx"
<Sidebar>
  <SidebarHeader>
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenuTrigger>
          <SidebarMenuButton>
            Select Workspace
            <ChevronDown {...props(styles.end)} />
          </SidebarMenuButton>
          <DropdownMenu sx={styles.menu}>
            <DropdownMenuItem>
              <span>Acme Inc</span>
            </DropdownMenuItem>
          </DropdownMenu>
        </DropdownMenuTrigger>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarHeader>
</Sidebar>
```

<!-- ::end:only -->

## SidebarFooter

Use the `SidebarFooter` component to add a sticky footer to the sidebar.

```tsx showLineNumbers
<Sidebar>
  <SidebarFooter>
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton>
          <User2 /> Username
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarFooter>
</Sidebar>
```

## SidebarContent

The `SidebarContent` component is used to wrap the content of the sidebar. This is where you add your `SidebarGroup` components. It is scrollable.

```tsx showLineNumbers
<Sidebar>
  <SidebarContent>
    <SidebarGroup />
    <SidebarGroup />
  </SidebarContent>
</Sidebar>
```

## SidebarGroup

Use the `SidebarGroup` component to create a section within the sidebar.

A `SidebarGroup` has a `SidebarGroupLabel`, a `SidebarGroupContent` and an optional `SidebarGroupAction`. An icon-only action names itself for screen readers with `visuallyHidden` (`@/components/ui/visually-hidden.styles`).

```tsx showLineNumbers
<SidebarGroup>
  <SidebarGroupLabel>Application</SidebarGroupLabel>
  <SidebarGroupAction>
    <Plus /> <span sx={visuallyHidden}>Add Project</span>
  </SidebarGroupAction>
  <SidebarGroupContent></SidebarGroupContent>
</SidebarGroup>
```

To make a `SidebarGroup` collapsible, wrap it in a `Collapsible`. The collapsible anchors
`collapsibleScope`, which its chevron reads to turn while it is open (`OPEN`, from
`@/components/ui/collapsible.styles`):

```tsx showLineNumbers
const chevron = css({
  marginInlineStart: "auto",
  transitionProperty: "rotate",
  transitionDuration: duration[150],
  rotate: { [OPEN.base]: "180deg" }, // OPEN.aria on React Aria
})
```

<!-- ::start:only react/base -->

```tsx showLineNumbers
<Collapsible defaultOpen sx={collapsibleScope.anchor}>
  <SidebarGroup>
    <SidebarGroupLabel render={<CollapsibleTrigger />}>
      Help
      <ChevronDown {...props(chevron)} />
    </SidebarGroupLabel>
    <CollapsibleContent>
      <SidebarGroupContent />
    </CollapsibleContent>
  </SidebarGroup>
</Collapsible>
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx showLineNumbers
<Collapsible defaultExpanded sx={collapsibleScope.anchor}>
  <SidebarGroup>
    <SidebarGroupLabel elementType={CollapsibleTrigger}>
      Help
      <ChevronDown {...props(chevron)} />
    </SidebarGroupLabel>
    <CollapsibleContent>
      <SidebarGroupContent />
    </CollapsibleContent>
  </SidebarGroup>
</Collapsible>
```

<!-- ::end:only -->

## SidebarMenu

The `SidebarMenu` component is used for building a menu within a `SidebarGroup`.

<!-- ::start:only react/base -->

```tsx showLineNumbers
<SidebarMenu>
  {projects.map((project) => (
    <SidebarMenuItem key={project.name}>
      <SidebarMenuButton render={<a href={project.url} />}>
        <project.icon />
        <span>{project.name}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  ))}
</SidebarMenu>
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx showLineNumbers
<SidebarMenu>
  {projects.map((project) => (
    <SidebarMenuItem key={project.name}>
      <SidebarMenuButton href={project.url}>
        <project.icon />
        <span>{project.name}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  ))}
</SidebarMenu>
```

<!-- ::end:only -->

## SidebarMenuButton

The `SidebarMenuButton` component is used to render a menu button within a `SidebarMenuItem`.

<!-- ::start:only react/base -->

By default, the `SidebarMenuButton` renders a button but you can use the `render` prop to render a different component such as a `Link` or an `a` tag.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

By default, the `SidebarMenuButton` renders a button, but passing an `href` prop renders it as a link instead.

<!-- ::end:only -->

Use the `isActive` prop to mark a menu item as active.

<!-- ::start:only react/base -->

```tsx showLineNumbers
<SidebarMenuButton render={<a href="#" />} isActive>
  Home
</SidebarMenuButton>
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx showLineNumbers
<SidebarMenuButton href="#" isActive>
  Home
</SidebarMenuButton>
```

<!-- ::end:only -->

## SidebarMenuAction

The `SidebarMenuAction` component is used to render a menu action within a `SidebarMenuItem`.

<!-- ::start:only react/base -->

```tsx showLineNumbers
<SidebarMenuItem>
  <SidebarMenuButton render={<a href="#" />}>
    <Home />
    <span>Home</span>
  </SidebarMenuButton>
  <SidebarMenuAction>
    <Plus /> <span sx={visuallyHidden}>Add Project</span>
  </SidebarMenuAction>
</SidebarMenuItem>
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx showLineNumbers
<SidebarMenuItem>
  <SidebarMenuButton href="#">
    <Home />
    <span>Home</span>
  </SidebarMenuButton>
  <SidebarMenuAction>
    <Plus /> <span sx={visuallyHidden}>Add Project</span>
  </SidebarMenuAction>
</SidebarMenuItem>
```

<!-- ::end:only -->

## SidebarMenuSub

The `SidebarMenuSub` component is used to render a submenu within a `SidebarMenu`.

```tsx showLineNumbers
<SidebarMenuItem>
  <SidebarMenuButton />
  <SidebarMenuSub>
    <SidebarMenuSubItem>
      <SidebarMenuSubButton />
    </SidebarMenuSubItem>
  </SidebarMenuSub>
</SidebarMenuItem>
```

## SidebarMenuBadge

The `SidebarMenuBadge` component is used to render a badge within a `SidebarMenuItem`.

```tsx showLineNumbers
<SidebarMenuItem>
  <SidebarMenuButton />
  <SidebarMenuBadge>24</SidebarMenuBadge>
</SidebarMenuItem>
```

## SidebarMenuSkeleton

The `SidebarMenuSkeleton` component is used to render a skeleton for a `SidebarMenu`.

```tsx showLineNumbers
<SidebarMenu>
  {Array.from({ length: 5 }).map((_, index) => (
    <SidebarMenuItem key={index}>
      <SidebarMenuSkeleton />
    </SidebarMenuItem>
  ))}
</SidebarMenu>
```

## SidebarTrigger

Use the `SidebarTrigger` component to render a button that toggles the sidebar.

```tsx showLineNumbers
import { useSidebar } from "@/components/ui/sidebar"

export function CustomTrigger() {
  const { toggleSidebar } = useSidebar()

  return <button onClick={toggleSidebar}>Toggle Sidebar</button>
}
```

## SidebarRail

The `SidebarRail` component is used to render a rail within a `Sidebar`. This rail can be used to toggle the sidebar.

```tsx showLineNumbers
<Sidebar>
  <SidebarHeader />
  <SidebarContent>
    <SidebarGroup />
  </SidebarContent>
  <SidebarFooter />
  <SidebarRail />
</Sidebar>
```

## Controlled Sidebar

Use the `open` and `onOpenChange` props to control the sidebar.

```tsx showLineNumbers
export function AppSidebar() {
  const [open, setOpen] = React.useState(false)

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <Sidebar />
    </SidebarProvider>
  )
}
```

## Theming

The sidebar's colours are the design system's tokens, `theme.sidebar`, `theme.sidebarForeground`,
`theme.sidebarPrimary`, `theme.sidebarPrimaryForeground`, `theme.sidebarAccent`,
`theme.sidebarAccentForeground`, `theme.sidebarBorder` and `theme.sidebarRing`
(`lib/kirana/tokens.ts`), each a `light-dark()` pair. The base colour and the theme set them, as
they set every other colour: see [Colours and theming](/docs/design-system/theming).

## Styling

Here are some tips for styling the sidebar based on different states. `sidebar.styles.ts` exports
the states its parts read: `COLLAPSED` (collapsed to its icons) and `sidebarMenuButton`, the
relation a menu button anchors, which an action beside it reads.

```tsx showLineNumbers
import { css } from "@kirana-style/core"

import { COLLAPSED, sidebarMenuButton } from "@/components/ui/sidebar.styles"

const styles = {
  // Hidden while the sidebar is collapsed to its icons.
  group: css({ display: { [COLLAPSED]: "none" } }),
  // Shown beside the active menu button.
  action: css({
    opacity: { [sidebarMenuButton.after('[data-active="true"]')]: 1 },
  }),
}
```

```tsx
<Sidebar collapsible="icon">
  <SidebarContent>
    <SidebarGroup sx={styles.group} />
  </SidebarContent>
</Sidebar>
```

```tsx
<SidebarMenuItem>
  <SidebarMenuButton />
  <SidebarMenuAction sx={styles.action} />
</SidebarMenuItem>
```

## RTL

To set the direction, see [Right to left](/docs/design-system/rtl).

<!-- ::preview item="sidebar-rtl" height="640" combinations="react/base,react/aria" direction="rtl" -->
