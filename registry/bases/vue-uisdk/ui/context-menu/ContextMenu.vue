<script setup lang="ts">
import { Menu } from "@ui-sdk/vue/menu"

import { popupContainer } from "../../../../lib/vue/uisdk-slot"

/** ui-sdk's menu, `v-model:open` as Ark UI's part takes it; its popup renders in the body. */
const open = defineModel<boolean | undefined>("open", { default: undefined })
</script>

<template>
  <Menu
    data-slot="context-menu"
    :container="popupContainer()"
    :open="open"
    @update:open="(value: boolean) => (open = value)"
    v-bind="$attrs"
  >
    <slot />
  </Menu>
</template>
