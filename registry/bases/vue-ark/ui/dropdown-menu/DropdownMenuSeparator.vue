<script setup lang="ts">
import { MenuSeparator } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import { menuSeparator } from "../../../../styles/menu.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <MenuSeparator
    data-slot="dropdown-menu-separator"
    v-bind="attrs"
    :sx="[menuSeparator, sx]"
  />
</template>
