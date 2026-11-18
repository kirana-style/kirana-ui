<script setup lang="ts">
import { inject } from "vue"

import { COMBOBOX_GROUP } from "./context"

defineSlots<{ default?: (props: { item: any; index: number }) => unknown }>()
const items = inject(COMBOBOX_GROUP, undefined)
</script>

<template>
  <!-- Each of the group's items through the slot, as Base UI's collection. -->
  <template v-for="(item, index) in items ?? []" :key="index">
    <slot :item="item" :index="index" />
  </template>
</template>
