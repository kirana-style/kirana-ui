<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { attachment } from "../../../../styles/attachment.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <div data-slot="attachment-group" v-bind="attrs" :sx="[attachment.group, sx]">
    <slot />
  </div>
</template>
