<script setup lang="ts">
import { MenuSeparator } from "@ui-sdk/vue/menu"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { menuSeparator } from "../../../../styles/menu.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="MenuSeparator"
    slot-name="context-menu-separator"
    tag="div"
    v-bind="attrs"
    :sx="[menuSeparator, sx]"
  >
    <slot />
  </UisdkPart>
</template>
