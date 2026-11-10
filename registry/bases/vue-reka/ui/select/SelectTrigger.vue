<script setup lang="ts">
import { SelectIcon, SelectTrigger } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { select } from "../../../../styles/select.styles"

defineOptions({ inheritAttrs: false })

const { size = "default" } = defineProps<{ size?: "sm" | "default" }>()
const { sx, attrs } = useSx()
</script>

<template>
  <!-- Reka's trigger is the field's own child, as Base UI's is. -->
  <SelectTrigger
    data-slot="select-trigger"
    :data-size="size"
    v-bind="attrs"
    :sx="[select.trigger, sx]"
  >
    <slot />
    <SelectIcon as-child>
      <IconPlaceholder
        lucide="ChevronDownIcon"
        tabler="IconSelector"
        hugeicons="UnfoldMoreIcon"
        phosphor="CaretDownIcon"
        remixicon="RiArrowDownSLine"
        :sx="select.triggerIcon"
      />
    </SelectIcon>
  </SelectTrigger>
</template>
