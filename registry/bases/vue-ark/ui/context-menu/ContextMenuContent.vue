<script setup lang="ts">
import { MenuContent, MenuPositioner } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"
import { inject, watchEffect } from "vue"

import { contextMenu } from "../../../../styles/context-menu.styles"
import { menuPositioner, menuSurface } from "../../../../styles/menu.styles"
import { popupMotion } from "../../../../styles/overlay.styles"
import { PLACEMENT } from "./placement"

defineOptions({ inheritAttrs: false })

// Base UI's placement, which the root places the popup with.
const {
  side = "right",
  sideOffset = 0,
  align = "start",
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
    <MenuPositioner :sx="menuPositioner">
      <MenuContent
        data-slot="context-menu-content"
        v-bind="attrs"
        :sx="[popupMotion, menuSurface, contextMenu.content, sx]"
      >
        <slot />
      </MenuContent>
    </MenuPositioner>
  </Teleport>
</template>
