---
title: Command
description: Command menu for search and quick actions.
section: components
variants:
  [
    react/base,
    react/aria,
    vue/ark,
    vue/reka,
    svelte/ark,
    svelte/bits,
    solid/ark,
    angular/ng,
  ]
keywords:
  [
    command,
    palette,
    search,
    cmdk,
    component,
    base,
    aria,
    ark,
    vue,
    svelte,
    solid,
  ]
---

# Command

<!-- ::preview item="command-demo" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" -->

## About

<!-- ::start:only react/base -->

The `<Command />` component uses the [`cmdk`](https://github.com/dip/cmdk) component by [Dip](https://www.dip.org/).

<!-- ::end:only -->

## Installation

<!-- ::installation name="command" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" -->

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

<!-- ::start:only vue/ark,vue/reka -->

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

<!-- ::start:only svelte/ark,svelte/bits -->

```svelte
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
```

<!-- ::end:only -->

<!-- ::start:only solid/ark -->

```tsx
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
```

<!-- ::end:only -->

<!-- ::start:only angular/ng -->

```ts
import { Component } from "@angular/core"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"

@Component({
  selector: "app-example",
  imports: [
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
  ],
  template: `
    <div kuiCommand>
      <div kuiCommandInput placeholder="Type a command or search..."></div>
      <div kuiCommandList>
        <div kuiCommandEmpty>No results found.</div>
        <div kuiCommandGroup heading="Suggestions">
          <div kuiCommandItem>Calendar</div>
          <div kuiCommandItem>Search Emoji</div>
          <div kuiCommandItem>Calculator</div>
        </div>
        <div kuiCommandSeparator></div>
        <div kuiCommandGroup heading="Settings">
          <div kuiCommandItem>Profile</div>
          <div kuiCommandItem>Billing</div>
          <div kuiCommandItem>Settings</div>
        </div>
      </div>
    </div>
  `,
})
export class Example {}
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

<!-- ::preview item="command-basic" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" -->

## Shortcuts

<!-- ::preview item="command-shortcuts" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" -->

## Groups

A command menu with groups, icons and separators.

<!-- ::preview item="command-groups" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" -->

## Scrollable

Scrollable command menu with multiple items.

<!-- ::preview item="command-scrollable" height="360" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" -->

## RTL

To set the direction, see [Right to left](/docs/design-system/rtl).

<!-- ::preview item="command-rtl" height="392" combinations="react/base,react/aria,vue/ark,vue/reka,svelte/ark,svelte/bits,solid/ark,angular/ng" direction="rtl" -->

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

<!-- ::start:only vue/reka -->

See the [Reka UI Listbox](https://reka-ui.com/docs/components/listbox#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only svelte/ark -->

See the [Ark UI Listbox](https://ark-ui.com/svelte/docs/components/listbox#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only svelte/bits -->

See the [Bits UI Command](https://bits-ui.com/docs/components/command#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only solid/ark -->

See the [Ark UI Listbox](https://ark-ui.com/solid/docs/components/listbox#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only angular/ng -->

Angular's is the registry's own, as cmdk's: `<div kuiCommand>` holding `<div kuiCommandInput placeholder="…">` and `<div kuiCommandList>`, each item `<div kuiCommandItem (select)="…">` matched by its `value` (its text when not given) and `keywords`. `shouldFilter` false leaves the filtering to you. `<kui-command-dialog [(open)]>` holds the command's state itself, so its input and list go straight inside it.

<!-- ::end:only -->

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.
