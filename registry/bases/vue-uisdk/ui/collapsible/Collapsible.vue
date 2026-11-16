<script setup lang="ts">
import { Collapsible } from "@ui-sdk/vue/collapsible"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"

defineOptions({ inheritAttrs: false })

// `v-model:open`, as Ark UI's part takes it.
const open = defineModel<boolean | undefined>("open", { default: undefined })

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="Collapsible"
    slot-name="collapsible"
    tag="div"
    :open="open"
    @update:open="(value: boolean) => (open = value)"
    v-bind="attrs"
    :sx="sx"
  >
    <slot />
  </UisdkPart>
</template>
