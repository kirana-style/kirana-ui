<script setup lang="ts">
import { ContextMenuContent, ContextMenuPortal, useDirection } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"
import { computed } from "vue"

import { physicalSide } from "../../../../lib/placement"
import { contextMenu } from "../../../../styles/context-menu.styles"
import { menuSurface } from "../../../../styles/menu.styles"
import { popupMotion } from "../../../../styles/overlay.styles"

defineOptions({ inheritAttrs: false })

// Base UI's placement against the pointer. Reka's content declares only `align-offset` and sets its
// own side, gap and alignment, which these, passed as attributes, override.
const {
  side = "right",
  sideOffset = 0,
  align = "start",
  alignOffset = 4,
} = defineProps<{
  // Declared here, not imported: Vue resolves an imported props type through TypeScript's
  // JavaScript API, which TypeScript 7 does not have.
  side?: "top" | "right" | "bottom" | "left" | "inline-start" | "inline-end"
  sideOffset?: number
  align?: "start" | "center" | "end"
  alignOffset?: number
}>()
const direction = useDirection()
const physical = computed(() => physicalSide(side, direction.value === "rtl"))
const { sx, attrs } = useSx()
</script>

<template>
  <ContextMenuPortal>
    <ContextMenuContent
      data-slot="context-menu-content"
      v-bind="{ side: physical, sideOffset, align, ...attrs }"
      :align-offset="alignOffset"
      :sx="[popupMotion, menuSurface, contextMenu.content, sx]"
    >
      <slot />
    </ContextMenuContent>
  </ContextMenuPortal>
</template>
