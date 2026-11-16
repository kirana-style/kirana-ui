<script setup lang="ts">
import { MenuTrigger } from "@ui-sdk/vue/menu"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"

defineOptions({ inheritAttrs: false })

const { asChild = false } = defineProps<{ asChild?: boolean }>()
</script>

<template>
  <UisdkPart
    :part="MenuTrigger"
    slot-name="dropdown-menu-trigger"
    tag="button"
    :as-child="asChild"
    v-bind="$attrs"
  >
    <slot />
  </UisdkPart>
</template>
