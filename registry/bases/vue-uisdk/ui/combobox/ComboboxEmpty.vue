<script setup lang="ts">
import { ComboboxEmpty } from "@ui-sdk/vue/combobox"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { combobox } from "../../../../styles/combobox.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="ComboboxEmpty"
    slot-name="combobox-empty"
    tag="div"
    v-bind="attrs"
    :sx="[combobox.empty, sx]"
  >
    <slot />
  </UisdkPart>
</template>
