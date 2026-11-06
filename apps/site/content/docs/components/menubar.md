---
title: Menubar
description: A visually persistent menu common in desktop applications that provides quick access to a consistent set of commands.
section: components
variants: [react/base, angular/ng]
keywords: [menubar, menu, desktop, commands, component, base, angular]
---

# Menubar

<!-- ::preview item="menubar-demo" height="492" combinations="react/base,angular/ng" -->

## Installation

<!-- ::installation name="menubar" combinations="react/base,angular/ng" -->

## Usage

<!-- ::start:only react/base -->

```tsx
import {
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
```

```tsx
<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarGroup>
        <MenubarItem>
          New Tab <MenubarShortcut>⌘T</MenubarShortcut>
        </MenubarItem>
        <MenubarItem>New Window</MenubarItem>
      </MenubarGroup>
      <MenubarSeparator />
      <MenubarGroup>
        <MenubarItem>Share</MenubarItem>
        <MenubarItem>Print</MenubarItem>
      </MenubarGroup>
    </MenubarContent>
  </MenubarMenu>
</Menubar>
```

<!-- ::end:only -->

<!-- ::start:only angular/ng -->

```ts
import { Component } from "@angular/core"
import {
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"

@Component({
  selector: "app-example",
  imports: [
    Menubar,
    MenubarContent,
    MenubarGroup,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
  ],
  template: `
    <div kuiMenubar>
      <ng-container kuiMenubarMenu>
        <button kuiMenubarTrigger>File</button>
        <div kuiMenubarContent>
          <div kuiMenubarGroup>
            <div kuiMenubarItem>New Tab <span kuiMenubarShortcut>⌘T</span></div>
            <div kuiMenubarItem>New Window</div>
          </div>
          <div kuiMenubarSeparator></div>
          <div kuiMenubarGroup>
            <div kuiMenubarItem>Share</div>
            <div kuiMenubarItem>Print</div>
          </div>
        </div>
      </ng-container>
    </div>
  `,
})
export class Example {}
```

<!-- ::end:only -->

## Composition

Use the following composition to build a `Menubar`:

```text
Menubar
├── MenubarMenu
│   ├── MenubarTrigger
│   └── MenubarContent
│       ├── MenubarGroup
│       │   ├── MenubarLabel
│       │   ├── MenubarItem
│       │   └── MenubarItem
│       ├── MenubarSeparator
│       ├── MenubarGroup
│       │   ├── MenubarLabel
│       │   ├── MenubarCheckboxItem
│       │   └── MenubarCheckboxItem
│       ├── MenubarSeparator
│       ├── MenubarGroup
│       │   ├── MenubarLabel
│       │   └── MenubarRadioGroup
│       │       ├── MenubarRadioItem
│       │       └── MenubarRadioItem
│       └── MenubarSub
│           ├── MenubarSubTrigger
│           └── MenubarSubContent
│               └── MenubarGroup
│                   ├── MenubarLabel
│                   ├── MenubarItem
│                   └── MenubarItem
└── MenubarMenu
    ├── MenubarTrigger
    └── MenubarContent
        └── MenubarGroup
            ├── MenubarLabel
            ├── MenubarItem
            └── MenubarItem
```

## Checkbox

Use `MenubarCheckboxItem` for toggleable options.

<!-- ::preview item="menubar-checkbox" height="360" combinations="react/base,angular/ng" -->

## Radio

Use `MenubarRadioGroup` and `MenubarRadioItem` for single-select options.

<!-- ::preview item="menubar-radio" height="436" combinations="react/base,angular/ng" -->

## Submenu

Use `MenubarSub`, `MenubarSubTrigger`, and `MenubarSubContent` for nested menus.

<!-- ::preview item="menubar-submenu" height="360" combinations="react/base,angular/ng" -->

## With Icons

<!-- ::preview item="menubar-icons" height="360" combinations="react/base,angular/ng" -->

## RTL

To set the direction, see [Right to left](/docs/design-system/rtl).

<!-- ::preview item="menubar-rtl" height="532" combinations="react/base,angular/ng" direction="rtl" -->

## API Reference

<!-- ::start:only react/base -->

See the [Base UI Menubar](https://base-ui.com/react/components/menubar#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only angular/ng -->

Angular's menubar is the registry's own, on the same menus as Dropdown Menu, and behaves as Base
UI's: the triggers are one tab stop, the arrow keys moving between them; once a menu is open, the
pointer on another trigger opens that one, and the left and right arrows in an open menu move to the
menu beside. Each part takes the inputs of its Dropdown Menu counterpart (`MenubarContent`'s
`side`, `align`, `sideOffset` and `alignOffset`, an item's `inset`, `variant` and `disabled`, a
checkbox item's `[(checked)]`, a radio group's `[(value)]`). See the
[Base UI Menubar](https://base-ui.com/react/components/menubar#api-reference) documentation for how
it behaves.

<!-- ::end:only -->

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.
