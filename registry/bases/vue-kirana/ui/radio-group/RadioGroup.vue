<script setup lang="ts">
import { RadioGroup } from "@kirana-ui/vue/radio-group"
import { useSx } from "@kirana-style/core/vue"

import { radioGroup } from "../../../../styles/radio-group.styles"

defineOptions({ inheritAttrs: false })

/** Kirana UI's radio group, with Vue's Ark UI parts' `v-model` and `default-value`. */
const { defaultValue } = defineProps<{ defaultValue?: string }>()
const model = defineModel<string | undefined>({ default: undefined })
const { sx, attrs } = useSx()
</script>

<template>
  <RadioGroup.Root
    data-slot="radio-group"
    :default-value="defaultValue"
    :value="model"
    v-bind="attrs"
    :sx="[radioGroup.root, sx]"
    @value-change="(value: unknown) => (model = (value ?? undefined) as string)"
  >
    <slot />
  </RadioGroup.Root>
</template>
