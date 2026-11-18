<script setup lang="ts">
import { Command } from "@kirana-ui/vue/command"
import { useSx } from "@kirana-style/core/vue"

import { command } from "../../../../styles/command.styles"

defineOptions({ inheritAttrs: false })

const { heading } = defineProps<{ heading?: string }>()
const { sx, attrs } = useSx()
</script>

<template>
  <!-- Hidden while none of its items is shown, as cmdk's. -->
  <Command.Group
    data-slot="command-group"
    cmdk-group
    v-bind="attrs"
    :sx="[command.group, sx]"
  >
    <Command.GroupHeading v-if="heading" cmdk-group-heading>
      {{ heading }}
    </Command.GroupHeading>
    <div cmdk-group-items>
      <slot />
    </div>
  </Command.Group>
</template>
