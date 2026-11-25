<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { Snippet } from "svelte"
  import type { ClassValue } from "svelte/elements"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { useCopyToClipboard } from "../../../../lib/svelte/use-copy-to-clipboard.svelte"
  import type { button } from "../../../../styles/button.styles"
  import { copyButton } from "../../../../styles/copy-button.styles"
  import { visuallyHidden } from "../../../../styles/visually-hidden.styles"
  import { Button } from "../button"

  type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

  /**
   * A Button that copies `value` when pressed and, for `timeout`, shows that it did: its copy icon
   * turns to a check, `data-copied` is written, and its name becomes `copiedLabel`. Without children
   * it is an icon button named by `copyLabel`; children are drawn beside the icon and name it.
   * `onCopy` is called with the value once it is on the clipboard, `onError` when the clipboard
   * refuses it. A caller's `sx` arrives as `class`, merged last.
   */
  let {
    value,
    timeout = 2000,
    copyLabel = "Copy",
    copiedLabel = "Copied",
    onCopy,
    onError,
    variant = "ghost",
    size = "icon-sm",
    class: className,
    onclick,
    children,
    ...rest
  }: {
    value: string
    timeout?: number
    copyLabel?: string
    copiedLabel?: string
    onCopy?: (value: string) => void
    onError?: () => void
    variant?: ButtonVariants["variant"]
    size?: ButtonVariants["size"]
    class?: ClassValue | null
    onclick?: (event: MouseEvent) => void
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  // The timeout is read once, as the button is set up.
  const clipboard = useCopyToClipboard({
    get timeout() {
      return timeout
    },
  })
  const iconOnly = $derived(!children)

  async function copy(event: MouseEvent) {
    onclick?.(event)
    if (await clipboard.copyToClipboard(value)) onCopy?.(value)
    else onError?.()
  }
</script>

<Button
  data-slot="copy-button"
  data-copied={clipboard.isCopied || undefined}
  {variant}
  {size}
  aria-label={iconOnly ? (clipboard.isCopied ? copiedLabel : copyLabel) : undefined}
  sx={[copyButton.root, className as Sx]}
  {...rest}
  onclick={copy}
>
  <span data-slot="copy-button-icon" data-icon={iconOnly ? undefined : "inline-start"} sx={copyButton.icon}>
    <IconPlaceholder lucide="CopyIcon" tabler="IconCopy" hugeicons="Copy01Icon" phosphor="CopyIcon" remixicon="RiFileCopyLine" />
    <IconPlaceholder lucide="CheckIcon" tabler="IconCheck" hugeicons="Tick02Icon" phosphor="CheckIcon" remixicon="RiCheckLine" />
  </span>
  {@render children?.()}
</Button>
<span aria-live="polite" sx={visuallyHidden}>
  {clipboard.isCopied ? copiedLabel : ""}
</span>
