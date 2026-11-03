<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { item } from "../../../../styles/item.styles"

defineOptions({ inheritAttrs: false })

type ItemMediaVariants = NonNullable<Parameters<typeof item.media>[0]>

const { variant = "default" } = defineProps<{
  variant?: ItemMediaVariants["variant"]
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <div
    data-slot="item-media"
    :data-variant="variant"
    v-bind="attrs"
    :sx="[item.media({ variant }), sx]"
  >
    <slot />
  </div>
</template>
