<script setup lang="ts">
import type { FileUploadEntry } from "@kirana-ui/vue"
import { FileUpload } from "@kirana-ui/vue/file-upload"
import { useSx } from "@kirana-style/core/vue"
import { provide } from "vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { fileUpload } from "../../../../styles/file-upload.styles"
import { item } from "../../../../styles/item.styles"
import { FILE_UPLOAD_ENTRY } from "./context"
import FileUploadItemName from "./FileUploadItemName.vue"
import FileUploadItemRemove from "./FileUploadItemRemove.vue"
import FileUploadItemSize from "./FileUploadItemSize.vue"

defineOptions({ inheritAttrs: false })

/**
 * One file, a row in Item's outline. With nothing in its slot it draws a file icon, the name, the
 * size and a button that removes it.
 */
const props = defineProps<{ entry: FileUploadEntry }>()
const { sx, attrs } = useSx()
provide(FILE_UPLOAD_ENTRY, () => props.entry)
</script>

<template>
  <FileUpload.Item
    data-slot="file-upload-item"
    :entry="entry"
    v-bind="attrs"
    :sx="[item.root({ variant: 'outline', size: 'sm' }), fileUpload.item, sx]"
  >
    <slot>
      <IconPlaceholder
        lucide="FileIcon"
        tabler="IconFile"
        hugeicons="FileIcon"
        phosphor="FileIcon"
        remixicon="RiFileLine"
        aria-hidden="true"
        data-slot="file-upload-item-icon"
        :sx="fileUpload.itemIcon"
      />
      <FileUploadItemName />
      <FileUploadItemSize />
      <FileUploadItemRemove />
    </slot>
  </FileUpload.Item>
</template>
