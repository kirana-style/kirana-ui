<script setup lang="ts">
import { Element } from "../../../../lib/vue/uisdk-slot"
import { useSx } from "@kirana-style/core/vue"

import { breadcrumb } from "../../../../styles/breadcrumb.styles"

defineOptions({ inheritAttrs: false })

const { asChild = false } = defineProps<{
  asChild?: boolean
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <Element
    as="a"
    data-slot="breadcrumb-link"
    v-bind="attrs"
    :sx="[breadcrumb.link, sx]"
    :as-child="asChild"
  >
    <slot />
  </Element>
</template>
