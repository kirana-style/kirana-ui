<script setup lang="ts">
import { SplitterRoot } from "@ark-ui/vue"
import type { SplitterRootProps } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import { resizable } from "../../../../styles/resizable.styles"

defineOptions({ inheritAttrs: false })

// Ark's Splitter names its panels on the group (`:panels`, `:default-size`), where
// react-resizable-panels sizes each panel: its required `panels` is declared here and passed on.
const { panels } = defineProps<{ panels: SplitterRootProps["panels"] }>()
const { sx, attrs } = useSx()
</script>

<template>
  <SplitterRoot
    data-slot="resizable-panel-group"
    :panels="panels"
    v-bind="attrs"
    :sx="[resizable.group, sx]"
  >
    <slot />
  </SplitterRoot>
</template>
