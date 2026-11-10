<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"
import { provide, useId } from "vue"

import { command } from "../../../../styles/command.styles"
import { COMMAND_GROUP, useCommand } from "./context"

defineOptions({ inheritAttrs: false })

const { heading } = defineProps<{ heading?: string }>()
const { sx, attrs } = useSx()
const { groupVisible } = useCommand()
const group = Symbol("group")
provide(COMMAND_GROUP, group)
const id = useId()
</script>

<template>
  <!-- A group with no match leaves the list, as cmdk's; its items stay mounted to be counted. -->
  <div
    v-show="groupVisible(group)"
    data-slot="command-group"
    cmdk-group
    role="presentation"
    v-bind="attrs"
    :sx="[command.group, sx]"
  >
    <div v-if="heading" :id="id" cmdk-group-heading aria-hidden="true">
      {{ heading }}
    </div>
    <div
      cmdk-group-items
      role="group"
      :aria-labelledby="heading ? id : undefined"
    >
      <slot />
    </div>
  </div>
</template>
