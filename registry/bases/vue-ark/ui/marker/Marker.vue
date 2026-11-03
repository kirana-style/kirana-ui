<script setup lang="ts">
import { ark } from "@ark-ui/vue/factory"
import { useSx } from "@kirana-style/core/vue"

import { marker } from "../../../../styles/marker.styles"

defineOptions({ inheritAttrs: false })

type MarkerVariants = NonNullable<Parameters<typeof marker.root>[0]>

const { variant = "default", asChild = false } = defineProps<{
  variant?: MarkerVariants["variant"]
  asChild?: boolean
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <ark.div
    data-slot="marker"
    :data-variant="variant"
    v-bind="attrs"
    :sx="[marker.scope, marker.root({ variant }), sx]"
    :as-child="asChild"
  >
    <slot />
  </ark.div>
</template>
