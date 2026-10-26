<script setup lang="ts">
import { TabTrigger } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import { tabs } from "../../../../styles/tabs.styles"

defineOptions({ inheritAttrs: false })

// Ark's required `value` is declared here and passed on, so a project's type checker sees it.
const { value } = defineProps<{ value: string }>()
const { sx, attrs } = useSx()
</script>

<template>
  <TabTrigger
    data-slot="tabs-trigger"
    :value="value"
    v-bind="attrs"
    :sx="[tabs.trigger, sx]"
  >
    <slot />
  </TabTrigger>
</template>
