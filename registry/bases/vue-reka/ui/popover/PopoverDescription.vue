<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { popover } from "../../../../styles/popover.styles"

defineOptions({ inheritAttrs: false })

// Reka's popover has no description part: the paragraph Base UI's description renders.
const { sx, attrs } = useSx()
</script>

<template>
  <p
    data-slot="popover-description"
    v-bind="attrs"
    :sx="[popover.description, sx]"
  >
    <slot />
  </p>
</template>
