<script setup lang="ts">
import { NavigationMenuLink } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"

import { navigationMenu } from "../../../../styles/navigation-menu.styles"

defineOptions({ inheritAttrs: false })

// `active`, Base UI's and Reka's: the current page's link.
const { sx, attrs } = useSx()
</script>

<template>
  <NavigationMenuLink
    data-slot="navigation-menu-link"
    v-bind="attrs"
    :sx="[navigationMenu.link, sx]"
  >
    <slot />
  </NavigationMenuLink>
</template>
