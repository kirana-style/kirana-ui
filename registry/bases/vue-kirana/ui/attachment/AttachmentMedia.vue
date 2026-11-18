<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { attachment } from "../../../../styles/attachment.styles"

defineOptions({ inheritAttrs: false })

const { variant = "icon" } = defineProps<{
  variant?: "icon" | "image"
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <div
    data-slot="attachment-media"
    :data-variant="variant"
    v-bind="attrs"
    :sx="[attachment.media, variant === 'image' && attachment.mediaImage, sx]"
  >
    <slot />
  </div>
</template>
