<script setup lang="ts">
import { TabsRoot } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"

import { tabs } from "../../../../styles/tabs.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <!-- A hidden panel leaves the page, as Base UI's does: Reka's default `unmount-on-hide`. -->
  <TabsRoot data-slot="tabs" v-bind="attrs" :sx="[tabs.root, sx]">
    <slot />
  </TabsRoot>
</template>
