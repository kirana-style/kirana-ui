<script setup lang="ts">
import { Label } from "../../../ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select"
import { styles } from "./data-table"
import type { Item } from "./data-table"

defineProps<{ item: Item }>()

const reviewers = [
  { label: "Eddie Lake", value: "Eddie Lake" },
  { label: "Jamik Tashpulatov", value: "Jamik Tashpulatov" },
]
</script>

<template>
  <template v-if="item.reviewer !== 'Assign reviewer'">{{
    item.reviewer
  }}</template>
  <template v-else>
    <Label :for="`${item.id}-reviewer`" :sx="styles.label3">Reviewer</Label>
    <Select :items="reviewers">
      <SelectTrigger
        :sx="styles.selectTrigger"
        size="sm"
        :id="`${item.id}-reviewer`"
      >
        <SelectValue :sx="styles.selectValue" placeholder="Assign reviewer" />
      </SelectTrigger>
      <SelectContent align="end">
        <SelectGroup>
          <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
          <SelectItem value="Jamik Tashpulatov">Jamik Tashpulatov</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </template>
</template>
