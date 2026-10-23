<script setup lang="ts">
import { MenuItemGroupLabel } from "@ark-ui/vue"

import { useStyleAttrs } from "../../../../lib/vue"
import { menuLabel, menuLabelWeight } from "../../../../styles/menu.styles"

defineOptions({ inheritAttrs: false })

const { inset = false } = defineProps<{ inset?: boolean }>()
const bound = useStyleAttrs(() => [menuLabel, menuLabelWeight])
</script>

<template>
  <MenuItemGroupLabel
    data-slot="dropdown-menu-label"
    :data-inset="inset || undefined"
    v-bind="bound"
  >
    <slot />
  </MenuItemGroupLabel>
</template>
