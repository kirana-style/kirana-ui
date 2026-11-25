<script setup lang="ts">
import { TimeField } from "@kirana-ui/vue/time-field"
import type { TimeFieldSegment } from "@kirana-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import { timeField } from "../../../../styles/time-field.styles"

defineOptions({ inheritAttrs: false })

const { segment } = defineProps<{ segment: TimeFieldSegment }>()
const { sx, attrs } = useSx()
</script>

<template>
  <TimeField.Segment
    data-slot="time-field-segment"
    :segment="segment"
    v-bind="attrs"
    :sx="[timeField.segment, sx]"
  />
</template>
