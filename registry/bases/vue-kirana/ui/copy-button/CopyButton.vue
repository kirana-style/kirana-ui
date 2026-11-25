<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"
import { computed, useSlots } from "vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { useCopyToClipboard } from "../../../../lib/vue/use-copy-to-clipboard"
import type { button } from "../../../../styles/button.styles"
import { copyButton } from "../../../../styles/copy-button.styles"
import { visuallyHidden } from "../../../../styles/visually-hidden.styles"
import { Button } from "../button"

defineOptions({ inheritAttrs: false })

type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

/**
 * A Button that copies `value` when pressed and, for `timeout`, shows that it did: its copy icon
 * turns to a check, `data-copied` is written, and its name becomes `copiedLabel`. Without a slot
 * it is an icon button named by `copyLabel`; the slot is drawn beside the icon and names it.
 * `copy` is emitted with the value once it is on the clipboard, `error` when the clipboard refuses it.
 */
const {
  value,
  timeout = 2000,
  copyLabel = "Copy",
  copiedLabel = "Copied",
  variant = "ghost",
  size = "icon-sm",
} = defineProps<{
  value: string
  timeout?: number
  copyLabel?: string
  copiedLabel?: string
  variant?: ButtonVariants["variant"]
  size?: ButtonVariants["size"]
}>()
const emit = defineEmits<{ copy: [value: string]; error: [] }>()
const { sx, attrs } = useSx()
const slots = useSlots()

// The timeout is read once, as the button is set up.
const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout })
const iconOnly = computed(() => !slots.default)

async function copy() {
  if (await copyToClipboard(value)) emit("copy", value)
  else emit("error")
}
</script>

<template>
  <Button
    data-slot="copy-button"
    :data-copied="isCopied || undefined"
    :variant="variant"
    :size="size"
    :aria-label="iconOnly ? (isCopied ? copiedLabel : copyLabel) : undefined"
    :sx="[copyButton.root, sx]"
    v-bind="attrs"
    @click="copy"
  >
    <span
      data-slot="copy-button-icon"
      :data-icon="iconOnly ? undefined : 'inline-start'"
      :sx="copyButton.icon"
    >
      <IconPlaceholder
        lucide="CopyIcon"
        tabler="IconCopy"
        hugeicons="Copy01Icon"
        phosphor="CopyIcon"
        remixicon="RiFileCopyLine"
      />
      <IconPlaceholder
        lucide="CheckIcon"
        tabler="IconCheck"
        hugeicons="Tick02Icon"
        phosphor="CheckIcon"
        remixicon="RiCheckLine"
      />
    </span>
    <slot />
  </Button>
  <span aria-live="polite" :sx="visuallyHidden">{{
    isCopied ? copiedLabel : ""
  }}</span>
</template>
