<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { bubble } from "../../../../styles/bubble.styles"

defineOptions({ inheritAttrs: false })

const { side = "bottom", align = "end" } = defineProps<{
  side?: "top" | "bottom"
  align?: "start" | "end"
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <div
    data-slot="bubble-reactions"
    :data-align="align"
    :data-side="side"
    v-bind="attrs"
    :sx="[bubble.reactions, sx]"
  >
    <slot />
  </div>
</template>
