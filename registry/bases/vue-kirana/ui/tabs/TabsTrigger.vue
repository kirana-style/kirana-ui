<script setup lang="ts">
import { Tabs } from "@kirana-ui/vue/tabs"
import { useSx } from "@kirana-style/core/vue"

import { tabs } from "../../../../styles/tabs.styles"

defineOptions({ inheritAttrs: false })

const { value } = defineProps<{ value: string }>()
const { sx, attrs } = useSx()
</script>

<template>
  <Tabs.Tab
    data-slot="tabs-trigger"
    :value="value"
    v-bind="attrs"
    :sx="[tabs.trigger, sx]"
  >
    <slot />
  </Tabs.Tab>
</template>
