<script setup lang="ts">
import { provide, toRef } from "vue"

import { FENCE_OPEN } from "./context"

const props = defineProps<{ value: boolean }>()
provide(FENCE_OPEN, toRef(props, "value"))
</script>

<template>
  <slot />
</template>
