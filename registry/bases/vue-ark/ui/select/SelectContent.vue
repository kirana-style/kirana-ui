<script setup lang="ts">
import { SelectContent, SelectList, SelectPositioner } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import { menuPositioner, menuSurface } from "../../../../styles/menu.styles"
import { popupMotion } from "../../../../styles/overlay.styles"
import { select } from "../../../../styles/select.styles"

defineOptions({ inheritAttrs: false })

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
