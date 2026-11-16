<script setup lang="ts">
import { DialogTrigger } from "@ui-sdk/vue/dialog"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"

defineOptions({ inheritAttrs: false })

const { asChild = false } = defineProps<{ asChild?: boolean }>()
</script>

<template>
  <UisdkPart
    :part="DialogTrigger"
    slot-name="dialog-trigger"
    tag="button"
    :as-child="asChild"
    v-bind="$attrs"
  >
    <slot />
  </UisdkPart>
</template>
