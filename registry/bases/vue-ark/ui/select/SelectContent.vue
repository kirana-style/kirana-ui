<script setup lang="ts">
import { SelectContent, SelectList, SelectPositioner } from "@ark-ui/vue"

import { useStyleAttrs } from "../../../../lib/vue"
import { menuPositioner, menuSurface } from "../../../../styles/menu.styles"
import { popupMotion } from "../../../../styles/overlay.styles"
import { select } from "../../../../styles/select.styles"

defineOptions({ inheritAttrs: false })

const bound = useStyleAttrs(() => [popupMotion, menuSurface, select.content])
</script>

<template>
  <Teleport to="body">
    <SelectPositioner :sx="menuPositioner">
      <SelectContent data-slot="select-content" v-bind="bound">
        <!-- Ark focuses the list, not an item: it draws no focus ring of its own. -->
        <SelectList :sx="select.list">
          <slot />
        </SelectList>
      </SelectContent>
    </SelectPositioner>
  </Teleport>
</template>
