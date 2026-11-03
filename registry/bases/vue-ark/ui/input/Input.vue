<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { input } from "../../../../styles/input.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <input data-slot="input" v-bind="attrs" :sx="[input, sx]" />
</template>
