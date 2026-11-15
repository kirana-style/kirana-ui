<script setup lang="ts">
import { MenuSubContent } from "@ui-sdk/vue/menu"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart, sideOf } from "../../../../lib/vue/uisdk-slot"
import { menuPositioner, menuSurface } from "../../../../styles/menu.styles"
import { dropdownMenu } from "../../../../styles/dropdown-menu.styles"
import { popupMotion } from "../../../../styles/overlay.styles"

defineOptions({ inheritAttrs: false })

// Base UI's placement, on the content, which places itself (no positioner: the positioner's
// styles join the content's).
const {
  side = "inline-end",
  sideOffset = 0,
  align = "start",
  alignOffset = -3,
} = defineProps<{
  // Declared here, not imported: Vue resolves an imported props type through TypeScript's
  // JavaScript API, which TypeScript 7 does not have.
  side?: "top" | "right" | "bottom" | "left" | "inline-start" | "inline-end"
  sideOffset?: number
  align?: "start" | "center" | "end"
  alignOffset?: number
}>()

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="MenuSubContent"
    name="dropdown-menu-sub-content"
    tag="div"
    :side="sideOf(side)"
    :side-offset="sideOffset"
    :align="align"
    :align-offset="alignOffset"
    v-bind="attrs"
    :sx="[
      menuPositioner,
      popupMotion,
      menuSurface,
      dropdownMenu.content,
      dropdownMenu.subContent,
      sx,
    ]"
  >
    <slot />
  </UisdkPart>
</template>
