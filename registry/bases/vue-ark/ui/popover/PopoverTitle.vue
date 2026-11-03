<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { popover } from "../../../../styles/popover.styles"
import { PopoverTitle } from "@ark-ui/vue"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <PopoverTitle
    data-slot="popover-title"
    v-bind="attrs"
    :sx="[popover.title, sx]"
  >
    <slot />
  </PopoverTitle>
</template>
