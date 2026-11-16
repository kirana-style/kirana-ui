<script setup lang="ts">
import { ResizableHandle } from "@ui-sdk/vue/resizable"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { resizable } from "../../../../styles/resizable.styles"

defineOptions({ inheritAttrs: false })

/**
 * ui-sdk's handle, which finds its panels from its place: Ark UI's `id` (`"a1:a2"`) is taken and not
 * needed. It writes react-resizable-panels' `data-separator`, which the state keys read.
 */
const { withHandle = false } = defineProps<{
  id?: string
  withHandle?: boolean
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="ResizableHandle"
    slot-name="resizable-handle"
    tag="div"
    data-separator=""
    v-bind="attrs"
    :sx="[resizable.handle, sx]"
  >
    <div v-if="withHandle" :sx="resizable.grip" />
  </UisdkPart>
</template>
