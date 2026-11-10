<script setup lang="ts">
import { ContextMenuSubTrigger } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { contextMenu } from "../../../../styles/context-menu.styles"
import { menuRowBase, menuRowPadding } from "../../../../styles/menu.styles"

defineOptions({ inheritAttrs: false })

const { inset = false } = defineProps<{ inset?: boolean }>()
const { sx, attrs } = useSx()
</script>

<template>
  <ContextMenuSubTrigger
    data-slot="context-menu-sub-trigger"
    :data-inset="inset || undefined"
    v-bind="attrs"
    :sx="[menuRowBase, menuRowPadding, contextMenu.subTrigger, sx]"
  >
    <slot />
    <IconPlaceholder
      lucide="ChevronRightIcon"
      tabler="IconChevronRight"
      hugeicons="ArrowRight01Icon"
      phosphor="CaretRightIcon"
      remixicon="RiArrowRightSLine"
      :sx="contextMenu.subTriggerIcon"
    />
  </ContextMenuSubTrigger>
</template>
