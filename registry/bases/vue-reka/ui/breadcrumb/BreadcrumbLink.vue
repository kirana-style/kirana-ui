<script setup lang="ts">
import { Primitive } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"

import { breadcrumb } from "../../../../styles/breadcrumb.styles"

defineOptions({ inheritAttrs: false })

const { asChild = false } = defineProps<{
  asChild?: boolean
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <Primitive
    as="a"
    data-slot="breadcrumb-link"
    v-bind="attrs"
    :sx="[breadcrumb.link, sx]"
    :as-child="asChild"
  >
    <slot />
  </Primitive>
</template>
