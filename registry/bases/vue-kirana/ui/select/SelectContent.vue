<script setup lang="ts">
import { Select } from "@kirana-ui/vue/select"
import type { Side } from "@kirana-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import { menuPositioner, menuSurface } from "../../../../styles/menu.styles"
import { popupMotion } from "../../../../styles/overlay.styles"
import { select } from "../../../../styles/select.styles"
import SelectScrollButton from "./SelectScrollButton.vue"

defineOptions({ inheritAttrs: false })

const {
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  alignItemWithTrigger = true,
} = defineProps<{
  side?: Side
  sideOffset?: number
  align?: "start" | "center" | "end"
  alignOffset?: number
  alignItemWithTrigger?: boolean
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <Select.Portal>
    <Select.Positioner
      :side="side"
      :side-offset="sideOffset"
      :align="align"
      :align-offset="alignOffset"
      :align-item-with-trigger="alignItemWithTrigger"
      :sx="menuPositioner"
    >
      <Select.Popup
        data-slot="select-content"
        :data-align-trigger="String(alignItemWithTrigger)"
        v-bind="attrs"
        :sx="[popupMotion, menuSurface, select.content, sx]"
      >
        <SelectScrollButton direction="up" />
        <Select.List>
          <slot />
        </Select.List>
        <SelectScrollButton direction="down" />
      </Select.Popup>
    </Select.Positioner>
  </Select.Portal>
</template>
