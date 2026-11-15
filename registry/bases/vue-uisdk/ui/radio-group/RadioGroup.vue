<script setup lang="ts">
import { RadioGroup } from "@ui-sdk/vue/radio"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { radioGroup } from "../../../../styles/radio-group.styles"

defineOptions({ inheritAttrs: false })

// `v-model`, as Ark UI's part takes it.
const value = defineModel<string | null | undefined>({ default: undefined })

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="RadioGroup"
    name="radio-group"
    tag="div"
    :model-value="value"
    @update:model-value="(next: string | null) => (value = next)"
    v-bind="attrs"
    :sx="[radioGroup.root, sx]"
  >
    <slot />
  </UisdkPart>
</template>
