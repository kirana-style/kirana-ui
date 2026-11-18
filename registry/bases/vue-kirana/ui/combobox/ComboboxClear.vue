<script setup lang="ts">
import { Combobox } from "@kirana-ui/vue/combobox"
import { useSx } from "@kirana-style/core/vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { InputGroupButton } from "../input-group"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <!-- Empties the input and the value, as Base UI's. -->
  <Combobox.Clear data-slot="combobox-clear" v-bind="attrs" as-child>
    <InputGroupButton variant="ghost" size="icon-xs" :sx="sx">
      <IconPlaceholder
        lucide="XIcon"
        tabler="IconX"
        hugeicons="Cancel01Icon"
        phosphor="XIcon"
        remixicon="RiCloseLine"
      />
    </InputGroupButton>
  </Combobox.Clear>
</template>
