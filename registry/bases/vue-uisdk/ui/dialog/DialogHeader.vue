<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { dialog } from "../../../../styles/dialog.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <div data-slot="dialog-header" v-bind="attrs" :sx="[dialog.header, sx]">
    <slot />
  </div>
</template>
