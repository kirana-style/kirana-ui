<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { codeBlock } from "../../../../styles/code-block.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <div data-slot="code-block-title" v-bind="attrs" :sx="[codeBlock.title, sx]">
    <slot />
  </div>
</template>
