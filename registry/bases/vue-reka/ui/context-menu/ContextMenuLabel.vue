<script setup lang="ts">
import { ContextMenuLabel } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"

import { menuLabel, menuLabelWeight } from "../../../../styles/menu.styles"

defineOptions({ inheritAttrs: false })

const { inset = false } = defineProps<{ inset?: boolean }>()
const { sx, attrs } = useSx()
</script>

<template>
  <ContextMenuLabel
    data-slot="context-menu-label"
    :data-inset="inset || undefined"
    v-bind="attrs"
    :sx="[menuLabel, menuLabelWeight, sx]"
  >
    <slot />
  </ContextMenuLabel>
</template>
