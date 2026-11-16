<script setup lang="ts">
import { MenuGroupLabel } from "@ui-sdk/vue/menu"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { menuLabel, menuLabelWeight } from "../../../../styles/menu.styles"

defineOptions({ inheritAttrs: false })

const { inset } = defineProps<{ inset?: boolean }>()

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="MenuGroupLabel"
    slot-name="dropdown-menu-label"
    tag="div"
    :data-inset="inset || undefined"
    v-bind="attrs"
    :sx="[menuLabel, menuLabelWeight, sx]"
  >
    <slot />
  </UisdkPart>
</template>
