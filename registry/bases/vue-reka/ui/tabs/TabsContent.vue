<script setup lang="ts">
import { injectTabsRootContext, TabsContent } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"

import { tabs } from "../../../../styles/tabs.styles"

defineOptions({ inheritAttrs: false })

// Reka's required `value` is declared here and passed on, so a project's type checker sees it.
const { value } = defineProps<{ value: string }>()
const { sx, attrs } = useSx()
// Only the chosen panel is in the page, as Base UI's: Reka keeps the others' elements, `hidden`.
const root = injectTabsRootContext()
</script>

<template>
  <TabsContent
    v-if="root.modelValue.value === value"
    data-slot="tabs-content"
    :value="value"
    v-bind="attrs"
    :sx="[tabs.content, sx]"
  >
    <slot />
  </TabsContent>
</template>
