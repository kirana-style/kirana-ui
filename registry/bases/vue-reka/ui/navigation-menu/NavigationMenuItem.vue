<script setup lang="ts">
import { NavigationMenuItem } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"

import { navigationMenu } from "../../../../styles/navigation-menu.styles"

defineOptions({ inheritAttrs: false })

// Base UI's `value` is optional, as Reka's is.
const { sx, attrs } = useSx()
</script>

<template>
  <NavigationMenuItem
    data-slot="navigation-menu-item"
    v-bind="attrs"
    :sx="[navigationMenu.item, sx]"
  >
    <slot />
  </NavigationMenuItem>
</template>
