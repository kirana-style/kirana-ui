<script setup lang="ts">
import { FileUpload } from "@kirana-ui/vue/file-upload"
import { useSx } from "@kirana-style/core/vue"

import { fileUpload } from "../../../../styles/file-upload.styles"
import FileUploadItem from "./FileUploadItem.vue"

defineOptions({ inheritAttrs: false })

/** The list of files. With nothing in its slot it draws a `FileUploadItem` for each file. */
const { sx, attrs } = useSx()
</script>

<template>
  <FileUpload.List
    data-slot="file-upload-list"
    v-bind="attrs"
    :sx="[fileUpload.list, sx]"
  >
    <slot>
      <FileUpload.Items v-slot="{ entry }">
        <FileUploadItem :key="entry.key" :entry="entry" />
      </FileUpload.Items>
    </slot>
  </FileUpload.List>
</template>
