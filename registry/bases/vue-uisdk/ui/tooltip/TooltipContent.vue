<script setup lang="ts">
import { TooltipContent, TooltipArrow } from "@ui-sdk/vue/tooltip"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart, sideOf } from "../../../../lib/vue/uisdk-slot"
import { tooltip } from "../../../../styles/tooltip.styles"
import { popupMotion } from "../../../../styles/overlay.styles"

defineOptions({ inheritAttrs: false })

// Base UI's placement, on the content, which places itself (no positioner: the positioner's
// styles join the content's).
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
const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="TooltipContent"
    name="tooltip-content"
    tag="div"
    :side="sideOf(side)"
    :side-offset="sideOffset"
    :align="align"
    :align-offset="alignOffset"
    v-bind="attrs"
    :sx="[tooltip.positioner, popupMotion, tooltip.content, sx]"
  >
    <slot />
    <TooltipArrow :sx="tooltip.arrow" />
  </UisdkPart>
</template>
