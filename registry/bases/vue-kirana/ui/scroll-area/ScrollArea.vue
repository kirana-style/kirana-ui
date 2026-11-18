<script setup lang="ts">
import { ScrollArea } from "@kirana-ui/vue/scroll-area"
import { useSx } from "@kirana-style/core/vue"

import { scrollArea } from "../../../../styles/scroll-area.styles"
import ScrollBar from "./ScrollBar.vue"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <ScrollArea.Root
    data-slot="scroll-area"
    v-bind="attrs"
    :sx="[scrollArea.root, sx]"
  >
    <ScrollArea.Viewport
      data-slot="scroll-area-viewport"
      :sx="scrollArea.viewport"
    >
      <slot />
    </ScrollArea.Viewport>
    <ScrollBar />
    <ScrollArea.Corner />
  </ScrollArea.Root>
</template>
