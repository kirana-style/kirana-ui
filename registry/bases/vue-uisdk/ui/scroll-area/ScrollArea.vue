<script setup lang="ts">
import {
  ScrollArea,
  ScrollAreaCorner,
  ScrollAreaViewport,
} from "@ui-sdk/vue/scroll-area"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { scrollArea } from "../../../../styles/scroll-area.styles"

import ScrollBar from "./ScrollBar.vue"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="ScrollArea"
    slot-name="scroll-area"
    tag="div"
    v-bind="attrs"
    :sx="[scrollArea.root, sx]"
  >
    <UisdkPart
      :part="ScrollAreaViewport"
      slot-name="scroll-area-viewport"
      tag="div"
      :sx="scrollArea.viewport"
    >
      <slot />
    </UisdkPart>
    <ScrollBar />
    <ScrollAreaCorner />
  </UisdkPart>
</template>
