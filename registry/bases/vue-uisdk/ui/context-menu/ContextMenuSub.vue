<script setup lang="ts">
import { MenuSub } from "@ui-sdk/vue/menu"
</script>

<template>
  <MenuSub data-slot="context-menu-sub" v-bind="$attrs">
    <slot />
  </MenuSub>
</template>
