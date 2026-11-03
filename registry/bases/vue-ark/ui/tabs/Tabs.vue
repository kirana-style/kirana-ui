<script setup lang="ts">
import { TabsRoot } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import { tabs } from "../../../../styles/tabs.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <!-- A hidden panel leaves the page, as Base UI's does. -->
  <TabsRoot
    data-slot="tabs"
    lazy-mount
    unmount-on-exit
    v-bind="attrs"
    :sx="[tabs.root, sx]"
  >
    <slot />
  </TabsRoot>
</template>
