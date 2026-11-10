<script setup lang="ts">
import { HoverCardContent, HoverCardPortal, useDirection } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"
import { computed } from "vue"

import { physicalSide } from "../../../../lib/placement"
import { popupMotion } from "../../../../styles/overlay.styles"
import { hoverCard } from "../../../../styles/hover-card.styles"

defineOptions({ inheritAttrs: false })

// Base UI's placement, passed to Reka's content, whose sides are physical.
const {
  side = "bottom",
  sideOffset = 4,
  align = "center",
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
  <HoverCardPortal>
    <HoverCardContent
      data-slot="hover-card-content"
      :side="physical"
      :side-offset="sideOffset"
      :align="align"
      :align-offset="alignOffset"
      v-bind="attrs"
      :sx="[popupMotion, hoverCard.content, sx]"
    >
      <slot />
    </HoverCardContent>
  </HoverCardPortal>
</template>
