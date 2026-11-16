<script setup lang="ts">
import { CommandGroup, CommandGroupLabel } from "@ui-sdk/vue/command"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { command } from "../../../../styles/command.styles"

defineOptions({ inheritAttrs: false })

const { heading } = defineProps<{ heading?: string }>()
const { sx, attrs } = useSx()
</script>

<template>
  <!-- A group with no match leaves the list, as cmdk's. Its heading is cmdk's, with no slot. -->
  <UisdkPart
    :part="CommandGroup"
    slot-name="command-group"
    tag="div"
    cmdk-group
    v-bind="attrs"
    :sx="[command.group, sx]"
  >
    <CommandGroupLabel v-if="heading">
      <template #render="{ props: own }">
        <div v-bind="{ ...own, 'data-slot': undefined }" cmdk-group-heading>
          {{ heading }}
        </div>
      </template>
    </CommandGroupLabel>
    <div cmdk-group-items><slot /></div>
  </UisdkPart>
</template>
