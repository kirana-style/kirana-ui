<script setup lang="ts">
import { SelectGroupLabel } from "@ui-sdk/vue/select"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { menuLabel } from "../../../../styles/menu.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="SelectGroupLabel"
    slot-name="select-label"
    tag="div"
    v-bind="attrs"
    :sx="[menuLabel, sx]"
  >
    <slot />
  </UisdkPart>
</template>
