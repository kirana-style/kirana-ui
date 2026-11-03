<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"
import { onUnmounted, ref } from "vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import type { button } from "../../../../styles/button.styles"
import { codeBlock } from "../../../../styles/code-block.styles"
import { visuallyHidden } from "../../../../styles/visually-hidden.styles"
import { Button } from "../button"

defineOptions({ inheritAttrs: false })

type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

const {
  value,
  variant = "ghost",
  size = "icon-xs",
} = defineProps<{
  value: string
  variant?: ButtonVariants["variant"]
  size?: ButtonVariants["size"]
}>()
const { sx, attrs } = useSx()

const copied = ref(false)
let timeout: ReturnType<typeof setTimeout> | undefined
onUnmounted(() => clearTimeout(timeout))

function copy() {
  navigator.clipboard
    .writeText(value)
    .then(() => {
      copied.value = true
      clearTimeout(timeout)
      timeout = setTimeout(() => (copied.value = false), 2000)
    })
    .catch(() => {})
}
</script>

<template>
  <Button
    data-slot="code-block-copy-button"
    :data-copied="copied || undefined"
    :variant="variant"
    :size="size"
    :aria-label="copied ? 'Copied' : 'Copy'"
    :sx="[codeBlock.copyButton, sx]"
    v-bind="attrs"
    @click="copy"
  >
    <IconPlaceholder
      v-if="copied"
      lucide="CheckIcon"
      tabler="IconCheck"
      hugeicons="Tick02Icon"
      phosphor="CheckIcon"
      remixicon="RiCheckLine"
    />
    <IconPlaceholder
      v-else
      lucide="CopyIcon"
      tabler="IconCopy"
      hugeicons="Copy01Icon"
      phosphor="CopyIcon"
      remixicon="RiFileCopyLine"
    />
  </Button>
  <span aria-live="polite" :sx="visuallyHidden">{{
    copied ? "Copied" : ""
  }}</span>
</template>
