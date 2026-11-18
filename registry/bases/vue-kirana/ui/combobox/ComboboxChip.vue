<script setup lang="ts">
import { Combobox } from "@kirana-ui/vue/combobox"
import { useSx } from "@kirana-style/core/vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { combobox } from "../../../../styles/combobox.styles"
import { Button } from "../button"

defineOptions({ inheritAttrs: false })

const { showRemove = true, value } = defineProps<{
  showRemove?: boolean
  value?: unknown
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <!-- A `div`, as Base UI's chip, where Kirana UI's is a `span`. -->
  <Combobox.Chip
    as="div"
    data-slot="combobox-chip"
    :value="value"
    v-bind="attrs"
    :sx="[combobox.chip, sx]"
  >
    <slot />
    <Combobox.ChipRemove
      v-if="showRemove"
      data-slot="combobox-chip-remove"
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
    </Combobox.ChipRemove>
  </Combobox.Chip>
</template>
