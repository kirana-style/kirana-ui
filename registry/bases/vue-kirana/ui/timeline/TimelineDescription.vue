<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { timeline } from "../../../../styles/timeline.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <p
    data-slot="timeline-description"
    v-bind="attrs"
    :sx="[timeline.description, sx]"
  >
    <slot />
  </p>
</template>
