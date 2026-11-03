<script setup lang="ts">
import {
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  useScrollAreaContext,
} from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import { scrollArea } from "../../../../styles/scroll-area.styles"

defineOptions({ inheritAttrs: false })

const { orientation = "vertical" } = defineProps<{
  orientation?: "vertical" | "horizontal"
}>()
const { sx, attrs } = useSx()
const context = useScrollAreaContext()
</script>

<template>
  <!-- Only while there is something to scroll that way, as Base UI's scrollbar. -->
  <ScrollAreaScrollbar
    v-if="
      orientation === 'vertical' ? context.hasOverflowY : context.hasOverflowX
    "
    data-slot="scroll-area-scrollbar"
    :orientation="orientation"
    v-bind="attrs"
    :sx="[scrollArea.scrollbar, sx]"
  >
    <ScrollAreaThumb data-slot="scroll-area-thumb" :sx="scrollArea.thumb" />
  </ScrollAreaScrollbar>
</template>
