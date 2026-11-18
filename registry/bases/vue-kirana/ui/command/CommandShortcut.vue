<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { command } from "../../../../styles/command.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <span
    data-slot="command-shortcut"
    v-bind="attrs"
    :sx="[command.shortcut, sx]"
  >
    <slot />
  </span>
</template>
