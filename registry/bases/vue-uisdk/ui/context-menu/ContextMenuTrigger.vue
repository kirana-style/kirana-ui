<script setup lang="ts">
import { MenuContextTrigger } from "@ui-sdk/vue/menu"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { contextMenu } from "../../../../styles/context-menu.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <!-- A div, as Base UI's trigger: a region, not a button. -->
  <UisdkPart
    :part="MenuContextTrigger"
    slot-name="context-menu-trigger"
    tag="div"
    v-bind="attrs"
    :sx="[contextMenu.trigger, sx]"
  >
    <slot />
  </UisdkPart>
</template>
