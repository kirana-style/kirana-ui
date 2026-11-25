<script setup lang="ts">
import { Tree } from "@kirana-ui/vue/tree"
import { useSx } from "@kirana-style/core/vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { tree } from "../../../../styles/tree.styles"

defineOptions({ inheritAttrs: false })

/** The chevron that turns while its branch is open. With nothing in its slot it draws a chevron. */
const { sx, attrs } = useSx()
</script>

<template>
  <Tree.ItemIndicator
    data-slot="tree-item-indicator"
    v-bind="attrs"
    :sx="[tree.indicator, sx]"
  >
    <slot>
      <IconPlaceholder
        lucide="ChevronRightIcon"
        tabler="IconChevronRight"
        hugeicons="ArrowRight01Icon"
        phosphor="CaretRightIcon"
        remixicon="RiArrowRightSLine"
      />
    </slot>
  </Tree.ItemIndicator>
</template>
