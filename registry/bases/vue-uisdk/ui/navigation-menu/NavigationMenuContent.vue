<script setup lang="ts">
import { NavigationMenuContent } from "@ui-sdk/vue/navigation-menu"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { navigationMenu } from "../../../../styles/navigation-menu.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="NavigationMenuContent"
    name="navigation-menu-content"
    tag="div"
    v-bind="attrs"
    :sx="[navigationMenu.content, sx]"
  >
    <slot />
  </UisdkPart>
</template>
