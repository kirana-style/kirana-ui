<script setup lang="ts">
import { ComboboxLabel } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"

import { combobox } from "../../../../styles/combobox.styles"
import { menuLabel } from "../../../../styles/menu.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <ComboboxLabel
    data-slot="combobox-label"
    v-bind="attrs"
    :sx="[menuLabel, combobox.label, sx]"
  >
    <slot />
  </ComboboxLabel>
</template>
