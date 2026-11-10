<script setup lang="ts">
import { ComboboxAnchor } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"
import { onMounted } from "vue"

import { combobox } from "../../../../styles/combobox.styles"
import { useCombobox } from "./context"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
// The chips are Reka's anchor: Base UI's `anchor`.
const { chips } = useCombobox()
onMounted(() => (chips.value = true))
</script>

<template>
  <ComboboxAnchor as-child>
    <div data-slot="combobox-chips" v-bind="attrs" :sx="[combobox.chips, sx]">
      <slot />
    </div>
  </ComboboxAnchor>
</template>
