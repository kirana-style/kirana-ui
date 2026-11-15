<script setup lang="ts">
import { DrawerTrigger } from "@ui-sdk/vue/drawer"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"

defineOptions({ inheritAttrs: false })

const { asChild = false } = defineProps<{ asChild?: boolean }>()
</script>

<template>
  <UisdkPart
    :part="DrawerTrigger"
    name="drawer-trigger"
    tag="button"
    :as-child="asChild"
    v-bind="$attrs"
  >
    <slot />
  </UisdkPart>
</template>
