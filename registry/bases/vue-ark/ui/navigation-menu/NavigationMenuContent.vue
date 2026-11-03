<script setup lang="ts">
import { NavigationMenuContent } from "@ark-ui/vue/navigation-menu"
import { useSx } from "@kirana-style/core/vue"
import { inject } from "vue"

import { navigationMenu } from "../../../../styles/navigation-menu.styles"
import { VIEWPORT } from "./context"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
const viewport = inject(VIEWPORT, undefined)
</script>

<template>
  <!-- Shown in the menu's viewport, as Base UI's content moves into its own. -->
  <Teleport :to="viewport" :disabled="!viewport" defer>
    <NavigationMenuContent
      data-slot="navigation-menu-content"
      v-bind="attrs"
      :sx="[navigationMenu.content, sx]"
    >
      <slot />
    </NavigationMenuContent>
  </Teleport>
</template>
