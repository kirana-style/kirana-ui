<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { tour } from "../../../../styles/tour.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <div data-slot="tour-footer" v-bind="attrs" :sx="[tour.footer, sx]">
    <slot />
  </div>
</template>
