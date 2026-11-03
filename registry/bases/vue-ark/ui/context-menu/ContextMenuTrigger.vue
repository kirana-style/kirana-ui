<script setup lang="ts">
import { MenuContextTrigger } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import { contextMenu } from "../../../../styles/context-menu.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <!-- A div, as Base UI's trigger: a region, not a button. -->
  <MenuContextTrigger as-child>
    <div
      data-slot="context-menu-trigger"
      v-bind="attrs"
      :sx="[contextMenu.trigger, sx]"
    >
      <slot />
    </div>
  </MenuContextTrigger>
</template>
