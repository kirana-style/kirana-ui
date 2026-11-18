<script setup lang="ts">
import { Combobox } from "@kirana-ui/vue/combobox"
import type { Side } from "@kirana-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import { combobox } from "../../../../styles/combobox.styles"
import { menuPositioner, menuSurface } from "../../../../styles/menu.styles"
import { popupMotion } from "../../../../styles/overlay.styles"

defineOptions({ inheritAttrs: false })

/** The popup, placed against Base UI's `anchor` when it is given one. */
const {
  side = "bottom",
  sideOffset = 6,
  align = "start",
  alignOffset = 0,
  anchor,
} = defineProps<{
  side?: Side
  sideOffset?: number
  align?: "start" | "center" | "end"
  alignOffset?: number
  anchor?: any
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <Combobox.Portal>
    <Combobox.Positioner
      :side="side"
      :side-offset="sideOffset"
      :align="align"
      :align-offset="alignOffset"
      :anchor="anchor"
      :sx="menuPositioner"
    >
      <Combobox.Popup
        data-slot="combobox-content"
        :data-chips="String(!!anchor)"
        v-bind="attrs"
        :sx="[popupMotion, menuSurface, combobox.content, sx]"
      >
        <slot />
      </Combobox.Popup>
    </Combobox.Positioner>
  </Combobox.Portal>
</template>
