<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"
import { computed, inject } from "vue"

import { tour } from "../../../../styles/tour.styles"
import { TOUR_SHOWN } from "./context"

defineOptions({ inheritAttrs: false })

/** The step's place in the tour, "1 of 3", unless given a slot. */
const { sx, attrs } = useSx()
const shown = inject(TOUR_SHOWN, () => undefined)
const text = computed(() => {
  const step = shown()
  return step ? `${step.current} of ${step.total}` : ""
})
</script>

<template>
  <span data-slot="tour-progress" v-bind="attrs" :sx="[tour.progress, sx]">
    <slot>{{ text }}</slot>
  </span>
</template>
