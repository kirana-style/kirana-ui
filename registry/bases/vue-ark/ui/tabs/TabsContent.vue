<script setup lang="ts">
import { TabContent } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import { tabs } from "../../../../styles/tabs.styles"

defineOptions({ inheritAttrs: false })

// Ark's required `value` is declared here and passed on, so a project's type checker sees it.
const { value } = defineProps<{ value: string }>()
const { sx, attrs } = useSx()
</script>

<template>
  <TabContent
    data-slot="tabs-content"
    :value="value"
    v-bind="attrs"
    :sx="[tabs.content, sx]"
  >
    <slot />
  </TabContent>
</template>
