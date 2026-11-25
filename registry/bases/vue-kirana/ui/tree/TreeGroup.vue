<script setup lang="ts">
import { Tree } from "@kirana-ui/vue/tree"
import { useSx } from "@kirana-style/core/vue"

import { tree } from "../../../../styles/tree.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <Tree.Group data-slot="tree-group" v-bind="attrs" :sx="[tree.group, sx]">
    <slot />
  </Tree.Group>
</template>
