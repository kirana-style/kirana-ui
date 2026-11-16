<script setup lang="ts">
import { NavigationMenuIndicator } from "@ui-sdk/vue/navigation-menu"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { navigationMenu } from "../../../../styles/navigation-menu.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <!-- The arrow under the open trigger: ui-sdk's indicator, which follows it. -->
  <UisdkPart
    :part="NavigationMenuIndicator"
    slot-name="navigation-menu-indicator"
    tag="span"
    v-bind="attrs"
    :sx="[navigationMenu.indicator, sx]"
  >
    <div :sx="navigationMenu.arrow" />
  </UisdkPart>
</template>
