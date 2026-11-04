---
title: Select
description: Displays a list of options for the user to pick from—triggered by a button.
section: components
variants: [react/base, react/aria, vue/ark, svelte/ark, solid/ark]
keywords: [select, component, base, aria, ark, ark, vue, svelte, solid]
---

# Select

<!-- ::preview item="select-demo" height="464" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark" -->

## Installation

<!-- ::installation name="select" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark" -->

## Usage

```tsx
import { css } from "@kirana-style/core"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const styles = { trigger: css({ width: "180px" }) }
```

<!-- ::start:only react/base -->

```tsx
const items = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "System", value: "system" },
]

<Select items={items}>
  <SelectTrigger sx={styles.trigger}>
    <SelectValue placeholder="Theme" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      {items.map((item) => (
        <SelectItem key={item.value} value={item.value}>
          {item.label}
        </SelectItem>
      ))}
    </SelectGroup>
  </SelectContent>
</Select>
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx
const items = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "System", value: "system" },
]

<Select placeholder="Theme">
  <SelectTrigger sx={styles.trigger}>
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      {items.map((item) => (
        <SelectItem key={item.value} id={item.value}>
          {item.label}
        </SelectItem>
      ))}
    </SelectGroup>
  </SelectContent>
</Select>
```

<!-- ::end:only -->

<!-- ::start:only vue/ark -->

```vue
<script setup lang="ts">
const items = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "System", value: "system" },
]
</script>

<template>
  <Select :items="items">
    <SelectTrigger :sx="styles.trigger">
      <SelectValue placeholder="Theme" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem v-for="item in items" :key="item.value" :value="item.value">
          {{ item.label }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
```

<!-- ::end:only -->

<!-- ::start:only svelte/ark -->

```svelte
<script lang="ts">
  const items = [
    { label: "Light", value: "light" },
    { label: "Dark", value: "dark" },
    { label: "System", value: "system" },
  ]
</script>

<Select items={items}>
  <SelectTrigger sx={styles.trigger}>
    <SelectValue placeholder="Theme" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      {#each items as item (item.value)}
        <SelectItem value={item.value}>
          {item.label}
        </SelectItem>
      {/each}
    </SelectGroup>
  </SelectContent>
</Select>
```

<!-- ::end:only -->

<!-- ::start:only solid/ark -->

```tsx
import { For } from "solid-js"

export function Example() {
  const items = [
    { label: "Light", value: "light" },
    { label: "Dark", value: "dark" },
    { label: "System", value: "system" },
  ]

  return (
    <Select items={items}>
      <SelectTrigger sx={styles.trigger}>
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <For each={items}>
            {(item) => <SelectItem value={item.value}>{item.label}</SelectItem>}
          </For>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
```

<!-- ::end:only -->

## Composition

Use the following composition to build a `Select`:

```text
Select
├── SelectTrigger
│   └── SelectValue
└── SelectContent
    ├── SelectGroup
    │   ├── SelectLabel
    │   ├── SelectItem
    │   └── SelectItem
    ├── SelectSeparator
    └── SelectGroup
        ├── SelectLabel
        ├── SelectItem
        └── SelectItem
```

<!-- ::start:only react/base -->

## Align Item With Trigger

Use `alignItemWithTrigger` on `SelectContent` to control whether the selected item aligns with the trigger. When `true` (default), the popup positions so the selected item appears over the trigger. When `false`, the popup aligns to the trigger edge.

<!-- ::preview item="select-align-item" height="360" combinations="react/base,vue/ark,svelte/ark,solid/ark" -->

<!-- ::end:only -->

## Groups

Use `SelectGroup`, `SelectLabel`, and `SelectSeparator` to organize items.

<!-- ::preview item="select-groups" height="604" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark" -->

## Scrollable

A select with many items that scrolls.

<!-- ::preview item="select-scrollable" height="760" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark" -->

## Disabled

<!-- ::preview item="select-disabled" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark" -->

## Invalid

<!-- ::start:only react/base -->

Add the `data-invalid` attribute to the `Field` component and the `aria-invalid` attribute to the `SelectTrigger` component to show an error state.

```tsx
<Field data-invalid>
  <FieldLabel>Fruit</FieldLabel>
  <SelectTrigger aria-invalid>
    <SelectValue />
  </SelectTrigger>
</Field>
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

Add the `data-invalid` attribute to the `Field` component and the `isInvalid` prop to the `SelectTrigger` component to show an error state.

```tsx
<Field data-invalid>
  <FieldLabel>Fruit</FieldLabel>
  <Select isInvalid>{/* ... */}</Select>
</Field>
```

<!-- ::end:only -->

<!-- ::preview item="select-invalid" height="360" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark" -->

<!-- ::start:only react/aria -->

## Searchable

Use the [Autocomplete](https://react-aria.adobe.com/Autocomplete) component from React Aria to add search support.

<!-- ::preview item="select-autocomplete" height="360" combinations="react/aria" -->

<!-- ::end:only -->

<!-- ::start:only react/base,react/aria,vue/ark,svelte/ark,solid/ark -->

## RTL

To set the direction, see [Right to left](/docs/design-system/rtl).

<!-- ::preview item="select-rtl" height="716" combinations="react/base,react/aria,vue/ark,svelte/ark,solid/ark" direction="rtl" -->

<!-- ::end:only -->

## API Reference

<!-- ::start:only react/base -->

See the [Base UI Select](https://base-ui.com/react/components/select#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only react/aria -->

See the [React Aria Select](https://react-aria.adobe.com/Select#api) documentation.

<!-- ::end:only -->

<!-- ::start:only vue/ark -->

See the [Ark UI Select](https://ark-ui.com/vue/docs/components/select#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only svelte/ark -->

See the [Ark UI Select](https://ark-ui.com/svelte/docs/components/select#api-reference) documentation.

<!-- ::end:only -->

<!-- ::start:only solid/ark -->

See the [Ark UI Select](https://ark-ui.com/solid/docs/components/select#api-reference) documentation.

<!-- ::end:only -->

Every part takes Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.
