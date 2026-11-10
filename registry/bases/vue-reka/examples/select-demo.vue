<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { page } from "../../../styles/page.styles"

const fruits = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Grapes", value: "grapes" },
  { label: "Pineapple", value: "pineapple" },
]
</script>

<template>
  <div :sx="page.example">
    <Select :items="fruits">
      <SelectTrigger>
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem
            v-for="fruit in fruits"
            :key="fruit.value"
            :value="fruit.value"
            >{{ fruit.label }}</SelectItem
          >
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
</template>
