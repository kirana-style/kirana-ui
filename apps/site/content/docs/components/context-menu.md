---
title: Context Menu
description: Displays a menu of actions triggered by a right click.
section: components
variants: [react/base, react/aria]
keywords: [context menu, right click, menu, component, base, aria]
---

# Context Menu

<!-- ::preview item="context-menu-demo" height="360" combinations="react/base,react/aria" -->

## Installation

<!-- ::installation name="context-menu" combinations="react/base,react/aria" -->

## Usage

<!-- ::start:only react/base -->

```tsx
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
```

```tsx
<ContextMenu>
  <ContextMenuTrigger>Right click here</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Profile</ContextMenuItem>
    <ContextMenuItem>Billing</ContextMenuItem>
    <ContextMenuItem>Team</ContextMenuItem>
    <ContextMenuItem>Subscription</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx
import { Pressable } from "react-aria-components"

import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
```

```tsx
<ContextMenuTrigger>
  <Pressable>
    <div role="button">Right click here</div>
  </Pressable>
  <ContextMenu>
    <ContextMenuItem>Profile</ContextMenuItem>
    <ContextMenuItem>Billing</ContextMenuItem>
    <ContextMenuItem>Team</ContextMenuItem>
    <ContextMenuItem>Subscription</ContextMenuItem>
  </ContextMenu>
</ContextMenuTrigger>
```

<!-- ::end:only -->

## Composition

Use the following composition to build a `ContextMenu`:

<!-- ::start:only react/base -->

```text
ContextMenu
├── ContextMenuTrigger
└── ContextMenuContent
    ├── ContextMenuGroup
    │   ├── ContextMenuLabel
    │   ├── ContextMenuItem
    │   └── ContextMenuItem
    ├── ContextMenuSeparator
    ├── ContextMenuGroup
    │   ├── ContextMenuLabel
    │   ├── ContextMenuCheckboxItem
    │   └── ContextMenuCheckboxItem
    ├── ContextMenuSeparator
    ├── ContextMenuGroup
    │   ├── ContextMenuLabel
    │   └── ContextMenuRadioGroup
    │       ├── ContextMenuRadioItem
    │       └── ContextMenuRadioItem
    └── ContextMenuSub
        ├── ContextMenuSubTrigger
        └── ContextMenuSubContent
            └── ContextMenuGroup
                ├── ContextMenuItem
                └── ContextMenuItem
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```text
ContextMenuTrigger
├── Pressable
└── ContextMenuContent
    ├── ContextMenuGroup
    │   ├── ContextMenuLabel
    │   ├── ContextMenuItem
    │   └── ContextMenuItem
    ├── ContextMenuSeparator
    ├── ContextMenuGroup
    │   ├── ContextMenuLabel
    │   ├── ContextMenuItem
    │   └── ContextMenuItem
    └── ContextMenuSub
        ├── ContextMenuSubTrigger
        └── ContextMenuSubContent
            └── ContextMenuGroup
                ├── ContextMenuItem
                └── ContextMenuItem
```

<!-- ::end:only -->

## Basic

A simple context menu with a few actions.

<!-- ::preview item="context-menu-basic" height="360" combinations="react/base,react/aria" -->

## Submenu

Use `ContextMenuSub` to nest secondary actions.

<!-- ::preview item="context-menu-submenu" height="360" combinations="react/base,react/aria" -->

## Shortcuts

Add `ContextMenuShortcut` to show keyboard hints.

<!-- ::preview item="context-menu-shortcuts" height="360" combinations="react/base,react/aria" -->

## Groups

Group related actions and separate them with dividers.

<!-- ::preview item="context-menu-groups" height="360" combinations="react/base,react/aria" -->

## Icons

Combine icons with labels for quick scanning.

<!-- ::preview item="context-menu-icons" height="360" combinations="react/base,react/aria" -->

## Checkboxes

<!-- ::start:only react/base -->

Use `ContextMenuCheckboxItem` for toggles.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

Use `selectionMode="multiple"` for toggles.

<!-- ::end:only -->

<!-- ::preview item="context-menu-checkboxes" height="360" combinations="react/base,react/aria" -->

## Radio

<!-- ::start:only react/base -->

Use `ContextMenuRadioItem` for exclusive choices.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

Use `selectionMode="single"` for exclusive choices.

<!-- ::end:only -->

<!-- ::preview item="context-menu-radio" height="360" combinations="react/base,react/aria" -->

## Destructive

Use `variant="destructive"` to style the menu item as destructive.

<!-- ::preview item="context-menu-destructive" height="360" combinations="react/base,react/aria" -->

## Sides

<!-- ::start:only react/base -->

Control submenu placement with side and align props.

<!-- ::preview item="context-menu-sides" height="360" combinations="react/base,react/aria" -->

<!-- ::end:only -->

## RTL

To set the direction, see [Right to left](/docs/design-system/rtl).

<!-- ::preview item="context-menu-rtl" height="360" combinations="react/base,react/aria" direction="rtl" -->

## API Reference

<!-- ::start:only react/base -->

See the [Base UI](https://base-ui.com/react/components/context-menu#api-reference) documentation for more information.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

See the [React Aria](https://react-aria.adobe.com/Menu#api) documentation for more information.

<!-- ::end:only -->

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.

## Placement

<!-- ::start:only react/aria -->

Control submenu placement with the `placement` prop.

<!-- ::preview item="context-menu-sides" height="360" combinations="react/base,react/aria" -->

<!-- ::end:only -->
