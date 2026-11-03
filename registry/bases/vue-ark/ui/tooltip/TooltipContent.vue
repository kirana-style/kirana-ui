<script setup lang="ts">
import {
  TooltipArrow,
  TooltipArrowTip,
  TooltipContent,
  TooltipPositioner,
} from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"
import { inject, watchEffect } from "vue"

import { popupMotion } from "../../../../styles/overlay.styles"
import { tooltip } from "../../../../styles/tooltip.styles"
import { PLACEMENT } from "./placement"

defineOptions({ inheritAttrs: false })

// Base UI's placement, which the root places the popup with.
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
const placement = inject(PLACEMENT, undefined)
watchEffect(() => {
  if (placement) placement.value = { side, sideOffset, align, alignOffset }
})
const { sx, attrs } = useSx()
</script>

<template>
  <Teleport to="body">
    <TooltipPositioner :sx="tooltip.positioner">
      <TooltipContent
        data-slot="tooltip-content"
        v-bind="attrs"
        :sx="[popupMotion, tooltip.content, sx]"
      >
        <slot />
        <TooltipArrow :sx="tooltip.arrowArk">
          <TooltipArrowTip :sx="tooltip.arrowTipArk" />
        </TooltipArrow>
      </TooltipContent>
    </TooltipPositioner>
  </Teleport>
</template>
