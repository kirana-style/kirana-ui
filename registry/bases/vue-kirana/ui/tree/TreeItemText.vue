<script setup lang="ts">
import { Tree } from "@kirana-ui/vue/tree"
import { useSx } from "@kirana-style/core/vue"

import { tree } from "../../../../styles/tree.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <Tree.ItemText
    data-slot="tree-item-text"
    v-bind="attrs"
    :sx="[tree.text, sx]"
  >
    <slot />
  </Tree.ItemText>
</template>
