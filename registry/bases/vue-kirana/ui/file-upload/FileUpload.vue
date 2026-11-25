<script setup lang="ts">
import { FileUpload } from "@kirana-ui/vue/file-upload"
import { useSx } from "@kirana-style/core/vue"

import { fileUpload } from "../../../../styles/file-upload.styles"

defineOptions({ inheritAttrs: false })

/** The root: the files it holds bind with `v-model:files`. */
const { sx, attrs } = useSx()
</script>

<template>
  <FileUpload.Root
    data-slot="file-upload"
    v-bind="attrs"
    :sx="[fileUpload.root, sx]"
  >
    <slot />
  </FileUpload.Root>
</template>
