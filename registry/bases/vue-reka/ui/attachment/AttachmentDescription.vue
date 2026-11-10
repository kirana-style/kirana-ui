<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { attachment } from "../../../../styles/attachment.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <span
    data-slot="attachment-description"
    v-bind="attrs"
    :sx="[attachment.description, sx]"
  >
    <slot />
  </span>
</template>
