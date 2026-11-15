<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { kbd } from "../../../../styles/kbd.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <kbd data-slot="kbd-group" v-bind="attrs" :sx="[kbd.group, sx]">
    <slot />
  </kbd>
</template>
