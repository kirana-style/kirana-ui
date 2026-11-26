<script setup lang="ts">
import { css } from "@kirana-style/core"

import IconPlaceholder from "../../../icons/IconPlaceholder.vue"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import {
  FileUpload,
  FileUploadList,
  FileUploadTrigger,
} from "../ui/file-upload"

const styles = {
  upload: css({ maxWidth: containerSize.sm }),
}
</script>

<template>
  <div :sx="page.example">
    <FileUpload accept=".pdf,.doc,.docx" :sx="styles.upload">
      <FileUploadTrigger>
        <IconPlaceholder
          lucide="UploadCloudIcon"
          tabler="IconCloudUpload"
          hugeicons="CloudUploadIcon"
          phosphor="CloudArrowUpIcon"
          remixicon="RiUploadCloudLine"
        />
        Upload your CV
      </FileUploadTrigger>
      <FileUploadList />
    </FileUpload>
  </div>
</template>
