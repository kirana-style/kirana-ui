<script setup lang="ts">
import { Accordion } from "@ui-sdk/vue/accordion"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { accordion } from "../../../../styles/accordion.styles"

defineOptions({ inheritAttrs: false })

// `v-model`, as Ark UI's part takes it.
const value = defineModel<string[] | undefined>({ default: undefined })

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="Accordion"
    name="accordion"
    tag="div"
    :model-value="value"
    @update:model-value="(next: string[]) => (value = next)"
    v-bind="attrs"
    :sx="[accordion.root, sx]"
  >
    <slot />
  </UisdkPart>
</template>
