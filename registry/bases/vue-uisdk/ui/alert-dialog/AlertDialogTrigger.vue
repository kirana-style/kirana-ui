<script setup lang="ts">
import { AlertDialogTrigger } from "@ui-sdk/vue/alert-dialog"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"

defineOptions({ inheritAttrs: false })

const { asChild = false } = defineProps<{ asChild?: boolean }>()
</script>

<template>
  <UisdkPart
    :part="AlertDialogTrigger"
    name="alert-dialog-trigger"
    tag="button"
    :as-child="asChild"
    v-bind="$attrs"
  >
    <slot />
  </UisdkPart>
</template>
