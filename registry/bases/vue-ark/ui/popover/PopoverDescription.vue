<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { popover } from "../../../../styles/popover.styles"
import { PopoverDescription } from "@ark-ui/vue"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <!-- A paragraph, as Base UI's description. -->
  <PopoverDescription as-child>
    <p
      data-slot="popover-description"
      v-bind="attrs"
      :sx="[popover.description, sx]"
    >
      <slot />
    </p>
  </PopoverDescription>
</template>
