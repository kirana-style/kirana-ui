<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { alert } from "../../../../styles/alert.styles"

defineOptions({ inheritAttrs: false })

type AlertVariants = NonNullable<Parameters<typeof alert.root>[0]>

const { variant = "default" } = defineProps<{
  variant?: AlertVariants["variant"]
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <div
    data-slot="alert"
    :data-variant="variant"
    role="alert"
    v-bind="attrs"
    :sx="[alert.scope, alert.root({ variant }), sx]"
  >
    <slot />
  </div>
</template>
