<script setup lang="ts">
import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  useDirection,
} from "reka-ui"
import { useSx } from "@kirana-style/core/vue"
import { computed } from "vue"

import { physicalSide } from "../../../../lib/placement"
import { popupMotion } from "../../../../styles/overlay.styles"
import { tooltip } from "../../../../styles/tooltip.styles"

defineOptions({ inheritAttrs: false })

/** The arrow's size, which Reka adds to the gap and Base UI measures without. */
const ARROW = 10

// Base UI's placement, passed to Reka's content, whose sides are physical.
const {
  side = "top",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
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
  <TooltipPortal>
    <TooltipContent
      data-slot="tooltip-content"
      :side="physical"
      :side-offset="sideOffset - ARROW"
      :align="align"
      :align-offset="alignOffset"
      v-bind="attrs"
      :sx="[popupMotion, tooltip.content, sx]"
    >
      <slot />
      <!-- Base UI's arrow, a square on its corner: Reka turns its box to face the trigger. -->
      <TooltipArrow as-child :width="ARROW" :height="ARROW">
        <div :sx="tooltip.arrow" />
      </TooltipArrow>
    </TooltipContent>
  </TooltipPortal>
</template>
