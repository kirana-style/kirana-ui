<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { inputGroup } from "../../../../styles/input-group.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <span v-bind="attrs" :sx="[inputGroup.text, sx]">
    <slot />
  </span>
</template>
