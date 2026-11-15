<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { skeleton } from "../../../../styles/skeleton.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <div v-bind="attrs" :sx="[skeleton, sx]" data-slot="skeleton" />
</template>
