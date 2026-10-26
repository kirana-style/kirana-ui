<script setup lang="ts">
import { TabsRoot } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import { tabs } from "../../../../styles/tabs.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <TabsRoot data-slot="tabs" v-bind="attrs" :sx="[tabs.root, sx]">
    <slot />
  </TabsRoot>
</template>
