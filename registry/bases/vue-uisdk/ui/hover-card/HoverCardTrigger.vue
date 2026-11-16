<script setup lang="ts">
import { HoverCardTrigger } from "@ui-sdk/vue/hover-card"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"

defineOptions({ inheritAttrs: false })

const { asChild = false } = defineProps<{ asChild?: boolean }>()
</script>

<template>
  <UisdkPart
    :part="HoverCardTrigger"
    slot-name="hover-card-trigger"
    tag="a"
    :as-child="asChild"
    v-bind="$attrs"
  >
    <slot />
  </UisdkPart>
</template>
