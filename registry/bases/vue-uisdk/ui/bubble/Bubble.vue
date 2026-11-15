<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { bubble } from "../../../../styles/bubble.styles"

defineOptions({ inheritAttrs: false })

const { variant = "default", align = "start" } = defineProps<{
  variant?:
    | "default"
    | "secondary"
    | "muted"
    | "tinted"
    | "outline"
    | "ghost"
    | "destructive"
  align?: "start" | "end"
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <div
    data-slot="bubble"
    :data-variant="variant"
    :data-align="align"
    v-bind="attrs"
    :sx="[bubble.root, sx]"
  >
    <slot />
  </div>
</template>
