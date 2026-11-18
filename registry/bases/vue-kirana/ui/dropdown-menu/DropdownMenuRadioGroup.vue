<script setup lang="ts">
import { Menu } from "@kirana-ui/vue/menu"

const model = defineModel<string>()
</script>

<template>
  <Menu.RadioGroup v-model:value="model" data-slot="dropdown-menu-radio-group">
    <slot />
  </Menu.RadioGroup>
</template>
