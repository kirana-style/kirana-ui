<script setup lang="ts">
import { ScrollAreaScrollbar, ScrollAreaThumb } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"

import { scrollArea } from "../../../../styles/scroll-area.styles"

defineOptions({ inheritAttrs: false })

const { orientation = "vertical" } = defineProps<{
  orientation?: "vertical" | "horizontal"
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <ScrollAreaScrollbar
    data-slot="scroll-area-scrollbar"
    :orientation="orientation"
    v-bind="attrs"
    :sx="[scrollArea.scrollbar, sx]"
  >
    <ScrollAreaThumb data-slot="scroll-area-thumb" :sx="scrollArea.thumb" />
  </ScrollAreaScrollbar>
</template>
