<script setup lang="ts">
import { Combobox } from "@kirana-ui/vue/combobox"
import { useSx } from "@kirana-style/core/vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { combobox } from "../../../../styles/combobox.styles"
import {
  menuCheckableRowPadding,
  menuIndicator,
  menuRowBase,
} from "../../../../styles/menu.styles"
import { useCombobox } from "./context"

defineOptions({ inheritAttrs: false })

const { value } = defineProps<{ value: unknown }>()
const { sx, attrs } = useSx()
const { label } = useCombobox()
</script>

<template>
  <Combobox.Item
    data-slot="combobox-item"
    :value="value"
    :label="label(value)"
    v-bind="attrs"
    :sx="[menuRowBase, menuCheckableRowPadding, combobox.item, sx]"
  >
    <slot />
    <Combobox.ItemIndicator :sx="[menuIndicator, combobox.indicator]">
      <IconPlaceholder
        lucide="CheckIcon"
        tabler="IconCheck"
        hugeicons="Tick02Icon"
        phosphor="CheckIcon"
        remixicon="RiCheckLine"
      />
    </Combobox.ItemIndicator>
  </Combobox.Item>
</template>
