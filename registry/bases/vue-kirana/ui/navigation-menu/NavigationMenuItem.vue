<script setup lang="ts">
import { NavigationMenu } from "@kirana-ui/vue/navigation-menu"
import { useSx } from "@kirana-style/core/vue"

import { navigationMenu } from "../../../../styles/navigation-menu.styles"

defineOptions({ inheritAttrs: false })

// Base UI's `value` is optional, as Kirana UI's is.
const { sx, attrs } = useSx()
</script>

<template>
  <NavigationMenu.Item
    data-slot="navigation-menu-item"
    v-bind="attrs"
    :sx="[navigationMenu.item, sx]"
  >
    <slot />
  </NavigationMenu.Item>
</template>
