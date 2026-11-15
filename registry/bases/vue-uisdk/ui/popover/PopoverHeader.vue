<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { popover } from "../../../../styles/popover.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <div data-slot="popover-header" v-bind="attrs" :sx="[popover.header, sx]">
    <slot />
  </div>
</template>
