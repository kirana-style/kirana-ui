<script setup lang="ts">
import { inject, useSlots } from "vue"

import { COMBOBOX_GROUP } from "./context"

defineSlots<{ default?: (props: { item: any; index: number }) => unknown }>()
const items = inject(COMBOBOX_GROUP, undefined)
const slots = useSlots()
</script>

<template>
  <!-- Each of the group's matching items through the slot, as Base UI's collection. -->
  <template v-for="(item, index) in items ?? []" :key="index">
    <component :is="() => slots.default?.({ item, index })" />
  </template>
</template>
