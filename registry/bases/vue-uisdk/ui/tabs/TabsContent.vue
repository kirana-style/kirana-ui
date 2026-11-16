<script setup lang="ts">
import { TabsPanel } from "@ui-sdk/vue/tabs"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { tabs } from "../../../../styles/tabs.styles"

defineOptions({ inheritAttrs: false })

const { value } = defineProps<{ value: string }>()

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="TabsPanel"
    slot-name="tabs-content"
    tag="div"
    :value="value"
    v-bind="attrs"
    :sx="[tabs.content, sx]"
  >
    <slot />
  </UisdkPart>
</template>
