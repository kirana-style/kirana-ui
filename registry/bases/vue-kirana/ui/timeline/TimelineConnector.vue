<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { timeline } from "../../../../styles/timeline.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <div
    data-slot="timeline-connector"
    aria-hidden="true"
    v-bind="attrs"
    :sx="[timeline.connector, sx]"
  >
    <slot />
  </div>
</template>
