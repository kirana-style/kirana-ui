---
title: Command
description: Command menu for search and quick actions.
section: components
variants: [react/base, react/aria, vue/ark]
keywords: [command, palette, search, cmdk, component, base, aria, ark, vue]
---

# Command

<!-- ::preview item="command-demo" height="360" combinations="react/base,react/aria,vue/ark" -->

## About

<!-- ::start:only react/base -->

The `<Command />` component uses the [`cmdk`](https://github.com/dip/cmdk) component by [Dip](https://www.dip.org/).

<!-- ::end:only -->

## Installation

<!-- ::installation name="command" combinations="react/base,react/aria,vue/ark" -->

## Usage

```tsx
import { css } from "@kirana-style/core"

import { radius, theme } from "@/lib/kirana/tokens"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

const framed = css({
  maxWidth: "24rem",
  borderRadius: radius.lg,
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: theme.border,
})
```

<!-- ::start:only react/base -->

```tsx
<Command sx={framed}>
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>Calendar</CommandItem>
      <CommandItem>Search Emoji</CommandItem>
      <CommandItem>Calculator</CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Settings">
      <CommandItem>Profile</CommandItem>
      <CommandItem>Billing</CommandItem>
      <CommandItem>Settings</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx
<Command sx={framed}>
  <CommandInput placeholder="Type a command or search..." />
  <CommandList
    renderEmptyState={() => <CommandEmpty>No results found.</CommandEmpty>}
  >
    <CommandGroup heading="Suggestions">
      <CommandItem>Calendar</CommandItem>
      <CommandItem>Search Emoji</CommandItem>
      <CommandItem>Calculator</CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Settings">
      <CommandItem>Profile</CommandItem>
      <CommandItem>Billing</CommandItem>
      <CommandItem>Settings</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>
```

<!-- ::end:only -->

<!-- ::start:only vue/ark -->

```vue
<template>
  <Command>
    <CommandInput placeholder="Type a command or search..." />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Suggestions">
        <CommandItem>Calendar</CommandItem>
        <CommandItem>Search Emoji</CommandItem>
        <CommandItem>Calculator</CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Settings">
        <CommandItem>Profile</CommandItem>
        <CommandItem>Billing</CommandItem>
        <CommandItem>Settings</CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
</template>
```

<!-- ::end:only -->

## Composition

Use the following composition to build a `Command`:

<!-- ::start:only react/base -->

```text
Command
├── CommandInput
└── CommandList
    ├── CommandEmpty
    ├── CommandGroup
    │   ├── CommandItem
    │   └── CommandItem
    ├── CommandSeparator
    └── CommandGroup
        ├── CommandItem
        └── CommandItem
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```text
Command
├── CommandInput
└── CommandList
    ├── CommandGroup
    │   ├── CommandItem
    │   └── CommandItem
    ├── CommandSeparator
    └── CommandGroup
        ├── CommandItem
        └── CommandItem
```

<!-- ::end:only -->

## Basic

A simple command menu in a dialog.

<!-- ::preview item="command-basic" height="360" combinations="react/base,react/aria,vue/ark" -->

## Shortcuts

<!-- ::preview item="command-shortcuts" height="360" combinations="react/base,react/aria,vue/ark" -->

## Groups

A command menu with groups, icons and separators.

<!-- ::preview item="command-groups" height="360" combinations="react/base,react/aria,vue/ark" -->

## Scrollable

Scrollable command menu with multiple items.

<!-- ::preview item="command-scrollable" height="360" combinations="react/base,react/aria,vue/ark" -->

## RTL

To set the direction, see [Right to left](/docs/design-system/rtl).

<!-- ::preview item="command-rtl" height="392" combinations="react/base,react/aria,vue/ark" direction="rtl" -->

## API Reference

<!-- ::start:only react/base -->

See the [cmdk](https://github.com/dip/cmdk) documentation for more information.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

See the [React Aria](https://react-aria.adobe.com/Autocomplete) documentation for more information.

<!-- ::end:only -->

<!-- ::start:only vue/ark -->

See the [Ark UI Listbox](https://ark-ui.com/vue/docs/components/listbox#api-reference) documentation.

<!-- ::end:only -->

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.
