<script setup lang="ts">
import { FileUpload } from "@kirana-ui/vue/file-upload"
import { useSx } from "@kirana-style/core/vue"
import { computed, inject, useSlots } from "vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import type { button } from "../../../../styles/button.styles"
import { Button } from "../button"
import { FILE_UPLOAD_ENTRY } from "./context"

defineOptions({ inheritAttrs: false })

type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

/**
 * A ghost icon Button that removes its file. With nothing in its slot it draws a cross, named
 * "Remove" and the file's name.
 */
const { variant = "ghost", size = "icon-xs" } = defineProps<{
  variant?: ButtonVariants["variant"]
  size?: ButtonVariants["size"]
}>()
const { sx, attrs } = useSx()
const slots = useSlots()
const entry = inject(FILE_UPLOAD_ENTRY, undefined)
const label = computed(() => {
  const file = entry?.().file
  return !slots.default && file ? `Remove ${file.name}` : undefined
})
</script>

<template>
  <FileUpload.ItemRemove
    data-slot="file-upload-item-remove"
    :aria-label="label"
    v-bind="attrs"
    as-child
  >
    <Button :variant="variant" :size="size" :sx="sx">
      <slot>
        <IconPlaceholder
          lucide="XIcon"
          tabler="IconX"
          hugeicons="Cancel01Icon"
          phosphor="XIcon"
          remixicon="RiCloseLine"
        />
      </slot>
    </Button>
  </FileUpload.ItemRemove>
</template>
