<script lang="ts">
  import { onDestroy } from "svelte"
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import type { button } from "../../../../styles/button.styles"
  import { codeBlock } from "../../../../styles/code-block.styles"
  import { visuallyHidden } from "../../../../styles/visually-hidden.styles"
  import { Button } from "../button"

  let {
    value,
    variant = "ghost",
    size = "icon-xs",
    class: className,
    ...rest
  }: {
    value: string
    variant?: ButtonVariants["variant"]
    size?: ButtonVariants["size"]
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

  type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

  let copied = $state(false)
  let timeout: ReturnType<typeof setTimeout> | undefined
  onDestroy(() => clearTimeout(timeout))

  function copy() {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        copied = true
        clearTimeout(timeout)
        timeout = setTimeout(() => (copied = false), 2000)
      })
      .catch(() => {})
  }
</script>

<Button data-slot="code-block-copy-button" data-copied={copied || undefined} variant={variant} size={size} aria-label={copied ? 'Copied' : 'Copy'} sx={[codeBlock.copyButton, className as Sx]} {...rest} onclick={copy}>
  {#if copied}
    <IconPlaceholder lucide="CheckIcon" tabler="IconCheck" hugeicons="Tick02Icon" phosphor="CheckIcon" remixicon="RiCheckLine" />
  {:else}
    <IconPlaceholder lucide="CopyIcon" tabler="IconCopy" hugeicons="Copy01Icon" phosphor="CopyIcon" remixicon="RiFileCopyLine" />
  {/if}
</Button>
<span aria-live="polite" sx={visuallyHidden}>
  {copied ? "Copied" : ""}
</span>
