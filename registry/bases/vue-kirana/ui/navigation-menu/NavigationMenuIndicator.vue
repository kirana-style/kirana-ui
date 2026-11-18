<script setup lang="ts">
import { NavigationMenu } from "@kirana-ui/vue/navigation-menu"
import { useSx } from "@kirana-style/core/vue"

import { navigationMenu } from "../../../../styles/navigation-menu.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <NavigationMenu.Icon
    data-slot="navigation-menu-indicator"
    v-bind="attrs"
    :sx="[navigationMenu.indicator, sx]"
  >
    <div :sx="navigationMenu.arrow" />
  </NavigationMenu.Icon>
</template>
