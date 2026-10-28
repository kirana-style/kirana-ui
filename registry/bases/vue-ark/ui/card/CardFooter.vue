<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { card } from "../../../../styles/card.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <div v-bind="attrs" :sx="[card.footer, sx]" data-slot="card-footer">
    <slot />
  </div>
</template>
