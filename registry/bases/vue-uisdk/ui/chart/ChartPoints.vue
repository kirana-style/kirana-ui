<script setup lang="ts">
/** Hands the tooltip body the focused points, as React's `PointsContext`. */
import type { ChartPoint } from "@tanstack/charts"
import { provide, toRef } from "vue"

import { POINTS } from "./chart"

const props = defineProps<{ points: readonly ChartPoint[] }>()
provide(POINTS, toRef(props, "points"))
</script>

<template>
  <slot />
</template>
