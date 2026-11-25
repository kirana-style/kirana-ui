<script setup lang="ts">
import { Tree } from "@kirana-ui/vue/tree"
import { useSx } from "@kirana-style/core/vue"

import { tree } from "../../../../styles/tree.styles"

defineOptions({ inheritAttrs: false })

/** The root: the open branches bind with `v-model:expandedValue`, the chosen nodes with `v-model:selectedValue`. */
const { sx, attrs } = useSx()
</script>

<template>
  <Tree.Root data-slot="tree" v-bind="attrs" :sx="[tree.root, sx]">
    <slot />
  </Tree.Root>
</template>
