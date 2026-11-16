<script setup lang="ts">
import { CommandEmpty } from "@ui-sdk/vue/command"
import { useSx } from "@kirana-style/core/vue"

import { command } from "../../../../styles/command.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <!-- Shown while nothing matches, as cmdk's. ui-sdk keeps its live region in the page so the
       message is announced when it appears: until then it carries no slot and no style. -->
  <CommandEmpty>
    <template #render="{ props: own, state, children }">
      <div
        v-if="state.empty"
        v-bind="{ ...own, ...attrs, 'data-slot': 'command-empty' }"
        cmdk-empty
        :sx="[command.empty, sx]"
      >
        <component :is="children" />
      </div>
      <div v-else v-bind="{ ...own, 'data-slot': undefined }" />
    </template>
    <slot />
  </CommandEmpty>
</template>
