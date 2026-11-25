<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { timeline } from "../../../../styles/timeline.styles"

defineOptions({ inheritAttrs: false })

const { orientation = "vertical", align = "start" } = defineProps<{
  orientation?: "vertical" | "horizontal"
  align?: "start" | "alternate"
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <ol
    data-slot="timeline"
    :data-orientation="orientation"
    :data-align="align"
    v-bind="attrs"
    :sx="[timeline.root, sx]"
  >
    <slot />
  </ol>
</template>
