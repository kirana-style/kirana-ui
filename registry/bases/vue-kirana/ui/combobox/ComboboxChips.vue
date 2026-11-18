<script setup lang="ts">
import { Combobox } from "@kirana-ui/vue/combobox"
import { useSx } from "@kirana-style/core/vue"

import { combobox } from "../../../../styles/combobox.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <Combobox.Chips
    data-slot="combobox-chips"
    v-bind="attrs"
    :sx="[combobox.chips, sx]"
  >
    <slot />
  </Combobox.Chips>
</template>
