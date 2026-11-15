<script setup lang="ts">
import { PopoverContent } from "@ui-sdk/vue/popover"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart, sideOf } from "../../../../lib/vue/uisdk-slot"
import { popover } from "../../../../styles/popover.styles"
import { popupMotion } from "../../../../styles/overlay.styles"

defineOptions({ inheritAttrs: false })

// Base UI's placement, on the content, which places itself (no positioner: the positioner's
// styles join the content's).
const {
  side = "bottom",
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
    :part="PopoverContent"
    name="popover-content"
    tag="div"
    :side="sideOf(side)"
    :side-offset="sideOffset"
    :align="align"
    :align-offset="alignOffset"
    v-bind="attrs"
    :sx="[popover.positioner, popupMotion, popover.content, sx]"
  >
    <slot />
  </UisdkPart>
</template>
