<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { marker } from "../../../../styles/marker.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <span data-slot="marker-content" v-bind="attrs" :sx="[marker.content, sx]">
    <slot />
  </span>
</template>
