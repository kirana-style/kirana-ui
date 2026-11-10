<script setup lang="ts">
import { NavigationMenuList } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"

import { navigationMenu } from "../../../../styles/navigation-menu.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <!-- Reka wraps the list in a `div` of its own, for its indicator; the list is the `ul` inside. -->
  <NavigationMenuList
    data-slot="navigation-menu-list"
    v-bind="attrs"
    :sx="[navigationMenu.list, sx]"
  >
    <slot />
  </NavigationMenuList>
</template>
