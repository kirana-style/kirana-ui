<script setup lang="ts">
import { useStyleAttrs } from "../../../../lib/vue"
import { dialog } from "../../../../styles/dialog.styles"

defineOptions({ inheritAttrs: false })

const bound = useStyleAttrs(() => dialog.header)
</script>

<template>
  <div data-slot="dialog-header" v-bind="bound">
    <slot />
  </div>
</template>
