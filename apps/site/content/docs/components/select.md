---
title: Select
description: Displays a list of options to pick from, triggered by a button.
section: components
variants: [react/base, react/aria, vue/ark]
order: 12
keywords: [select, component, base, aria, ark]
---

# Select

<!-- ::preview item="select-demo" height="420" combinations="react/base,react/aria,vue/ark" -->

## Installation

With `kirana-style ui`:

<!-- ::install exec="kirana-style ui add select" -->

<!-- ::start:only react/base,react/aria -->

With shadcn/ui's CLI, from the registry's [export](/docs/shadcn):

<!-- ::install run="shadcn@latest add @kirana/select" -->

<!-- ::end:only -->

## Usage

<!-- ::start:tabs -->

### Base UI

```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const fruits = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
]

export function Example() {
  return (
    <Select items={fruits}>
      <SelectTrigger>
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        {fruits.map((fruit) => (
          <SelectItem key={fruit.value} value={fruit.value}>
            {fruit.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
```

### React Aria

```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function Example() {
  return (
    <Select placeholder="Select a fruit" aria-label="Fruit">
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem id="apple">Apple</SelectItem>
        <SelectItem id="banana">Banana</SelectItem>
      </SelectContent>
    </Select>
  )
}
```

### Vue

```vue
<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  createListCollection,
} from "@/components/ui/select"

const fruits = createListCollection({
  items: [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ],
})
</script>

<template>
  <Select :collection="fruits">
    <SelectTrigger>
      <SelectValue placeholder="Select a fruit" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem
        v-for="fruit in fruits.items"
        :key="fruit.value"
        :item="fruit"
      >
        {{ fruit.label }}
      </SelectItem>
    </SelectContent>
  </Select>
</template>
```

<!-- ::end:tabs -->

## Code

What installing it writes, in the default style:

<!-- ::component-code name="select" combinations="react/base,react/aria,vue/ark" -->

## Notes per base

Ark UI builds a select from a collection (`createListCollection`), so each `SelectItem` takes its `item`. React Aria names an item by `id`, Base UI by `value`.
