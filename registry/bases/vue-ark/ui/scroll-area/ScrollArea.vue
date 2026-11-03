<script setup lang="ts">
import {
  ScrollAreaContent,
  ScrollAreaCorner,
  ScrollAreaRoot,
  ScrollAreaViewport,
} from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import { scrollArea } from "../../../../styles/scroll-area.styles"
import ScrollBar from "./ScrollBar.vue"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <ScrollAreaRoot
    data-slot="scroll-area"
    v-bind="attrs"
    :sx="[scrollArea.root, sx]"
  >
    <ScrollAreaViewport
      data-slot="scroll-area-viewport"
      :sx="scrollArea.viewport"
    >
      <ScrollAreaContent>
        <slot />
      </ScrollAreaContent>
    </ScrollAreaViewport>
    <ScrollBar />
    <ScrollAreaCorner />
  </ScrollAreaRoot>
</template>
