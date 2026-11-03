<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { combobox } from "../../../../styles/combobox.styles"
import { Button } from "../button"
import { useCombobox } from "./context"

defineOptions({ inheritAttrs: false })

const { showRemove = true, value } = defineProps<{
  showRemove?: boolean
  /** The chip's item, which its remove button takes out of the selection. */
  value?: unknown
}>()
const { sx, attrs } = useSx()
const { remove } = useCombobox()
</script>

<template>
  <div data-slot="combobox-chip" v-bind="attrs" :sx="[combobox.chip, sx]">
    <slot />
    <Button
      v-if="showRemove"
      data-slot="combobox-chip-remove"
      variant="ghost"
      size="icon-xs"
      tabindex="-1"
      :sx="combobox.chipRemove"
      @click="remove(value)"
    >
      <IconPlaceholder
        lucide="XIcon"
        tabler="IconX"
        hugeicons="Cancel01Icon"
        phosphor="XIcon"
        remixicon="RiCloseLine"
      />
    </Button>
  </div>
</template>
