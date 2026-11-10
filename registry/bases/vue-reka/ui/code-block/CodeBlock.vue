<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { codeBlock } from "../../../../styles/code-block.styles"

defineOptions({ inheritAttrs: false })

const { variant = "default", size = "default" } = defineProps<{
  variant?: "default" | "destructive"
  size?: "default" | "sm"
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <div
    data-slot="code-block"
    :data-variant="variant"
    :data-size="size"
    v-bind="attrs"
    :sx="[codeBlock.root, sx]"
  >
    <slot />
  </div>
</template>
