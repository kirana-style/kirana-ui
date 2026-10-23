<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  createListCollection,
} from "@workspace/registry/bases/vue-ark/ui/select"

const fruits = createListCollection({
  items: [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Blueberry", value: "blueberry" },
    { label: "Grapes", value: "grapes" },
    { label: "Pineapple", value: "pineapple" },
  ],
})
</script>

<template>
  <Select :collection="fruits">
    <SelectTrigger>
      <SelectValue placeholder="Select a fruit" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Fruits</SelectLabel>
        <SelectItem
          v-for="fruit in fruits.items"
          :key="fruit.value"
          :item="fruit"
        >
          {{ fruit.label }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
