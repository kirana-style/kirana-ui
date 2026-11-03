<script setup lang="ts">
import { SelectContent, SelectList, SelectPositioner } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"
import { inject, watchEffect } from "vue"

import { menuPositioner, menuSurface } from "../../../../styles/menu.styles"
import { popupMotion } from "../../../../styles/overlay.styles"
import { select } from "../../../../styles/select.styles"
import { PLACEMENT } from "./placement"

defineOptions({ inheritAttrs: false })

// Base UI's placement, which the root places the popup with. `alignItemWithTrigger`, Base UI's
// popup laid over its trigger with the chosen item level with it, has no counterpart in Ark: the
// popup always opens beside the trigger.
const {
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
} = defineProps<{
  // Declared here, not imported: Vue resolves an imported props type through TypeScript's
  // JavaScript API, which TypeScript 7 does not have.
  side?: "top" | "right" | "bottom" | "left" | "inline-start" | "inline-end"
  sideOffset?: number
  align?: "start" | "center" | "end"
  alignOffset?: number
  alignItemWithTrigger?: boolean
}>()
const placement = inject(PLACEMENT, undefined)
watchEffect(() => {
  if (placement) placement.value = { side, sideOffset, align, alignOffset }
})
const { sx, attrs } = useSx()
</script>

<template>
  <Teleport to="body">
    <SelectPositioner :sx="menuPositioner">
      <SelectContent
        data-slot="select-content"
        v-bind="attrs"
        :sx="[popupMotion, menuSurface, select.content, sx]"
      >
        <!-- Ark focuses the list, not an item: it draws no focus ring of its own. -->
        <SelectList :sx="select.list">
          <slot />
        </SelectList>
      </SelectContent>
    </SelectPositioner>
  </Teleport>
</template>
