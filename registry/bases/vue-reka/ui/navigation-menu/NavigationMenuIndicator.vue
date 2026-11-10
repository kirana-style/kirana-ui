<script setup lang="ts">
import { NavigationMenuIndicator } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"

import { navigationMenu } from "../../../../styles/navigation-menu.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <NavigationMenuIndicator
    data-slot="navigation-menu-indicator"
    v-bind="attrs"
    :sx="[navigationMenu.indicator, sx]"
  >
    <div :sx="navigationMenu.arrow" />
  </NavigationMenuIndicator>
</template>
