<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <nav data-slot="breadcrumb" aria-label="breadcrumb" v-bind="attrs" :sx="sx">
    <slot />
  </nav>
</template>
