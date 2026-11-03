<script setup lang="ts">
import { ComboboxControl } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"
import { onMounted } from "vue"

import { combobox } from "../../../../styles/combobox.styles"
import { useCombobox } from "./context"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
// Ark anchors the popup to its control, which the chips are: Base UI's `anchor`.
const { chips } = useCombobox()
onMounted(() => (chips.value = true))
</script>

<template>
  <ComboboxControl as-child>
    <div data-slot="combobox-chips" v-bind="attrs" :sx="[combobox.chips, sx]">
      <slot />
    </div>
  </ComboboxControl>
</template>
