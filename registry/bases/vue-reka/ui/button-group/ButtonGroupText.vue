<script setup lang="ts">
import { Primitive } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"

import { buttonGroup } from "../../../../styles/button-group.styles"

defineOptions({ inheritAttrs: false })

const { asChild = false } = defineProps<{
  asChild?: boolean
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <Primitive
    as="div"
    data-slot="button-group-text"
    v-bind="attrs"
    :sx="[buttonGroup.text, sx]"
    :as-child="asChild"
  >
    <slot />
  </Primitive>
</template>
