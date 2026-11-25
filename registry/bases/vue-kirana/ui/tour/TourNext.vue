<script setup lang="ts">
import { Tour } from "@kirana-ui/vue/tour"
import { useSx } from "@kirana-style/core/vue"
import { computed, inject } from "vue"

import { Button } from "../button"
import { TOUR_SHOWN } from "./context"

defineOptions({ inheritAttrs: false })

/** A Button that goes on a step, "Next", or "Done" on the last step, unless given a slot. */
const { sx, attrs } = useSx()
const shown = inject(TOUR_SHOWN, () => undefined)
const last = computed(() => {
  const step = shown()
  return step != null && step.current === step.total
})
</script>

<template>
  <Tour.Next data-slot="tour-next" v-bind="attrs" as-child>
    <Button size="sm" :sx="sx">
      <slot>{{ last ? "Done" : "Next" }}</slot>
    </Button>
  </Tour.Next>
</template>
