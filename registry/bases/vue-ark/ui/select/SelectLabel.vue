<script setup lang="ts">
import { SelectItemGroupLabel } from "@ark-ui/vue"

import { useStyleAttrs } from "../../../../lib/vue"
import { menuLabel } from "../../../../styles/menu.styles"

defineOptions({ inheritAttrs: false })

const bound = useStyleAttrs(() => menuLabel)
</script>

<template>
  <SelectItemGroupLabel data-slot="select-label" v-bind="bound">
    <slot />
  </SelectItemGroupLabel>
</template>
