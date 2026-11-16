<script setup lang="ts">
import { AlertDialogClose } from "@ui-sdk/vue/alert-dialog"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"

defineOptions({ inheritAttrs: false })

const { asChild = false } = defineProps<{ asChild?: boolean }>()
</script>

<template>
  <UisdkPart
    :part="AlertDialogClose"
    slot-name="alert-dialog-close"
    tag="button"
    :as-child="asChild"
    v-bind="$attrs"
  >
    <slot />
  </UisdkPart>
</template>
