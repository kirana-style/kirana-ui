<script setup lang="ts">
/**
 * Base UI's `ScrollUpArrow` and `ScrollDownArrow` on Reka's scroll buttons: at the popup's top or
 * bottom while the list can scroll that way, over the list as Base UI's are, scrolling it while
 * the pointer rests on it. `SelectContent` mounts one per direction.
 */
import { SelectScrollDownButton, SelectScrollUpButton } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { select } from "../../../../styles/select.styles"

defineOptions({ inheritAttrs: false })

const { direction } = defineProps<{ direction: "up" | "down" }>()
const { sx, attrs } = useSx()
</script>

<template>
  <component
    :is="direction === 'up' ? SelectScrollUpButton : SelectScrollDownButton"
    :data-slot="
      direction === 'up'
        ? 'select-scroll-up-button'
        : 'select-scroll-down-button'
    "
    :data-direction="direction"
    :data-side="direction === 'up' ? 'top' : 'bottom'"
    data-visible=""
    aria-hidden="true"
    style="position: absolute"
    v-bind="attrs"
    :sx="[
      select.scrollButton,
      direction === 'up' ? select.scrollUp : select.scrollDown,
      sx,
    ]"
  >
    <IconPlaceholder
      v-if="direction === 'up'"
      lucide="ChevronUpIcon"
      tabler="IconChevronUp"
      hugeicons="ArrowUp01Icon"
      phosphor="CaretUpIcon"
      remixicon="RiArrowUpSLine"
    />
    <IconPlaceholder
      v-else
      lucide="ChevronDownIcon"
      tabler="IconChevronDown"
      hugeicons="ArrowDown01Icon"
      phosphor="CaretDownIcon"
      remixicon="RiArrowDownSLine"
    />
  </component>
</template>
