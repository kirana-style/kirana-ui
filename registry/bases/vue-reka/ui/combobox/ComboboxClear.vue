<script setup lang="ts">
import { ComboboxCancel } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { InputGroupButton } from "../input-group"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <!-- Clears the value too, as Base UI's: the root's `reset-model-value-on-clear`. -->
  <ComboboxCancel data-slot="combobox-clear" v-bind="attrs" as-child>
    <InputGroupButton variant="ghost" size="icon-xs" :sx="sx">
      <IconPlaceholder
        lucide="XIcon"
        tabler="IconX"
        hugeicons="Cancel01Icon"
        phosphor="XIcon"
        remixicon="RiCloseLine"
      />
    </InputGroupButton>
  </ComboboxCancel>
</template>
