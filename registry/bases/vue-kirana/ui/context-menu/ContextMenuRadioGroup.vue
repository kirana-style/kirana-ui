<script setup lang="ts">
import { ContextMenu } from "@kirana-ui/vue/context-menu"

const model = defineModel<string>()
</script>

<template>
  <ContextMenu.RadioGroup
    v-model:value="model"
    data-slot="context-menu-radio-group"
  >
    <slot />
  </ContextMenu.RadioGroup>
</template>
