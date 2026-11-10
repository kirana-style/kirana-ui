<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { menuShortcut } from "../../../../styles/menu.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <span
    data-slot="dropdown-menu-shortcut"
    v-bind="attrs"
    :sx="[menuShortcut, sx]"
  >
    <slot />
  </span>
</template>
