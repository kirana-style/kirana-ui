---
title: Menubar
description: A visually persistent menu common in desktop applications that provides quick access to a consistent set of commands.
section: components
variants: [react/base]
keywords: [menubar, menu, desktop, commands, component, base]
---

# Menubar

<!-- ::preview item="menubar-demo" height="360" combinations="react/base" -->

## Installation

<!-- ::installation name="menubar" combinations="react/base" -->

## Usage

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

<!-- ::preview item="menubar-checkbox" height="360" combinations="react/base" -->

## Radio

Use `MenubarRadioGroup` and `MenubarRadioItem` for single-select options.

<!-- ::preview item="menubar-radio" height="360" combinations="react/base" -->

## Submenu

Use `MenubarSub`, `MenubarSubTrigger`, and `MenubarSubContent` for nested menus.

<!-- ::preview item="menubar-submenu" height="360" combinations="react/base" -->

## With Icons

<!-- ::preview item="menubar-icons" height="360" combinations="react/base" -->

## RTL

To set the direction, see [Right to left](/docs/design-system/rtl).

<!-- ::preview item="menubar-rtl" height="360" combinations="react/base" direction="rtl" -->

## API Reference

See the [Base UI Menubar](https://base-ui.com/react/components/menubar#api-reference) documentation.

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.
