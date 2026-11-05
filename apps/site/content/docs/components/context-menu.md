---
title: Context Menu
description: Displays a menu of actions triggered by a right click.
section: components
variants: [react/base, react/aria, vue/ark, svelte/ark, solid/ark, angular/ng]
keywords:
  [context menu, right click, menu, component, base, aria, ark, vue, svelte]
---

# Context Menu

<!-- ::preview item="context-menu-demo" height="636" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## Installation

<!-- ::installation name="context-menu" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

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

<!-- ::start:only vue/ark -->

```vue
<script setup lang="ts">
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
</script>

<template>
  <ContextMenu>
    <ContextMenuTrigger>Right click here</ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuItem>Profile</ContextMenuItem>
      <ContextMenuItem>Billing</ContextMenuItem>
      <ContextMenuItem>Team</ContextMenuItem>
      <ContextMenuItem>Subscription</ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
</template>
```

<!-- ::end:only -->

<!-- ::start:only svelte/ark -->

```svelte
<script lang="ts">
  import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
  } from "@/components/ui/context-menu"
</script>

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

<!-- ::start:only solid/ark -->

```tsx
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

;<ContextMenu>
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

<!-- ::start:only angular/ng -->

```ts
import { Component } from "@angular/core"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

@Component({
  selector: "app-example",
  imports: [
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
  ],
  template: `
    <ng-container kuiContextMenu>
      <div kuiContextMenuTrigger>Right click here</div>
      <div kuiContextMenuContent>
        <div kuiContextMenuItem>Profile</div>
        <div kuiContextMenuItem>Billing</div>
        <div kuiContextMenuItem>Team</div>
        <div kuiContextMenuItem>Subscription</div>
      </div>
    </ng-container>
  `,
})
export class Example {}
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

<!-- ::preview item="context-menu-basic" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## Submenu

Use `ContextMenuSub` to nest secondary actions.

<!-- ::preview item="context-menu-submenu" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## Shortcuts

Add `ContextMenuShortcut` to show keyboard hints.

<!-- ::preview item="context-menu-shortcuts" height="404" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## Groups

Group related actions and separate them with dividers.

<!-- ::preview item="context-menu-groups" height="760" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## Icons

Combine icons with labels for quick scanning.

<!-- ::preview item="context-menu-icons" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## Checkboxes

<!-- ::start:only react/base -->

Use `ContextMenuCheckboxItem` for toggles.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

Use `selectionMode="multiple"` for toggles.

<!-- ::end:only -->

<!-- ::preview item="context-menu-checkboxes" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## Radio

<!-- ::start:only react/base -->

Use `ContextMenuRadioItem` for exclusive choices.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

Use `selectionMode="single"` for exclusive choices.

<!-- ::end:only -->

<!-- ::preview item="context-menu-radio" height="500" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## Destructive

Use `variant="destructive"` to style the menu item as destructive.

<!-- ::preview item="context-menu-destructive" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

## Sides

<!-- ::start:only react/base,vue/ark,svelte/ark,solid/ark -->

Control submenu placement with side and align props.

<!-- ::preview item="context-menu-sides" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

<!-- ::end:only -->

## RTL

To set the direction, see [Right to left](/docs/design-system/rtl).

<!-- ::preview item="context-menu-rtl" height="564" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" direction="rtl" -->

## API Reference

<!-- ::start:only react/base -->

See the [Base UI](https://base-ui.com/react/components/context-menu#api-reference) documentation for more information.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

See the [React Aria](https://react-aria.adobe.com/Menu#api) documentation for more information.

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

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.

## Placement

<!-- ::start:only react/aria -->

Control submenu placement with the `placement` prop.

<!-- ::preview item="context-menu-sides" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark,angular/ng" -->

<!-- ::end:only -->
