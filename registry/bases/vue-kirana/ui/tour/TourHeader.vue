<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { popover } from "../../../../styles/popover.styles"
import { tour } from "../../../../styles/tour.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <div
    data-slot="tour-header"
    v-bind="attrs"
    :sx="[popover.header, tour.header, sx]"
  >
    <slot />
  </div>
</template>
