<script setup lang="ts">
import { DrawerClose } from "@ui-sdk/vue/drawer"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"

defineOptions({ inheritAttrs: false })

const { asChild = false } = defineProps<{ asChild?: boolean }>()
</script>

<template>
  <UisdkPart
    :part="DrawerClose"
    slot-name="drawer-close"
    tag="button"
    :as-child="asChild"
    v-bind="$attrs"
  >
    <slot />
  </UisdkPart>
</template>
