<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { alert } from "../../../../styles/alert.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <div data-slot="alert-action" v-bind="attrs" :sx="[alert.action, sx]">
    <slot />
  </div>
</template>
