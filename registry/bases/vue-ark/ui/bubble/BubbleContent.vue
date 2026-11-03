<script setup lang="ts">
import { ark } from "@ark-ui/vue/factory"
import { useSx } from "@kirana-style/core/vue"

import { bubble } from "../../../../styles/bubble.styles"

defineOptions({ inheritAttrs: false })

const { asChild = false } = defineProps<{
  asChild?: boolean
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <ark.div
    data-slot="bubble-content"
    v-bind="attrs"
    :sx="[bubble.content, sx]"
    :as-child="asChild"
  >
    <slot />
  </ark.div>
</template>
