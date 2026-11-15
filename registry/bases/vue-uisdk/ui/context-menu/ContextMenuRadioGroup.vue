<script setup lang="ts">
import { MenuRadioGroup } from "@ui-sdk/vue/menu"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"

defineOptions({ inheritAttrs: false })

// `v-model`, as Ark UI's part takes it.
const value = defineModel<string | undefined>({ default: undefined })
</script>

<template>
  <UisdkPart
    :part="MenuRadioGroup"
    name="context-menu-radio-group"
    tag="div"
    :model-value="value"
    @update:model-value="(next: string) => (value = next)"
    v-bind="$attrs"
  >
    <slot />
  </UisdkPart>
</template>
