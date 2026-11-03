<script setup lang="ts">
import { NavigationMenuList } from "@ark-ui/vue/navigation-menu"
import { useSx } from "@kirana-style/core/vue"

import { navigationMenu } from "../../../../styles/navigation-menu.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <!-- Zag writes `position: relative` on the list for its indicator; Base UI's list is static. -->
  <NavigationMenuList as-child :style="{ position: 'static' }">
    <ul
      data-slot="navigation-menu-list"
      v-bind="attrs"
      :sx="[navigationMenu.list, sx]"
    >
      <slot />
    </ul>
  </NavigationMenuList>
</template>
