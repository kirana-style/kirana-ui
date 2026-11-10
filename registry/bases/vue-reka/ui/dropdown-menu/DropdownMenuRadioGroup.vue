<script setup lang="ts">
import { DropdownMenuRadioGroup } from "reka-ui"

const model = defineModel<string>()
</script>

<template>
  <DropdownMenuRadioGroup v-model="model" data-slot="dropdown-menu-radio-group">
    <slot />
  </DropdownMenuRadioGroup>
</template>
