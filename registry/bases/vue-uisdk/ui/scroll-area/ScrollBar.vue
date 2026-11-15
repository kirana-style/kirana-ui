<script setup lang="ts">
import { ScrollAreaScrollbar, ScrollAreaThumb } from "@ui-sdk/vue/scroll-area"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { scrollArea } from "../../../../styles/scroll-area.styles"

defineOptions({ inheritAttrs: false })

const { orientation = "vertical" } = defineProps<{
  orientation?: "vertical" | "horizontal"
}>()

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="ScrollAreaScrollbar"
    name="scroll-area-scrollbar"
    tag="div"
    :orientation="orientation"
    :data-orientation="orientation"
    v-bind="attrs"
    :sx="[scrollArea.scrollbar, sx]"
  >
    <UisdkPart
      :part="ScrollAreaThumb"
      name="scroll-area-thumb"
      tag="div"
      :sx="scrollArea.thumb"
    />
  </UisdkPart>
</template>
