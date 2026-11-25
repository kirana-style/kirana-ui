<script setup lang="ts">
import type { FileRejection } from "@kirana-ui/vue"
import { css } from "@kirana-style/core"
import { ref } from "vue"

import IconPlaceholder from "../../../icons/IconPlaceholder.vue"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import {
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty"
import { FieldError } from "../ui/field"
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadList,
  FileUploadTrigger,
} from "../ui/file-upload"

const styles = {
  upload: css({ maxWidth: containerSize.sm }),
}

const MAX_SIZE = 2 * 1024 * 1024

/** What the page says of a file it did not take. */
function why(rejection: FileRejection) {
  if (rejection.reasons.includes("type"))
    return `${rejection.file.name} is not an image.`
  if (rejection.reasons.includes("too-large"))
    return `${rejection.file.name} is larger than 2 MB.`
  return `${rejection.file.name} could not be added.`
}

const errors = ref<string[]>([])
</script>

<template>
  <div :sx="page.example">
    <FileUpload
      multiple
      accept="image/*"
      :max-size="MAX_SIZE"
      :sx="styles.upload"
      @files-change="errors = []"
      @files-reject="
        (rejections: FileRejection[]) => (errors = rejections.map(why))
      "
    >
      <FileUploadDropzone aria-label="Upload photos">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <IconPlaceholder
              lucide="ImageIcon"
              tabler="IconPhoto"
              hugeicons="ImageIcon"
              phosphor="ImageIcon"
              remixicon="RiImageLine"
            />
          </EmptyMedia>
          <EmptyTitle>Add photos</EmptyTitle>
          <EmptyDescription
            >PNG, JPG or WebP, up to 2 MB each.</EmptyDescription
          >
        </EmptyHeader>
        <FileUploadTrigger size="sm">Choose images</FileUploadTrigger>
      </FileUploadDropzone>
      <FieldError
        v-if="errors.length > 0"
        :errors="errors.map((message) => ({ message }))"
      />
      <FileUploadList />
    </FileUpload>
  </div>
</template>
