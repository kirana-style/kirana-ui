<script setup lang="ts">
import { Tooltip } from "@kirana-ui/vue/tooltip"
import type { Side } from "@kirana-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import { popupMotion } from "../../../../styles/overlay.styles"
import { tooltip } from "../../../../styles/tooltip.styles"

defineOptions({ inheritAttrs: false })

const {
  side = "top",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
} = defineProps<{
  side?: Side
  sideOffset?: number
  align?: "start" | "center" | "end"
  alignOffset?: number
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <Tooltip.Portal>
    <Tooltip.Positioner
      :side="side"
      :side-offset="sideOffset"
      :align="align"
      :align-offset="alignOffset"
      :sx="tooltip.positioner"
    >
      <Tooltip.Popup
        data-slot="tooltip-content"
        v-bind="attrs"
        :sx="[popupMotion, tooltip.content, sx]"
      >
        <slot />
        <Tooltip.Arrow :sx="tooltip.arrow" />
      </Tooltip.Popup>
    </Tooltip.Positioner>
  </Tooltip.Portal>
</template>
