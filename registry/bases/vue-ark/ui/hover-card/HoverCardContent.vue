<script setup lang="ts">
import { HoverCardContent, HoverCardPositioner } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"
import { inject, watchEffect } from "vue"

import { hoverCard } from "../../../../styles/hover-card.styles"
import { popupMotion } from "../../../../styles/overlay.styles"
import { PLACEMENT } from "./placement"

defineOptions({ inheritAttrs: false })

// Base UI's placement, which the root places the popup with.
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
const placement = inject(PLACEMENT, undefined)
watchEffect(() => {
  if (placement) placement.value = { side, sideOffset, align, alignOffset }
})
const { sx, attrs } = useSx()
</script>

<template>
  <Teleport to="body">
    <HoverCardPositioner :sx="hoverCard.positioner">
      <HoverCardContent
        data-slot="hover-card-content"
        v-bind="attrs"
        :sx="[popupMotion, hoverCard.content, sx]"
      >
        <slot />
      </HoverCardContent>
    </HoverCardPositioner>
  </Teleport>
</template>
