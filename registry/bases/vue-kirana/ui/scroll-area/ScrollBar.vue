<script setup lang="ts">
import { ScrollArea } from "@kirana-ui/vue/scroll-area"
import { useSx } from "@kirana-style/core/vue"

import { scrollArea } from "../../../../styles/scroll-area.styles"

defineOptions({ inheritAttrs: false })

const { orientation = "vertical" } = defineProps<{
  orientation?: "vertical" | "horizontal"
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <ScrollArea.Scrollbar
    data-slot="scroll-area-scrollbar"
    :data-orientation="orientation"
    :orientation="orientation"
    v-bind="attrs"
    :sx="[scrollArea.scrollbar, sx]"
  >
    <ScrollArea.Thumb data-slot="scroll-area-thumb" :sx="scrollArea.thumb" />
  </ScrollArea.Scrollbar>
</template>
