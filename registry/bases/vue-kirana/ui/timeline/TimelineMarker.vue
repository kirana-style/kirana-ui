<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { timeline } from "../../../../styles/timeline.styles"

defineOptions({ inheritAttrs: false })

type TimelineMarkerVariants = NonNullable<Parameters<typeof timeline.marker>[0]>

const { variant = "default" } = defineProps<{
  variant?: TimelineMarkerVariants["variant"]
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <span
    data-slot="timeline-marker"
    :data-variant="variant"
    aria-hidden="true"
    v-bind="attrs"
    :sx="[timeline.marker({ variant }), sx]"
  >
    <slot />
  </span>
</template>
