<script setup lang="ts">
import { ark } from "@ark-ui/vue/factory"
import { useSx } from "@kirana-style/core/vue"

import { item } from "../../../../styles/item.styles"

defineOptions({ inheritAttrs: false })

type ItemVariants = NonNullable<Parameters<typeof item.root>[0]>

const {
  variant = "default",
  size = "default",
  asChild = false,
} = defineProps<{
  variant?: ItemVariants["variant"]
  size?: ItemVariants["size"]
  asChild?: boolean
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <ark.div
    data-slot="item"
    :data-variant="variant"
    :data-size="size"
    v-bind="attrs"
    :sx="[item.scope, item.root({ variant, size }), sx]"
    :as-child="asChild"
  >
    <slot />
  </ark.div>
</template>
