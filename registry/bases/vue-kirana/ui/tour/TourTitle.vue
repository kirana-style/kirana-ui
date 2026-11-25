<script setup lang="ts">
import { Tour } from "@kirana-ui/vue/tour"
import { useSx } from "@kirana-style/core/vue"

import { popover } from "../../../../styles/popover.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <Tour.Title data-slot="tour-title" v-bind="attrs" :sx="[popover.title, sx]">
    <slot />
  </Tour.Title>
</template>
