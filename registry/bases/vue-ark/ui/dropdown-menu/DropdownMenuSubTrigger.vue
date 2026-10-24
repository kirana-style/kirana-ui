<script setup lang="ts">
import { MenuTriggerItem } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { dropdownMenu } from "../../../../styles/dropdown-menu.styles"
import { menuRowBase, menuRowPadding } from "../../../../styles/menu.styles"

defineOptions({ inheritAttrs: false })

const { inset = false } = defineProps<{ inset?: boolean }>()
const { sx, attrs } = useSx()
</script>

<template>
  <MenuTriggerItem
    data-slot="dropdown-menu-sub-trigger"
    :data-inset="inset || undefined"
    v-bind="attrs"
    :sx="[menuRowBase, menuRowPadding, dropdownMenu.subTrigger, sx]"
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
