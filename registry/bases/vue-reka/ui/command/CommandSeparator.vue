<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { command } from "../../../../styles/command.styles"
import { useCommand } from "./context"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
const { query } = useCommand()
</script>

<template>
  <!-- Hidden while something is typed, as cmdk's (`alwaysRender` aside). -->
  <div
    v-if="!query"
    data-slot="command-separator"
    cmdk-separator
    role="separator"
    v-bind="attrs"
    :sx="[command.separator, sx]"
  />
</template>
