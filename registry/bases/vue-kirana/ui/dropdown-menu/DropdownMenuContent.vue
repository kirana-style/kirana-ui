<script setup lang="ts">
import { Menu } from "@kirana-ui/vue/menu"
import type { Side } from "@kirana-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import { dropdownMenu } from "../../../../styles/dropdown-menu.styles"
import { menuPositioner, menuSurface } from "../../../../styles/menu.styles"
import { popupMotion } from "../../../../styles/overlay.styles"

defineOptions({ inheritAttrs: false })

const {
  side = "bottom",
  sideOffset = 4,
  align = "start",
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
  <Menu.Portal>
    <Menu.Positioner
      :side="side"
      :side-offset="sideOffset"
      :align="align"
      :align-offset="alignOffset"
      :sx="menuPositioner"
    >
      <Menu.Popup
        data-slot="dropdown-menu-content"
        v-bind="attrs"
        :sx="[popupMotion, menuSurface, dropdownMenu.content, sx]"
      >
        <slot />
      </Menu.Popup>
    </Menu.Positioner>
  </Menu.Portal>
</template>
