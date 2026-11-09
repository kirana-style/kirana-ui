<script setup lang="ts">
import { MenuRadioItemGroup } from "@ark-ui/vue"
import { provide } from "vue"

import { RADIO_GROUP } from "./radio-group"

const model = defineModel<string>()
provide(RADIO_GROUP, model)
</script>

<template>
  <MenuRadioItemGroup v-model="model" data-slot="dropdown-menu-radio-group">
    <slot />
  </MenuRadioItemGroup>
</template>
