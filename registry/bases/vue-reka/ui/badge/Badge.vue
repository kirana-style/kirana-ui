<script setup lang="ts">
import { Primitive } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"

import { badge } from "../../../../styles/badge.styles"

defineOptions({ inheritAttrs: false })

type BadgeVariants = NonNullable<Parameters<typeof badge>[0]>

const { variant = "default", asChild = false } = defineProps<{
  variant?: BadgeVariants["variant"]
  asChild?: boolean
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <Primitive
    as="span"
    data-slot="badge"
    :data-variant="variant"
    v-bind="attrs"
    :sx="[badge({ variant }), sx]"
    :as-child="asChild"
  >
    <slot />
  </Primitive>
</template>
