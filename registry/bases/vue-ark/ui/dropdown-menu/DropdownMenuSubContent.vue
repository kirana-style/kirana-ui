<script setup lang="ts">
import { MenuContent, MenuPositioner } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import { dropdownMenu } from "../../../../styles/dropdown-menu.styles"
import { menuPositioner, menuSurface } from "../../../../styles/menu.styles"
import { popupMotion } from "../../../../styles/overlay.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <Teleport to="body">
    <MenuPositioner :sx="menuPositioner">
      <MenuContent
        data-slot="dropdown-menu-sub-content"
        v-bind="attrs"
        :sx="[popupMotion, menuSurface, dropdownMenu.subContent, sx]"
      >
        <slot />
      </MenuContent>
    </MenuPositioner>
  </Teleport>
</template>
