<script setup lang="ts">
import { Popover } from "@kirana-ui/vue/popover"

defineOptions({ inheritAttrs: false })
</script>

<template>
  <Popover.Root v-bind="$attrs">
    <slot />
  </Popover.Root>
</template>
