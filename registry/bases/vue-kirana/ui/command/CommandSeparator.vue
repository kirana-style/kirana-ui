<script setup lang="ts">
import { Command } from "@kirana-ui/vue/command"
import { useSx } from "@kirana-style/core/vue"

import { command } from "../../../../styles/command.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <!-- Hidden while something is typed, as cmdk's. -->
  <Command.Separator
    data-slot="command-separator"
    cmdk-separator
    v-bind="attrs"
    :sx="[command.separator, sx]"
  />
</template>
