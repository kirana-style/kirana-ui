<script setup lang="ts">
import { Tour } from "@kirana-ui/vue/tour"
import { useSx } from "@kirana-style/core/vue"

import { popover } from "../../../../styles/popover.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <Tour.Description
    data-slot="tour-description"
    v-bind="attrs"
    :sx="[popover.description, sx]"
  >
    <slot />
  </Tour.Description>
</template>
