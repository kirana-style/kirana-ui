<script setup lang="ts">
import { inject } from "vue"

import { GROUP_ITEMS } from "./context"

defineSlots<{ default?: (props: { item: any; index: number }) => unknown }>()
const items = inject(GROUP_ITEMS, undefined)
</script>

<template>
  <!-- Each of the group's items through the slot, as Base UI's collection; ui-sdk filters them. -->
  <template v-for="(item, index) in items ?? []" :key="index">
    <slot :item="item" :index="index" />
  </template>
</template>
