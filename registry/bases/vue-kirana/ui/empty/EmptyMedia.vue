<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { empty } from "../../../../styles/empty.styles"

defineOptions({ inheritAttrs: false })

type MediaVariants = NonNullable<Parameters<typeof empty.media>[0]>

const { variant = "default" } = defineProps<{
  variant?: MediaVariants["variant"]
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <div
    data-slot="empty-icon"
    :data-variant="variant"
    v-bind="attrs"
    :sx="[empty.media({ variant }), sx]"
  >
    <slot />
  </div>
</template>
