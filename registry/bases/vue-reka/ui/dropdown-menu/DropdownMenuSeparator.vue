<script setup lang="ts">
import { DropdownMenuSeparator } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"

import { menuSeparator } from "../../../../styles/menu.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <!-- A div, as Base UI's separator. -->
  <DropdownMenuSeparator
    data-slot="dropdown-menu-separator"
    v-bind="attrs"
    :sx="[menuSeparator, sx]"
  />
</template>
