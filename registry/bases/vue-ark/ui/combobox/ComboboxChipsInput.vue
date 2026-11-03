<script setup lang="ts">
import { ComboboxInput } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import { combobox } from "../../../../styles/combobox.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <ComboboxInput
    data-slot="combobox-chip-input"
    v-bind="attrs"
    :sx="[combobox.chipInput, sx]"
  />
</template>
