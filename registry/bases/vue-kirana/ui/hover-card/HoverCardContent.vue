<script setup lang="ts">
import { HoverCard } from "@kirana-ui/vue/hover-card"
import type { Side } from "@kirana-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import { popupMotion } from "../../../../styles/overlay.styles"
import { hoverCard } from "../../../../styles/hover-card.styles"

defineOptions({ inheritAttrs: false })

const {
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 4,
} = defineProps<{
  side?: Side
  sideOffset?: number
  align?: "start" | "center" | "end"
  alignOffset?: number
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <HoverCard.Portal>
    <HoverCard.Positioner
      :side="side"
      :side-offset="sideOffset"
      :align="align"
      :align-offset="alignOffset"
      :sx="hoverCard.positioner"
    >
      <HoverCard.Popup
        data-slot="hover-card-content"
        v-bind="attrs"
        :sx="[popupMotion, hoverCard.content, sx]"
      >
        <slot />
      </HoverCard.Popup>
    </HoverCard.Positioner>
  </HoverCard.Portal>
</template>
