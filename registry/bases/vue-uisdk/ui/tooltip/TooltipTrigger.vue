<script setup lang="ts">
import { TooltipTrigger } from "@ui-sdk/vue/tooltip"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"

defineOptions({ inheritAttrs: false })

const { asChild = false } = defineProps<{ asChild?: boolean }>()
</script>

<template>
  <UisdkPart
    :part="TooltipTrigger"
    name="tooltip-trigger"
    tag="button"
    :as-child="asChild"
    type="button"
    v-bind="$attrs"
  >
    <slot />
  </UisdkPart>
</template>
