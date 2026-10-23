<script setup lang="ts">
import { useStyleAttrs } from "../../../../lib/vue"
import { menuShortcut } from "../../../../styles/menu.styles"

defineOptions({ inheritAttrs: false })

const bound = useStyleAttrs(() => menuShortcut)
</script>

<template>
  <span data-slot="dropdown-menu-shortcut" v-bind="bound">
    <slot />
  </span>
</template>
