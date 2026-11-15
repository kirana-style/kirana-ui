<script setup lang="ts">
import { Element } from "../../../../lib/vue/uisdk-slot"
import { useSx } from "@kirana-style/core/vue"

import { buttonGroup } from "../../../../styles/button-group.styles"

defineOptions({ inheritAttrs: false })

const { asChild = false } = defineProps<{
  asChild?: boolean
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <Element
    as="div"
    data-slot="button-group-text"
    v-bind="attrs"
    :sx="[buttonGroup.text, sx]"
    :as-child="asChild"
  >
    <slot />
  </Element>
</template>
