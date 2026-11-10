<script setup lang="ts">
import { inject } from "vue"

import { COMBOBOX_GROUP } from "./context"

defineSlots<{ default?: (props: { item: any; index: number }) => unknown }>()
const items = inject(COMBOBOX_GROUP, undefined)
</script>

<template>
  <!-- Each of the group's matching items through the slot, as Base UI's collection. -->
  <!-- The slot itself, so a list drawn again patches its rows rather than mounting them anew. -->
  <template v-for="(item, index) in items ?? []" :key="index">
    <slot :item="item" :index="index" />
  </template>
</template>
