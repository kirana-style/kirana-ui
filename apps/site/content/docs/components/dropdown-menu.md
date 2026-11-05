---
title: Dropdown Menu
description: Displays a menu of actions or functions, triggered by a button.
section: components
variants: [react/base, react/aria, vue/ark, svelte/ark, solid/ark, angular/ng]
keywords:
  [dropdown menu, component, base, aria, ark, ark, vue, svelte, solid, angular]
---

# Dropdown Menu

<!-- ::preview item="dropdown-menu-demo" height="760" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## Installation

<!-- ::installation name="dropdown-menu" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

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

### Angular

```ts
import { Component } from "@angular/core"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

@Component({
  selector: "app-example",
  imports: [
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  ],
  template: `
    <ng-container kuiDropdownMenu>
      <button kuiButton kuiDropdownMenuTrigger variant="outline">Open</button>
      <div kuiDropdownMenuContent>
        <div kuiDropdownMenuGroup>
          <div kuiDropdownMenuLabel>My Account</div>
          <div kuiDropdownMenuItem>Profile</div>
          <div kuiDropdownMenuItem>Billing</div>
        </div>
        <div kuiDropdownMenuSeparator></div>
        <div kuiDropdownMenuGroup>
          <div kuiDropdownMenuItem>Team</div>
          <div kuiDropdownMenuItem>Subscription</div>
        </div>
      </div>
    </ng-container>
  `,
})
export class Example {}
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

<!-- ::preview item="dropdown-menu-basic" height="540" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## Submenu

Use `DropdownMenuSub` to nest secondary actions.

<!-- ::preview item="dropdown-menu-submenu" height="400" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## Shortcuts

Add `DropdownMenuShortcut` to show keyboard hints.

<!-- ::preview item="dropdown-menu-shortcuts" height="400" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## Icons

Combine icons with labels for quick scanning.

<!-- ::preview item="dropdown-menu-icons" height="400" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## Checkboxes

<!-- ::start:only react/base -->

Use `DropdownMenuCheckboxItem` for toggles.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

Use `selectionMode="multiple"` for toggles.

<!-- ::end:only -->

<!-- ::preview item="dropdown-menu-checkboxes" height="400" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## Checkboxes Icons

Add icons to checkbox items.

<!-- ::preview item="dropdown-menu-checkboxes-icons" height="400" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## Radio Group

<!-- ::start:only react/base -->

Use `DropdownMenuRadioGroup` for exclusive choices.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

Use `selectionMode="single"` for exclusive choices.

<!-- ::end:only -->

<!-- ::preview item="dropdown-menu-radio-group" height="400" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## Radio Icons

Show radio options with icons.

<!-- ::preview item="dropdown-menu-radio-icons" height="400" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## Destructive

Use `variant="destructive"` for irreversible actions.

<!-- ::preview item="dropdown-menu-destructive" height="400" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## Avatar

An account switcher dropdown triggered by an avatar.

<!-- ::preview item="dropdown-menu-avatar" height="400" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## Complex

A richer example combining groups, icons, and submenus.

<!-- ::preview item="dropdown-menu-complex" height="760" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

<!-- ::start:only react/base,react/aria,vue/ark,svelte/ark,solid/ark -->

## RTL

To set the direction, see [Right to left](/docs/design-system/rtl).

<!-- ::preview item="dropdown-menu-rtl" height="760" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" direction="rtl" -->

<!-- ::end:only -->

## API Reference

<!-- ::start:only react/base -->

See the [Base UI documentation](https://base-ui.com/react/components/menu) for the full API reference.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

See the [React Aria documentation](https://react-aria.adobe.com/Menu) for the full API reference.

<!-- ::end:only -->

<!-- ::start:only vue/ark -->

See the [Ark UI Menu](https://ark-ui.com/vue/docs/components/menu#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only svelte/ark -->

See the [Ark UI Menu](https://ark-ui.com/svelte/docs/components/menu#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only solid/ark -->

See the [Ark UI Menu](https://ark-ui.com/solid/docs/components/menu#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only angular/ng -->

Angular's popups are the registry's own layer on Floating UI (`lib/angular/popup.ts`), in Base UI's markup: it takes Base UI's props (`side`, `align`, `sideOffset`, `alignOffset`, `[(open)]`, `defaultOpen`).

<!-- ::end:only -->
