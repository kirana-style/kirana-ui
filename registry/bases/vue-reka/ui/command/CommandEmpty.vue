<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { command } from "../../../../styles/command.styles"
import { useCommand } from "./context"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
const { empty } = useCommand()
</script>

<template>
  <div
    v-if="empty"
    data-slot="command-empty"
    cmdk-empty
    role="presentation"
    v-bind="attrs"
    :sx="[command.empty, sx]"
  >
    <slot />
  </div>
</template>
