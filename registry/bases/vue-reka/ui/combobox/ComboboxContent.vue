<script setup lang="ts">
import { ComboboxContent, ComboboxPortal, useDirection } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"
import { computed, provide } from "vue"

import { physicalSide } from "../../../../lib/placement"
import { combobox } from "../../../../styles/combobox.styles"
import { menuSurface } from "../../../../styles/menu.styles"
import { popupMotion } from "../../../../styles/overlay.styles"
import { IN_CONTENT, useCombobox } from "./context"

defineOptions({ inheritAttrs: false })

// Base UI's placement, passed to Reka's content, whose sides are physical.
const {
  side = "bottom",
  sideOffset = 6,
  align = "start",
  alignOffset = 0,
} = defineProps<{
  side?: "top" | "right" | "bottom" | "left" | "inline-start" | "inline-end"
  sideOffset?: number
  align?: "start" | "center" | "end"
  alignOffset?: number
  /** Base UI's anchor; Reka's popup is anchored to the chips themselves (`ComboboxChips`). */
  anchor?: unknown
}>()
const { sx, attrs } = useSx()
const { chips } = useCombobox()
provide(IN_CONTENT, true)
const direction = useDirection()
const physical = computed(() => physicalSide(side, direction.value === "rtl"))
</script>

<template>
  <!-- Reka marks an empty popup `data-empty`, as Base UI's, which the empty part reads. -->
  <ComboboxPortal>
    <ComboboxContent
      data-slot="combobox-content"
      position="popper"
      :side="physical"
      :side-offset="sideOffset"
      :align="align"
      :align-offset="alignOffset"
      :data-chips="String(chips)"
      v-bind="attrs"
      :sx="[
        popupMotion,
        menuSurface,
        combobox.content,
        combobox.contentReka,
        sx,
      ]"
    >
      <slot />
    </ComboboxContent>
  </ComboboxPortal>
</template>
