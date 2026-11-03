<script setup lang="ts">
import { ComboboxClearTrigger } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { InputGroupButton } from "../input-group"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <ComboboxClearTrigger data-slot="combobox-clear" v-bind="attrs" as-child>
    <InputGroupButton variant="ghost" size="icon-xs" :sx="sx">
      <IconPlaceholder
        lucide="XIcon"
        tabler="IconX"
        hugeicons="Cancel01Icon"
        phosphor="XIcon"
        remixicon="RiCloseLine"
      />
    </InputGroupButton>
  </ComboboxClearTrigger>
</template>
