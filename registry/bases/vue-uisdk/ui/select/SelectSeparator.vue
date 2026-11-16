<script setup lang="ts">
import { SelectSeparator } from "@ui-sdk/vue/select"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { menuSeparator } from "../../../../styles/menu.styles"
import { select } from "../../../../styles/select.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="SelectSeparator"
    slot-name="select-separator"
    tag="div"
    v-bind="attrs"
    :sx="[menuSeparator, select.separator, sx]"
  >
    <slot />
  </UisdkPart>
</template>
