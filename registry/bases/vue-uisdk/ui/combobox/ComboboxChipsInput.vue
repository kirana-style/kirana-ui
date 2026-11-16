<script setup lang="ts">
import { ComboboxInput } from "@ui-sdk/vue/combobox"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { combobox } from "../../../../styles/combobox.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="ComboboxInput"
    slot-name="combobox-chip-input"
    tag="input"
    v-bind="attrs"
    :sx="[combobox.chipInput, sx]"
  ></UisdkPart>
</template>
