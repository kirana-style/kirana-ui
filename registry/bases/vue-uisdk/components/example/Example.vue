<script setup lang="ts">
import type { Sx } from "@kirana-style/core"
import { useSx } from "@kirana-style/core/vue"

import { example } from "../../../../styles/example.styles"

defineOptions({ inheritAttrs: false })

const { title, containerSx } = defineProps<{
  title?: string
  containerSx?: Sx
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <div data-slot="example" v-bind="attrs" :sx="[example.root, containerSx]">
    <div v-if="title" :sx="example.title">{{ title }}</div>
    <div data-slot="example-content" :sx="[example.content, sx]">
      <slot />
    </div>
  </div>
</template>
