<script setup lang="ts">
import { MenuTriggerItem } from "@ark-ui/vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { useStyleAttrs } from "../../../../lib/vue"
import { dropdownMenu } from "../../../../styles/dropdown-menu.styles"
import { menuRowBase, menuRowPadding } from "../../../../styles/menu.styles"

defineOptions({ inheritAttrs: false })

const { inset = false } = defineProps<{ inset?: boolean }>()
const bound = useStyleAttrs(() => [
  menuRowBase,
  menuRowPadding,
  dropdownMenu.subTrigger,
])
</script>

<template>
  <MenuTriggerItem
    data-slot="dropdown-menu-sub-trigger"
    :data-inset="inset || undefined"
    v-bind="bound"
  >
    <slot />
    <IconPlaceholder
      lucide="ChevronRightIcon"
      tabler="IconChevronRight"
      hugeicons="ArrowRight01Icon"
      phosphor="CaretRightIcon"
      remixicon="RiArrowRightSLine"
      :sx="dropdownMenu.subTriggerIcon"
    />
  </MenuTriggerItem>
</template>
