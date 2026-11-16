<script setup lang="ts">
import { PopoverTrigger } from "@ui-sdk/vue/popover"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"

defineOptions({ inheritAttrs: false })

const { asChild = false } = defineProps<{ asChild?: boolean }>()
</script>

<template>
  <UisdkPart
    :part="PopoverTrigger"
    slot-name="popover-trigger"
    tag="button"
    :as-child="asChild"
    v-bind="$attrs"
  >
    <slot />
  </UisdkPart>
</template>
