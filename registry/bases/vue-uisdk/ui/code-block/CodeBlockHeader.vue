<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { codeBlock } from "../../../../styles/code-block.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <div
    data-slot="code-block-header"
    v-bind="attrs"
    :sx="[codeBlock.header, sx]"
  >
    <slot />
  </div>
</template>
