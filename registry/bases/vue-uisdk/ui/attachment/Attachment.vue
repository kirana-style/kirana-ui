<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { attachment } from "../../../../styles/attachment.styles"

defineOptions({ inheritAttrs: false })

const {
  state = "done",
  size = "default",
  orientation = "horizontal",
} = defineProps<{
  state?: "idle" | "uploading" | "processing" | "error" | "done"
  size?: "default" | "sm" | "xs"
  orientation?: "horizontal" | "vertical"
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <div
    data-slot="attachment"
    :data-state="state"
    :data-size="size"
    :data-orientation="orientation"
    v-bind="attrs"
    :sx="[attachment.root, sx]"
  >
    <slot />
  </div>
</template>
