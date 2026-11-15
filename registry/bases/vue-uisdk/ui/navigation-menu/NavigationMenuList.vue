<script setup lang="ts">
import { NavigationMenuList } from "@ui-sdk/vue/navigation-menu"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { navigationMenu } from "../../../../styles/navigation-menu.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="NavigationMenuList"
    name="navigation-menu-list"
    tag="ul"
    v-bind="attrs"
    :sx="[navigationMenu.list, sx]"
  >
    <slot />
  </UisdkPart>
</template>
