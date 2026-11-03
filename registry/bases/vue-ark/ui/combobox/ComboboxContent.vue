<script setup lang="ts">
import { ComboboxContent, ComboboxPositioner } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"
import { watchEffect } from "vue"

import { combobox } from "../../../../styles/combobox.styles"
import { menuPositioner, menuSurface } from "../../../../styles/menu.styles"
import { popupMotion } from "../../../../styles/overlay.styles"
import { useCombobox } from "./context"

defineOptions({ inheritAttrs: false })

// Base UI's placement, which the root places the popup with.
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
  /** Base UI's anchor; Ark's popup is anchored to the chips themselves (`ComboboxChips`). */
  anchor?: unknown
}>()
const { sx, attrs } = useSx()
const { placement, chips } = useCombobox()
watchEffect(() => {
  placement.value = { side, sideOffset, align, alignOffset }
})
</script>

<template>
  <Teleport to="body">
    <ComboboxPositioner :sx="menuPositioner">
      <ComboboxContent
        data-slot="combobox-content"
        :data-chips="String(chips)"
        v-bind="attrs"
        :sx="[
          popupMotion,
          menuSurface,
          combobox.content,
          combobox.contentArk,
          sx,
        ]"
      >
        <slot />
      </ComboboxContent>
    </ComboboxPositioner>
  </Teleport>
</template>
