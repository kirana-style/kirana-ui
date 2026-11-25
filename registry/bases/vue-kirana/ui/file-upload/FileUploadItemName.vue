<script setup lang="ts">
import { FileUpload } from "@kirana-ui/vue/file-upload"
import { useSx } from "@kirana-style/core/vue"

import { fileUpload } from "../../../../styles/file-upload.styles"

defineOptions({ inheritAttrs: false })

/** The file's name, unless given a slot. */
const { sx, attrs } = useSx()
</script>

<template>
  <!-- Given no slot, the primitive writes the name. -->
  <FileUpload.ItemName
    v-if="$slots.default"
    data-slot="file-upload-item-name"
    v-bind="attrs"
    :sx="[fileUpload.itemName, sx]"
  >
    <slot />
  </FileUpload.ItemName>
  <FileUpload.ItemName
    v-else
    data-slot="file-upload-item-name"
    v-bind="attrs"
    :sx="[fileUpload.itemName, sx]"
  />
</template>
