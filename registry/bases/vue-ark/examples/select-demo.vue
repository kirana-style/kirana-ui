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
} from "../ui/select"
import { page } from "../../../styles/page.styles"

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
  <div :sx="page.example">
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
  </div>
</template>
