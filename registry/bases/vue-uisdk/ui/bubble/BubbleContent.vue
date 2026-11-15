<script setup lang="ts">
import { Element } from "../../../../lib/vue/uisdk-slot"
import { useSx } from "@kirana-style/core/vue"

import { bubble } from "../../../../styles/bubble.styles"

defineOptions({ inheritAttrs: false })

const { asChild = false } = defineProps<{
  asChild?: boolean
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <Element
    as="div"
    data-slot="bubble-content"
    v-bind="attrs"
    :sx="[bubble.content, sx]"
    :as-child="asChild"
  >
    <slot />
  </Element>
</template>
