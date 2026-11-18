<script setup lang="ts">
import { Combobox } from "@kirana-ui/vue/combobox"
import { useSx } from "@kirana-style/core/vue"

import { combobox } from "../../../../styles/combobox.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <Combobox.Input
    data-slot="combobox-chip-input"
    v-bind="attrs"
    :sx="[combobox.chipInput, sx]"
  />
</template>
