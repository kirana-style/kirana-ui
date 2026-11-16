<script setup lang="ts">
import { ComboboxClear } from "@ui-sdk/vue/combobox"
import { useSx } from "@kirana-style/core/vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { InputGroupButton } from "../input-group"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="ComboboxClear"
    slot-name="combobox-clear"
    tag="button"
    as-child
    v-bind="attrs"
  >
    <InputGroupButton variant="ghost" size="icon-xs" :sx="sx">
      <IconPlaceholder
        lucide="XIcon"
        tabler="IconX"
        hugeicons="Cancel01Icon"
        phosphor="XIcon"
        remixicon="RiCloseLine"
      />
    </InputGroupButton>
  </UisdkPart>
</template>
