<script setup lang="ts">
import { Popover } from "@kirana-ui/vue/popover"
import { useSx } from "@kirana-style/core/vue"

import { popover } from "../../../../styles/popover.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <Popover.Title
    data-slot="popover-title"
    v-bind="attrs"
    :sx="[popover.title, sx]"
  >
    <slot />
  </Popover.Title>
</template>
