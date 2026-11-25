<script setup lang="ts">
import { FileUpload } from "@kirana-ui/vue/file-upload"
import { useSx } from "@kirana-style/core/vue"

import { empty } from "../../../../styles/empty.styles"
import { fileUpload } from "../../../../styles/file-upload.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <FileUpload.Dropzone
    data-slot="file-upload-dropzone"
    v-bind="attrs"
    :sx="[empty.root, fileUpload.dropzone, sx]"
  >
    <slot />
  </FileUpload.Dropzone>
</template>
