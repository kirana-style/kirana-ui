<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { example } from "../../../../styles/example.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <div :sx="example.page">
    <div data-slot="example-wrapper" v-bind="attrs" :sx="[example.wrapper, sx]">
      <slot />
    </div>
  </div>
</template>
