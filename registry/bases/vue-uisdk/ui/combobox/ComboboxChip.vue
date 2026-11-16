<script setup lang="ts">
import { ComboboxChip, ComboboxChipRemove } from "@ui-sdk/vue/combobox"
import { useSx } from "@kirana-style/core/vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { combobox } from "../../../../styles/combobox.styles"
import { Button } from "../button"

defineOptions({ inheritAttrs: false })

const { showRemove = true, value } = defineProps<{
  showRemove?: boolean
  /** The chip's item, which its remove button takes out of the selection. */
  value?: unknown
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="ComboboxChip"
    slot-name="combobox-chip"
    tag="div"
    :value="value"
    v-bind="attrs"
    :sx="[combobox.chip, sx]"
  >
    <slot />
    <UisdkPart
      v-if="showRemove"
      :part="ComboboxChipRemove"
      slot-name="combobox-chip-remove"
      tag="button"
      as-child
    >
      <Button variant="ghost" size="icon-xs" :sx="combobox.chipRemove">
        <IconPlaceholder
          lucide="XIcon"
          tabler="IconX"
          hugeicons="Cancel01Icon"
          phosphor="XIcon"
          remixicon="RiCloseLine"
        />
      </Button>
    </UisdkPart>
  </UisdkPart>
</template>
