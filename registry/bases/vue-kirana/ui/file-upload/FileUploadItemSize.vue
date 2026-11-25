<script setup lang="ts">
import { FileUpload } from "@kirana-ui/vue/file-upload"
import { useSx } from "@kirana-style/core/vue"

import { fileUpload } from "../../../../styles/file-upload.styles"

defineOptions({ inheritAttrs: false })

/** The file's size as people read one, unless given a slot. */
const { sx, attrs } = useSx()
</script>

<template>
  <!-- Given no slot, the primitive writes the size. -->
  <FileUpload.ItemSize
    v-if="$slots.default"
    data-slot="file-upload-item-size"
    v-bind="attrs"
    :sx="[fileUpload.itemSize, sx]"
  >
    <slot />
  </FileUpload.ItemSize>
  <FileUpload.ItemSize
    v-else
    data-slot="file-upload-item-size"
    v-bind="attrs"
    :sx="[fileUpload.itemSize, sx]"
  />
</template>
