<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { kbd } from "../../../../styles/kbd.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <kbd data-slot="kbd" v-bind="attrs" :sx="[kbd.root, sx]">
    <slot />
  </kbd>
</template>
