<script setup lang="ts">
import { ComboboxInput } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"

import { combobox } from "../../../../styles/combobox.styles"
import { followTypedQuery } from "./context"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
followTypedQuery()
</script>

<template>
  <ComboboxInput
    data-slot="combobox-chip-input"
    v-bind="attrs"
    :sx="[combobox.chipInput, sx]"
  />
</template>
