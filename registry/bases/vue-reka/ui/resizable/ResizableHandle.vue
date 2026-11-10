<script setup lang="ts">
import { SplitterResizeHandle } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"

import { resizable } from "../../../../styles/resizable.styles"

defineOptions({ inheritAttrs: false })

// `id`, the two panels it sits between (`"a:b"`), as Vue's Ark UI parts name a handle: Reka finds
// them by the handle's place, so it is only declared.
const { withHandle = false } = defineProps<{
  id?: `${string}:${string}`
  withHandle?: boolean
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <!-- A div that never shrinks, as react-resizable-panels' handle (its inline `flex-shrink`). -->
  <SplitterResizeHandle
    data-slot="resizable-handle"
    as="div"
    :style="{ flexShrink: 0 }"
    v-bind="attrs"
    :sx="[resizable.handle, sx]"
  >
    <div v-if="withHandle" :sx="resizable.grip" />
  </SplitterResizeHandle>
</template>
