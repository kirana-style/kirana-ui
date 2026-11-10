<script setup lang="ts">
import { ContextMenuRadioGroup } from "reka-ui"

const model = defineModel<string>()
</script>

<template>
  <ContextMenuRadioGroup v-model="model" data-slot="context-menu-radio-group">
    <slot />
  </ContextMenuRadioGroup>
</template>
