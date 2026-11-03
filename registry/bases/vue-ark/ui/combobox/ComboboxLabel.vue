<script setup lang="ts">
import { ComboboxItemGroupLabel } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import { combobox } from "../../../../styles/combobox.styles"
import { menuLabel } from "../../../../styles/menu.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <ComboboxItemGroupLabel
    data-slot="combobox-label"
    v-bind="attrs"
    :sx="[menuLabel, combobox.label, sx]"
  >
    <slot />
  </ComboboxItemGroupLabel>
</template>
