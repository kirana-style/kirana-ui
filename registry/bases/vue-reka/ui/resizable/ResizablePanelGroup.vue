<script setup lang="ts">
import { SplitterGroup } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"
import { provide } from "vue"

import { resizable } from "../../../../styles/resizable.styles"
import { PANELS } from "./context"
import type { PanelEntry } from "./context"

defineOptions({ inheritAttrs: false })

// The panels are named on the group (`:panels`, `:default-size`), as on Vue's Ark UI parts, where
// Reka's Splitter sizes each panel: each panel reads its own entry by its id.
const {
  panels,
  defaultSize,
  orientation = "horizontal",
  dir,
} = defineProps<{
  panels: PanelEntry[]
  defaultSize?: number[]
  orientation?: "horizontal" | "vertical"
  dir?: "ltr" | "rtl"
}>()
const { sx, attrs } = useSx()
provide(PANELS, { panels: () => panels, defaultSize: () => defaultSize })
</script>

<template>
  <!-- Reka drags in the direction its `DirectionProvider` gives; `dir` is the element's own. -->
  <SplitterGroup
    data-slot="resizable-panel-group"
    :direction="orientation"
    :dir="dir"
    v-bind="attrs"
    :sx="[resizable.group, sx]"
  >
    <slot />
  </SplitterGroup>
</template>
