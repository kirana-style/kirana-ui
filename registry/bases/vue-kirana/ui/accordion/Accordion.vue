<script setup lang="ts">
import { Accordion } from "@kirana-ui/vue/accordion"
import { useSx } from "@kirana-style/core/vue"

import { accordion } from "../../../../styles/accordion.styles"

defineOptions({ inheritAttrs: false })

/** Kirana UI's accordion, with Vue's Ark UI parts' `v-model` and `default-value` (a list). */
const { defaultValue } = defineProps<{ defaultValue?: string[] }>()
const model = defineModel<string[] | undefined>({ default: undefined })
const { sx, attrs } = useSx()
</script>

<template>
  <Accordion.Root
    data-slot="accordion"
    :default-value="defaultValue"
    :value="model"
    v-bind="attrs"
    :sx="[accordion.root, sx]"
    @value-change="(value: unknown[]) => (model = value as string[])"
  >
    <slot />
  </Accordion.Root>
</template>
