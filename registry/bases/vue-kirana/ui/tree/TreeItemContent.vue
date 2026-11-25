<script setup lang="ts">
import { Tree } from "@kirana-ui/vue/tree"
import { useSx } from "@kirana-style/core/vue"
import { inject } from "vue"

import { menuRowBase, menuRowPadding } from "../../../../styles/menu.styles"
import { tree } from "../../../../styles/tree.styles"
import { TREE_BRANCH } from "./context"
import TreeItemIndicator from "./TreeItemIndicator.vue"

defineOptions({ inheritAttrs: false })

/**
 * A node's row. It draws the chevron first on a branch, and the same room on a leaf, then its
 * slot: an icon and the `TreeItemText`.
 */
const { sx, attrs } = useSx()
const branch = inject(TREE_BRANCH, () => false)
</script>

<template>
  <Tree.ItemRow
    data-slot="tree-item-content"
    v-bind="attrs"
    :sx="[menuRowBase, menuRowPadding, tree.row, sx]"
  >
    <TreeItemIndicator v-if="branch()" />
    <span
      v-else
      aria-hidden="true"
      data-slot="tree-item-indicator-space"
      :sx="tree.indicatorSpace"
    />
    <slot />
  </Tree.ItemRow>
</template>
