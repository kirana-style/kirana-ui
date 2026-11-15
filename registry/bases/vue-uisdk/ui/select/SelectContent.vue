<script setup lang="ts">
import { SelectContent } from "@ui-sdk/vue/select"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart, sideOf } from "../../../../lib/vue/uisdk-slot"
import { menuPositioner, menuSurface } from "../../../../styles/menu.styles"
import { popupMotion } from "../../../../styles/overlay.styles"
import { select } from "../../../../styles/select.styles"

defineOptions({ inheritAttrs: false })

/**
 * The list. ui-sdk's content places itself (no positioner: its styles join the content's), and has
 * no Base UI `alignItemWithTrigger`, which opens the list with its chosen item over the trigger:
 * it opens beside the trigger, with the popup's motion (`data-align-trigger="false"`).
 */
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
  alignItemWithTrigger?: boolean
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="SelectContent"
    name="select-content"
    tag="div"
    :data-align-trigger="false"
    :side="sideOf(side)"
    :side-offset="sideOffset"
    :align="align"
    :align-offset="alignOffset"
    v-bind="attrs"
    :sx="[menuPositioner, popupMotion, menuSurface, select.content, sx]"
  >
    <slot />
  </UisdkPart>
</template>
