<script setup lang="ts">
import { Tabs } from "@kirana-ui/vue/tabs"
import { useSx } from "@kirana-style/core/vue"

import { tabs } from "../../../../styles/tabs.styles"

defineOptions({ inheritAttrs: false })

/** Kirana UI's tabs, with Vue's Ark UI parts' `v-model` and `default-value`. */
const { defaultValue } = defineProps<{ defaultValue?: string }>()
const model = defineModel<string | undefined>({ default: undefined })
const { sx, attrs } = useSx()
</script>

<template>
  <Tabs.Root
    data-slot="tabs"
    :default-value="defaultValue"
    :value="model"
    v-bind="attrs"
    :sx="[tabs.root, sx]"
    @value-change="(value: unknown) => (model = value as string)"
  >
    <slot />
  </Tabs.Root>
</template>
