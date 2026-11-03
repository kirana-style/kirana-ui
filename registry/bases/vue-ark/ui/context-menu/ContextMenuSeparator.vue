<script setup lang="ts">
import { MenuSeparator } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import { menuSeparator } from "../../../../styles/menu.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <!-- A div, as Base UI's separator; Ark's is an `hr`. -->
  <MenuSeparator as-child>
    <div
      data-slot="context-menu-separator"
      v-bind="attrs"
      :sx="[menuSeparator, sx]"
    />
  </MenuSeparator>
</template>
