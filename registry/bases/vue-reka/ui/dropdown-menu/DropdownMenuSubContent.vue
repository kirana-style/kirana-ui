<script setup lang="ts">
import { DropdownMenuPortal, DropdownMenuSubContent } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"

import { dropdownMenu } from "../../../../styles/dropdown-menu.styles"
import { menuSurface } from "../../../../styles/menu.styles"
import { popupMotion } from "../../../../styles/overlay.styles"

defineOptions({ inheritAttrs: false })

// Base UI's placement. Reka opens a submenu at the inline end, aligned to its start, whatever the
// `side` and `align` (Base UI's defaults): only the offsets reach it.
const { sideOffset = 0, alignOffset = -3 } = defineProps<{
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
  <DropdownMenuPortal>
    <DropdownMenuSubContent
      data-slot="dropdown-menu-sub-content"
      :side-offset="sideOffset"
      :align-offset="alignOffset"
      v-bind="attrs"
      :sx="[popupMotion, menuSurface, dropdownMenu.subContent, sx]"
    >
      <slot />
    </DropdownMenuSubContent>
  </DropdownMenuPortal>
</template>
