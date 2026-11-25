<script setup lang="ts">
import { Tree } from "@kirana-ui/vue/tree"
import { useSx } from "@kirana-style/core/vue"
import { provide } from "vue"

import { tree } from "../../../../styles/tree.styles"
import { TREE_BRANCH } from "./context"

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{ value: unknown; branch?: boolean }>(),
  { branch: false }
)
const { sx, attrs } = useSx()
provide(TREE_BRANCH, () => props.branch)
</script>

<template>
  <Tree.Item
    data-slot="tree-item"
    :value="value"
    :branch="branch"
    v-bind="attrs"
    :sx="[tree.item, sx]"
  >
    <slot />
  </Tree.Item>
</template>
