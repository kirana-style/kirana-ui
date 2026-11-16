<script setup lang="ts">
import { ComboboxGroupLabel } from "@ui-sdk/vue/combobox"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { combobox } from "../../../../styles/combobox.styles"
import { menuLabel } from "../../../../styles/menu.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="ComboboxGroupLabel"
    slot-name="combobox-label"
    tag="div"
    v-bind="attrs"
    :sx="[menuLabel, combobox.label, sx]"
  >
    <slot />
  </UisdkPart>
</template>
