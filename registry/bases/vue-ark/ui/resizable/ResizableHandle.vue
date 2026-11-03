<script setup lang="ts">
import { SplitterResizeTrigger } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import { resizable } from "../../../../styles/resizable.styles"

defineOptions({ inheritAttrs: false })

// Ark's required `id`, the two panels it sits between (`"a:b"`), declared here and passed on.
const { id, withHandle = false } = defineProps<{
  id: `${string}:${string}`
  withHandle?: boolean
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <!-- A div, as react-resizable-panels' handle. -->
  <SplitterResizeTrigger :id="id" as-child>
    <div
      data-slot="resizable-handle"
      v-bind="attrs"
      :sx="[resizable.handle, sx]"
    >
      <div v-if="withHandle" :sx="resizable.grip" />
    </div>
  </SplitterResizeTrigger>
</template>
