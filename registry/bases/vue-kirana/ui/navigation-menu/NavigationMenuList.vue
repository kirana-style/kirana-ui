<script setup lang="ts">
import { NavigationMenu } from "@kirana-ui/vue/navigation-menu"
import { useSx } from "@kirana-style/core/vue"

import { navigationMenu } from "../../../../styles/navigation-menu.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <NavigationMenu.List
    data-slot="navigation-menu-list"
    v-bind="attrs"
    :sx="[navigationMenu.list, sx]"
  >
    <slot />
  </NavigationMenu.List>
</template>
