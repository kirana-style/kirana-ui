<script setup lang="ts">
import { NavigationMenuLink } from "@ark-ui/vue/navigation-menu"
import { useSx } from "@kirana-style/core/vue"

import { navigationMenu } from "../../../../styles/navigation-menu.styles"

defineOptions({ inheritAttrs: false })

const { asChild = false, active = false } = defineProps<{
  asChild?: boolean
  /** Base UI's: the current page's link. */
  active?: boolean
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <NavigationMenuLink
    data-slot="navigation-menu-link"
    :current="active"
    :as-child="asChild"
    v-bind="attrs"
    :sx="[navigationMenu.link, sx]"
  >
    <slot />
  </NavigationMenuLink>
</template>
