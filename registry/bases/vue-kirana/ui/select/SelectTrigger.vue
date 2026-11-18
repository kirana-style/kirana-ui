<script setup lang="ts">
import { Select } from "@kirana-ui/vue/select"
import { useSx } from "@kirana-style/core/vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { select } from "../../../../styles/select.styles"

defineOptions({ inheritAttrs: false })

const { size = "default" } = defineProps<{ size?: "sm" | "default" }>()
const { sx, attrs } = useSx()
</script>

<template>
  <Select.Trigger
    data-slot="select-trigger"
    :data-size="size"
    v-bind="attrs"
    :sx="[select.trigger, sx]"
  >
    <slot />
    <!-- Base UI's `Select.Icon`, which Kirana UI's select has not: the icon itself. -->
    <IconPlaceholder
      aria-hidden="true"
      lucide="ChevronDownIcon"
      tabler="IconSelector"
      hugeicons="UnfoldMoreIcon"
      phosphor="CaretDownIcon"
      remixicon="RiArrowDownSLine"
      :sx="select.triggerIcon"
    />
  </Select.Trigger>
</template>
