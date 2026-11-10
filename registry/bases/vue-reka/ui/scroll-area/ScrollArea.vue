<script setup lang="ts">
import { ScrollAreaCorner, ScrollAreaRoot, ScrollAreaViewport } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"

import { scrollArea } from "../../../../styles/scroll-area.styles"
import ScrollBar from "./ScrollBar.vue"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <!-- `type="auto"`: a scrollbar while there is something to scroll that way, as Base UI's. -->
  <ScrollAreaRoot
    data-slot="scroll-area"
    type="auto"
    v-bind="attrs"
    :sx="[scrollArea.root, sx]"
  >
    <ScrollAreaViewport
      data-slot="scroll-area-viewport"
      :sx="scrollArea.viewport"
    >
      <slot />
    </ScrollAreaViewport>
    <ScrollBar />
    <ScrollAreaCorner />
  </ScrollAreaRoot>
</template>
