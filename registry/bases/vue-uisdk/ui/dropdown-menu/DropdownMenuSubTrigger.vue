<script setup lang="ts">
import { MenuSubTrigger } from "@ui-sdk/vue/menu"
import { useSx } from "@kirana-style/core/vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { menuRowBase, menuRowPadding } from "../../../../styles/menu.styles"
import { dropdownMenu } from "../../../../styles/dropdown-menu.styles"

defineOptions({ inheritAttrs: false })

const { inset } = defineProps<{ inset?: boolean }>()

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="MenuSubTrigger"
    slot-name="dropdown-menu-sub-trigger"
    tag="div"
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
  </UisdkPart>
</template>
