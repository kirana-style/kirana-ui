<script setup lang="ts">
import type { FileUploadEntry } from "@kirana-ui/vue"
import { FileUpload } from "@kirana-ui/vue/file-upload"

/** Draws its slot once for each file, given `entry`. It draws no element. */
defineSlots<{ default: (props: { entry: FileUploadEntry }) => unknown }>()
</script>

<template>
  <FileUpload.Items v-slot="{ entry }">
    <slot :entry="entry" />
  </FileUpload.Items>
</template>
