<script setup lang="ts">
import { FileUpload } from "@kirana-ui/vue/file-upload"
import { useSx } from "@kirana-style/core/vue"

import type { button } from "../../../../styles/button.styles"
import { Button } from "../button"

defineOptions({ inheritAttrs: false })

type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

/** A Button that removes every file: hidden while there is none. */
const { variant = "ghost", size = "sm" } = defineProps<{
  variant?: ButtonVariants["variant"]
  size?: ButtonVariants["size"]
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <FileUpload.Clear data-slot="file-upload-clear" v-bind="attrs" as-child>
    <Button :variant="variant" :size="size" :sx="sx">
      <slot />
    </Button>
  </FileUpload.Clear>
</template>
