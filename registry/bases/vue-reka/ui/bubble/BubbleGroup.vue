<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { bubble } from "../../../../styles/bubble.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <div data-slot="bubble-group" v-bind="attrs" :sx="[bubble.group, sx]">
    <slot />
  </div>
</template>
