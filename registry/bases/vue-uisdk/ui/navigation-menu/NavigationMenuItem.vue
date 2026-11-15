<script setup lang="ts">
import { NavigationMenuItem } from "@ui-sdk/vue/navigation-menu"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { navigationMenu } from "../../../../styles/navigation-menu.styles"

defineOptions({ inheritAttrs: false })

const { value } = defineProps<{ value?: string }>()

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="NavigationMenuItem"
    name="navigation-menu-item"
    tag="li"
    :value="value"
    v-bind="attrs"
    :sx="[navigationMenu.item, sx]"
  >
    <slot />
  </UisdkPart>
</template>
