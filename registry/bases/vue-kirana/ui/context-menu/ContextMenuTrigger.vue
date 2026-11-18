<script setup lang="ts">
import { ContextMenu } from "@kirana-ui/vue/context-menu"
import { useSx } from "@kirana-style/core/vue"

import { contextMenu } from "../../../../styles/context-menu.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <!-- A div, as Base UI's trigger: a region, not a button. -->
  <ContextMenu.Trigger as-child>
    <div
      data-slot="context-menu-trigger"
      v-bind="attrs"
      :sx="[contextMenu.trigger, sx]"
    >
      <slot />
    </div>
  </ContextMenu.Trigger>
</template>
