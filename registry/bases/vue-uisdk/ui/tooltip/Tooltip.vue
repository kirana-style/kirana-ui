<script setup lang="ts">
import { Tooltip } from "@ui-sdk/vue/tooltip"

import { popupContainer } from "../../../../lib/vue/uisdk-slot"

/**
 * Ark UI's tooltip root's props on ui-sdk's: `open-delay` is its `delay`, `0` as upstream's site
 * opens a tooltip at once. Its popup renders in the body, as Base UI's portal puts it.
 */
const { openDelay = 0 } = defineProps<{ openDelay?: number }>()
const open = defineModel<boolean | undefined>("open", { default: undefined })
</script>

<template>
  <Tooltip
    :container="popupContainer()"
    :delay="openDelay"
    :open="open"
    @update:open="(value: boolean) => (open = value)"
    v-bind="$attrs"
  >
    <slot />
  </Tooltip>
</template>
