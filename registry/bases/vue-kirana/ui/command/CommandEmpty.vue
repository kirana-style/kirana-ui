<script setup lang="ts">
import { Command } from "@kirana-ui/vue/command"
import { useSx } from "@kirana-style/core/vue"

import { command } from "../../../../styles/command.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <Command.Empty
    data-slot="command-empty"
    cmdk-empty
    v-bind="attrs"
    :sx="[command.empty, sx]"
  >
    <slot />
  </Command.Empty>
</template>
