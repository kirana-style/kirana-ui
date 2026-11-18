<script setup lang="ts">
/** Base UI's `ScrollUpArrow` and `ScrollDownArrow`: `SelectContent` mounts one per direction. */
import { Select } from "@kirana-ui/vue/select"
import { useSx } from "@kirana-style/core/vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { select } from "../../../../styles/select.styles"

defineOptions({ inheritAttrs: false })

const { direction } = defineProps<{ direction: "up" | "down" }>()
const { sx, attrs } = useSx()
</script>

<template>
  <Select.ScrollUpArrow
    v-if="direction === 'up'"
    data-slot="select-scroll-up-button"
    v-bind="attrs"
    :sx="[select.scrollButton, select.scrollUp, sx]"
  >
    <IconPlaceholder
      lucide="ChevronUpIcon"
      tabler="IconChevronUp"
      hugeicons="ArrowUp01Icon"
      phosphor="CaretUpIcon"
      remixicon="RiArrowUpSLine"
    />
  </Select.ScrollUpArrow>
  <Select.ScrollDownArrow
    v-else
    data-slot="select-scroll-down-button"
    v-bind="attrs"
    :sx="[select.scrollButton, select.scrollDown, sx]"
  >
    <IconPlaceholder
      lucide="ChevronDownIcon"
      tabler="IconChevronDown"
      hugeicons="ArrowDown01Icon"
      phosphor="CaretDownIcon"
      remixicon="RiArrowDownSLine"
    />
  </Select.ScrollDownArrow>
</template>
