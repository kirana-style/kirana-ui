<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { marquee } from "../../../../styles/marquee.styles"

defineOptions({ inheritAttrs: false })

/** One item in the run. */
const { sx, attrs } = useSx()
</script>

<template>
  <div data-slot="marquee-item" v-bind="attrs" :sx="[marquee.item, sx]">
    <slot />
  </div>
</template>
