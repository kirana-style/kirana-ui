<script setup lang="ts">
import { Resizable } from "@ui-sdk/vue/resizable"
import { useSx } from "@kirana-style/core/vue"
import { provide } from "vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { resizable } from "../../../../styles/resizable.styles"
import type { PanelEntry } from "./context"
import { PANELS } from "./context"

defineOptions({ inheritAttrs: false })

/**
 * ui-sdk's resizable group, with Ark UI's props: `default-size` is its `defaultLayout` (percent, in
 * panel order), and `panels` names them and their limits, which each panel hands ui-sdk. It writes
 * react-resizable-panels' `data-group` and the group's `aria-orientation`, which the state keys read
 * on React's ui-sdk base.
 */
const {
  panels,
  defaultSize,
  orientation = "horizontal",
} = defineProps<{
  panels?: PanelEntry[]
  defaultSize?: number[]
  orientation?: "horizontal" | "vertical"
}>()
provide(PANELS, () => panels)
const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="Resizable"
    slot-name="resizable-panel-group"
    tag="div"
    :default-layout="defaultSize"
    :orientation="orientation"
    data-group=""
    :aria-orientation="orientation"
    v-bind="attrs"
    :sx="[resizable.group, resizable.groupUisdk, sx]"
  >
    <slot />
  </UisdkPart>
</template>
