<script setup lang="ts">
import { TabList } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import { tabs } from "../../../../styles/tabs.styles"

defineOptions({ inheritAttrs: false })

const { variant = "default" } = defineProps<{ variant?: "default" | "line" }>()
const { sx, attrs } = useSx()
</script>

<template>
  <TabList
    data-slot="tabs-list"
    :data-variant="variant"
    v-bind="attrs"
    :sx="[tabs.list, variant === 'line' ? tabs.listLine : tabs.listDefault, sx]"
  >
    <slot />
  </TabList>
</template>
