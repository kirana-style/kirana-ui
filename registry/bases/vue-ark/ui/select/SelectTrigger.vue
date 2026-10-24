<script setup lang="ts">
import { SelectIndicator, SelectTrigger } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { select } from "../../../../styles/select.styles"

defineOptions({ inheritAttrs: false })

const { size = "default" } = defineProps<{ size?: "sm" | "default" }>()
const { sx, attrs } = useSx()
</script>

<template>
  <SelectTrigger
    data-slot="select-trigger"
    :data-size="size"
    v-bind="attrs"
    :sx="[select.trigger, sx]"
  >
    <slot />
    <SelectIndicator as-child>
      <IconPlaceholder
        lucide="ChevronDownIcon"
        tabler="IconSelector"
        hugeicons="UnfoldMoreIcon"
        phosphor="CaretDownIcon"
        remixicon="RiArrowDownSLine"
        :sx="select.triggerIcon"
      />
    </SelectIndicator>
  </SelectTrigger>
</template>
