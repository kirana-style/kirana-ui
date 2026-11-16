<script setup lang="ts">
import { Tabs } from "@ui-sdk/vue/tabs"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { tabs } from "../../../../styles/tabs.styles"

defineOptions({ inheritAttrs: false })

// `v-model`, as Ark UI's part takes it.
const value = defineModel<string | undefined>({ default: undefined })

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="Tabs"
    slot-name="tabs"
    tag="div"
    :model-value="value"
    @update:model-value="(next: string) => (value = next)"
    v-bind="attrs"
    :sx="[tabs.root, sx]"
  >
    <slot />
  </UisdkPart>
</template>
