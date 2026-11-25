<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { progressCircleParts } from "../../../../styles/progress-circle.styles"

defineOptions({ inheritAttrs: false })

/** The whole range: a ring in the progress track's colour. */
const { sx, attrs } = useSx()
</script>

<template>
  <circle
    data-slot="progress-circle-track"
    pathLength="100"
    v-bind="attrs"
    :sx="[progressCircleParts.track, sx]"
  />
</template>
