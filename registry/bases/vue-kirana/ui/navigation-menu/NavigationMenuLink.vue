<script setup lang="ts">
import { NavigationMenu } from "@kirana-ui/vue/navigation-menu"
import { useSx } from "@kirana-style/core/vue"

import { navigationMenu } from "../../../../styles/navigation-menu.styles"

defineOptions({ inheritAttrs: false })

// `active`, Base UI's and Kirana UI's: the current page's link.
const { sx, attrs } = useSx()
</script>

<template>
  <NavigationMenu.Link
    data-slot="navigation-menu-link"
    v-bind="attrs"
    :sx="[navigationMenu.link, sx]"
  >
    <slot />
  </NavigationMenu.Link>
</template>
