<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { marker } from "../../../../styles/marker.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <span
    data-slot="marker-icon"
    aria-hidden="true"
    v-bind="attrs"
    :sx="[marker.icon, sx]"
  >
    <slot />
  </span>
</template>
