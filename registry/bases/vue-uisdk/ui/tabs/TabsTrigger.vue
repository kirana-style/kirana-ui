<script setup lang="ts">
import { TabsTab } from "@ui-sdk/vue/tabs"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { tabs } from "../../../../styles/tabs.styles"

defineOptions({ inheritAttrs: false })

const { value } = defineProps<{ value: string }>()

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="TabsTab"
    name="tabs-trigger"
    tag="button"
    :value="value"
    v-bind="attrs"
    :sx="[tabs.trigger, sx]"
  >
    <slot />
  </UisdkPart>
</template>
