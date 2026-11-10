<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { message } from "../../../../styles/message.styles"

defineOptions({ inheritAttrs: false })

const { align = "start" } = defineProps<{
  align?: "start" | "end"
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <div
    data-slot="message"
    :data-align="align"
    v-bind="attrs"
    :sx="[message.root, sx]"
  >
    <slot />
  </div>
</template>
