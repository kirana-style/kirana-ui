<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { timeline } from "../../../../styles/timeline.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <time data-slot="timeline-time" v-bind="attrs" :sx="[timeline.time, sx]">
    <slot />
  </time>
</template>
