<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { aspectRatio } from "../../../../styles/aspect-ratio.styles"

defineOptions({ inheritAttrs: false })

const { ratio } = defineProps<{
  ratio: number
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <div
    data-slot="aspect-ratio"
    :style="{ '--ratio': ratio }"
    v-bind="attrs"
    :sx="[aspectRatio, sx]"
  >
    <slot />
  </div>
</template>
