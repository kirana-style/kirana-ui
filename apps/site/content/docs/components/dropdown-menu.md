---
title: Dropdown Menu
description: Displays a menu of actions or functions, triggered by a button.
section: components
variants: [react/base, react/aria, vue/ark]
keywords: [dropdown menu, component, base, aria, ark]
---

# Dropdown Menu

<!-- ::preview item="dropdown-menu-demo" height="460" combinations="react/base,react/aria,vue/ark" -->

## Installation

<!-- ::installation name="dropdown-menu" combinations="react/base,react/aria,vue/ark" -->

## Usage

<!-- ::start:tabs -->

### Base UI

```tsx
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Example() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        Open
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

### React Aria

```tsx
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Example() {
  return (
    <DropdownMenuTrigger>
      <Button variant="outline">Open</Button>
      <DropdownMenu>
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenu>
    </DropdownMenuTrigger>
  )
}
```

<!-- ::end:tabs -->

<!-- ::start:only react/base -->

## Notes per base

On Base UI, a menu's label must sit inside a `DropdownMenuGroup` (or a radio group): Base UI's group label throws when the menu opens without one.

<!-- ::end:only -->

## Composition

Use the following composition to build a `DropdownMenu`:

<!-- ::start:only react/base -->

```text
DropdownMenu
├── DropdownMenuTrigger
└── DropdownMenuContent
    ├── DropdownMenuGroup
    │   ├── DropdownMenuLabel
    │   ├── DropdownMenuItem
    │   └── DropdownMenuItem
    ├── DropdownMenuSeparator
    ├── DropdownMenuGroup
    │   ├── DropdownMenuLabel
    │   ├── DropdownMenuCheckboxItem
    │   └── DropdownMenuCheckboxItem
    ├── DropdownMenuSeparator
    ├── DropdownMenuGroup
    │   ├── DropdownMenuLabel
    │   └── DropdownMenuRadioGroup
    │       ├── DropdownMenuRadioItem
    │       └── DropdownMenuRadioItem
    └── DropdownMenuSub
        ├── DropdownMenuSubTrigger
        └── DropdownMenuSubContent
            └── DropdownMenuGroup
                ├── DropdownMenuLabel
                ├── DropdownMenuItem
                └── DropdownMenuItem
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```text
DropdownMenuTrigger
├── Button
└── DropdownMenu
    ├── DropdownMenuGroup
    │   ├── DropdownMenuLabel
    │   ├── DropdownMenuItem
    │   └── DropdownMenuItem
    ├── DropdownMenuSeparator
    ├── DropdownMenuGroup
    │   ├── DropdownMenuLabel
    │   ├── DropdownMenuItem
    │   └── DropdownMenuItem
    └── DropdownMenuSub
        ├── DropdownMenuSubTrigger
        └── DropdownMenuSubContent
            └── DropdownMenuGroup
                ├── DropdownMenuLabel
                ├── DropdownMenuItem
                └── DropdownMenuItem
```

<!-- ::end:only -->

## Basic

A basic dropdown menu with labels and separators.

<!-- ::preview item="dropdown-menu-basic" height="400" combinations="react/base,react/aria" -->

## Submenu

Use `DropdownMenuSub` to nest secondary actions.

<!-- ::preview item="dropdown-menu-submenu" height="400" combinations="react/base,react/aria" -->

## Shortcuts

Add `DropdownMenuShortcut` to show keyboard hints.

<!-- ::preview item="dropdown-menu-shortcuts" height="400" combinations="react/base,react/aria" -->

## Icons

Combine icons with labels for quick scanning.

<!-- ::preview item="dropdown-menu-icons" height="400" combinations="react/base,react/aria" -->

## Checkboxes

<!-- ::start:only react/base -->

Use `DropdownMenuCheckboxItem` for toggles.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

Use `selectionMode="multiple"` for toggles.

<!-- ::end:only -->

<!-- ::preview item="dropdown-menu-checkboxes" height="400" combinations="react/base,react/aria" -->

## Checkboxes Icons

Add icons to checkbox items.

<!-- ::preview item="dropdown-menu-checkboxes-icons" height="400" combinations="react/base,react/aria" -->

## Radio Group

<!-- ::start:only react/base -->

Use `DropdownMenuRadioGroup` for exclusive choices.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

Use `selectionMode="single"` for exclusive choices.

<!-- ::end:only -->

<!-- ::preview item="dropdown-menu-radio-group" height="400" combinations="react/base,react/aria" -->

## Radio Icons

Show radio options with icons.

<!-- ::preview item="dropdown-menu-radio-icons" height="400" combinations="react/base,react/aria" -->

## Destructive

Use `variant="destructive"` for irreversible actions.

<!-- ::preview item="dropdown-menu-destructive" height="400" combinations="react/base,react/aria" -->

## Avatar

An account switcher dropdown triggered by an avatar.

<!-- ::preview item="dropdown-menu-avatar" height="400" combinations="react/base,react/aria" -->

## Complex

A richer example combining groups, icons, and submenus.

<!-- ::preview item="dropdown-menu-complex" height="400" combinations="react/base,react/aria" -->

<!-- ::start:only react/base,react/aria -->

## RTL

To set the direction, see [Right to left](/docs/design-system/rtl).

<!-- ::preview item="dropdown-menu-rtl" height="460" combinations="react/base,react/aria" direction="rtl" -->

<!-- ::end:only -->

## API Reference

<!-- ::start:only react/base -->

See the [Base UI documentation](https://base-ui.com/react/components/menu) for the full API reference.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

See the [React Aria documentation](https://react-aria.adobe.com/Menu) for the full API reference.

<!-- ::end:only -->
