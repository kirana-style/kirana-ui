<script setup lang="ts">
import { NavigationMenu } from "@kirana-ui/vue/navigation-menu"
import { useSx } from "@kirana-style/core/vue"

import { navigationMenu } from "../../../../styles/navigation-menu.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <!-- Shown in the menu's viewport, as Base UI's content is. -->
  <NavigationMenu.Content
    data-slot="navigation-menu-content"
    v-bind="attrs"
    :sx="[navigationMenu.content, sx]"
  >
    <slot />
  </NavigationMenu.Content>
</template>
