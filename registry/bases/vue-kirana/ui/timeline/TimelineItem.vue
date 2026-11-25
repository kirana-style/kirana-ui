<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { timeline } from "../../../../styles/timeline.styles"
import TimelineConnector from "./TimelineConnector.vue"

defineOptions({ inheritAttrs: false })

/** An event: its marker and content, then the line to the next event, which the last one hides. */
const { connector = true } = defineProps<{ connector?: boolean }>()
const { sx, attrs } = useSx()
</script>

<template>
  <li data-slot="timeline-item" v-bind="attrs" :sx="[timeline.item, sx]">
    <slot />
    <TimelineConnector v-if="connector" />
  </li>
</template>
