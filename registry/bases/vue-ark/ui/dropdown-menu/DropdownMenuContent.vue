<script setup lang="ts">
import { MenuContent, MenuPositioner } from "@ark-ui/vue"

import { useStyleAttrs } from "../../../../lib/vue"
import { dropdownMenu } from "../../../../styles/dropdown-menu.styles"
import { menuPositioner, menuSurface } from "../../../../styles/menu.styles"
import { popupMotion } from "../../../../styles/overlay.styles"

defineOptions({ inheritAttrs: false })

const bound = useStyleAttrs(() => [
  popupMotion,
  menuSurface,
  dropdownMenu.content,
])
</script>

<template>
  <Teleport to="body">
    <MenuPositioner :sx="menuPositioner">
      <MenuContent data-slot="dropdown-menu-content" v-bind="bound">
        <slot />
      </MenuContent>
    </MenuPositioner>
  </Teleport>
</template>
