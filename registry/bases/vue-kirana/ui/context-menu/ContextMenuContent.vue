<script setup lang="ts">
import { ContextMenu } from "@kirana-ui/vue/context-menu"
import type { Side } from "@kirana-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import { contextMenu } from "../../../../styles/context-menu.styles"
import { menuPositioner, menuSurface } from "../../../../styles/menu.styles"
import { popupMotion } from "../../../../styles/overlay.styles"

defineOptions({ inheritAttrs: false })

const {
  side = "right",
  sideOffset = 0,
  align = "start",
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
  <ContextMenu.Portal>
    <ContextMenu.Positioner
      :side="side"
      :side-offset="sideOffset"
      :align="align"
      :align-offset="alignOffset"
      :sx="menuPositioner"
    >
      <ContextMenu.Popup
        data-slot="context-menu-content"
        v-bind="attrs"
        :sx="[popupMotion, menuSurface, contextMenu.content, sx]"
      >
        <slot />
      </ContextMenu.Popup>
    </ContextMenu.Positioner>
  </ContextMenu.Portal>
</template>
