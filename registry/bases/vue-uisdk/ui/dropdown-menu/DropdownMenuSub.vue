<script setup lang="ts">
import { MenuSub } from "@ui-sdk/vue/menu"
</script>

<template>
  <MenuSub data-slot="dropdown-menu-sub" v-bind="$attrs">
    <slot />
  </MenuSub>
</template>
