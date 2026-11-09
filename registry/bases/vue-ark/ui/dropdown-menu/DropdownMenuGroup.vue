<script setup lang="ts">
import { MenuItemGroup, MenuRadioItemGroup } from "@ark-ui/vue"
import { inject } from "vue"

import { RADIO_GROUP } from "./radio-group"

// Inside a radio group, its items still answer to that group's value.
const radio = inject(RADIO_GROUP, undefined)
</script>

<template>
  <MenuRadioItemGroup
    v-if="radio"
    v-model="radio"
    data-slot="dropdown-menu-group"
  >
    <slot />
  </MenuRadioItemGroup>
  <MenuItemGroup v-else data-slot="dropdown-menu-group">
    <slot />
  </MenuItemGroup>
</template>
