<script setup lang="ts">
import { NavigationMenuContent } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"

import { navigationMenu } from "../../../../styles/navigation-menu.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <!-- Shown in the menu's viewport, which Reka moves it into, as Base UI's content moves. -->
  <NavigationMenuContent
    data-slot="navigation-menu-content"
    v-bind="attrs"
    :sx="[navigationMenu.content, sx]"
  >
    <slot />
  </NavigationMenuContent>
</template>
