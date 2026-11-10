<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { progress } from "../../../../styles/progress.styles"

defineOptions({ inheritAttrs: false })

// Reka has no track part: the element Base UI's track renders.
const { sx, attrs } = useSx()
</script>

<template>
  <div data-slot="progress-track" v-bind="attrs" :sx="[progress.track, sx]">
    <slot />
  </div>
</template>
