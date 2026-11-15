<script setup lang="ts">
import { Popover } from "@ui-sdk/vue/popover"

import { popupContainer } from "../../../../lib/vue/uisdk-slot"

/**
 * Ark UI's popover root's props on ui-sdk's, `v-model:open` among them. Its popup renders in the
 * body, as Base UI's portal puts it.
 */
const open = defineModel<boolean | undefined>("open", { default: undefined })
</script>

<template>
  <Popover
    :container="popupContainer()"
    :open="open"
    @update:open="(value: boolean) => (open = value)"
    v-bind="$attrs"
  >
    <slot />
  </Popover>
</template>
