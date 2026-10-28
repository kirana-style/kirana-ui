# Select

<!-- ::preview item="select-demo" height="420" combinations="vue/ark" -->

## Installation

<!-- ::installation name="select" combinations="vue/ark" -->

## Usage

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

Ark UI builds a select from a collection (`createListCollection`), so each `SelectItem` takes its `item`.

## API Reference

See the [Ark UI Select](https://ark-ui.com/docs/components/select#api-reference) documentation for more information.

Every part takes Kirana's `sx` in place of `class`: a style, or an array of them, merged with the part's own.
