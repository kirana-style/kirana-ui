<script setup lang="ts">
import {
  SelectContent,
  SelectPortal,
  SelectViewport,
  useDirection,
} from "reka-ui"
import { useSx } from "@kirana-style/core/vue"
import { computed } from "vue"

import { physicalSide } from "../../../../lib/placement"
import { menuSurface } from "../../../../styles/menu.styles"
import { popupMotion } from "../../../../styles/overlay.styles"
import { select } from "../../../../styles/select.styles"
import SelectScrollButton from "./SelectScrollButton.vue"

defineOptions({ inheritAttrs: false })

// Base UI's placement. `alignItemWithTrigger`, Base UI's default, lays the popup over its trigger
// with the chosen item level with it: Reka's `item-aligned`, which opens in place, without motion
// (`data-align-trigger`). Without it the popup opens beside the trigger, Reka's `popper`.
const {
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  alignItemWithTrigger = true,
} = defineProps<{
  // Declared here, not imported: Vue resolves an imported props type through TypeScript's
  // JavaScript API, which TypeScript 7 does not have.
  side?: "top" | "right" | "bottom" | "left" | "inline-start" | "inline-end"
  sideOffset?: number
  align?: "start" | "center" | "end"
  alignOffset?: number
  alignItemWithTrigger?: boolean
}>()
const direction = useDirection()
const physical = computed(() => physicalSide(side, direction.value === "rtl"))
const { sx, attrs } = useSx()
</script>

<template>
  <SelectPortal>
    <SelectContent
      v-if="alignItemWithTrigger"
      data-slot="select-content"
      position="item-aligned"
      data-align-trigger="true"
      v-bind="attrs"
      :sx="[popupMotion, menuSurface, select.content, sx]"
    >
      <SelectScrollButton direction="up" />
      <!-- Reka focuses an item, the viewport only scrolls: it draws no focus ring of its own. -->
      <SelectViewport :sx="select.list">
        <slot />
      </SelectViewport>
      <SelectScrollButton direction="down" />
    </SelectContent>
    <SelectContent
      v-else
      data-slot="select-content"
      position="popper"
      data-align-trigger="false"
      :side="physical"
      :side-offset="sideOffset"
      :align="align"
      :align-offset="alignOffset"
      v-bind="attrs"
      :sx="[popupMotion, menuSurface, select.content, sx]"
    >
      <SelectScrollButton direction="up" />
      <SelectViewport :sx="select.list">
        <slot />
      </SelectViewport>
      <SelectScrollButton direction="down" />
    </SelectContent>
  </SelectPortal>
</template>
