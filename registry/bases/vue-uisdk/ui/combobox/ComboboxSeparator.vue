<script setup lang="ts">
import { ComboboxSeparator } from "@ui-sdk/vue/combobox"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { menuSeparator } from "../../../../styles/menu.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="ComboboxSeparator"
    slot-name="combobox-separator"
    tag="div"
    v-bind="attrs"
    :sx="[menuSeparator, sx]"
  >
    <slot />
  </UisdkPart>
</template>
