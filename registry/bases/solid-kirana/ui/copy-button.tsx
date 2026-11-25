import { merge, omit, untrack } from "solid-js"
import type { Sx } from "@kirana-style/core"
import type { JSX } from "@solidjs/web"

import { useCopyToClipboard } from "../../../lib/solid2/use-copy-to-clipboard"
import type { button } from "../../../styles/button.styles"
import { copyButton } from "../../../styles/copy-button.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"
import { Button } from "./button"
import { IconPlaceholder } from "./icon-placeholder"

type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

/**
 * A Button that copies `value` when pressed and, for `timeout`, shows that it did: its copy icon
 * turns to a check, `data-copied` is written, and its name becomes `copiedLabel`. Without children
 * it is an icon button named by `copyLabel`; children are drawn beside the icon and name it.
 * `onCopy` is called with the value once it is on the clipboard, `onError` when the clipboard
 * refuses it.
 */
function CopyButton(props: {
  value: string
  timeout?: number
  copyLabel?: string
  copiedLabel?: string
  onCopy?: (value: string) => void
  onError?: () => void
  variant?: ButtonVariants["variant"]
  size?: ButtonVariants["size"]
  class?: string
  sx?: Sx
  onClick?: (event: MouseEvent) => void
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const local = merge(
    {
      timeout: 2000,
      copyLabel: "Copy",
      copiedLabel: "Copied",
      variant: "ghost",
      size: "icon-sm",
    } as const,
    props
  )
  const rest = omit(
    local,
    "value",
    "timeout",
    "copyLabel",
    "copiedLabel",
    "onCopy",
    "onError",
    "variant",
    "size",
    "class",
    "sx",
    "onClick",
    "children"
  )
  // The timeout is read once, as the button is set up.
  const { isCopied, copyToClipboard } = useCopyToClipboard({
    timeout: untrack(() => local.timeout),
  })
  const iconOnly = !("children" in props)

  async function copy(event: MouseEvent) {
    local.onClick?.(event)
    if (await copyToClipboard(local.value)) local.onCopy?.(local.value)
    else local.onError?.()
  }

  return (
    <>
      <Button
        data-slot="copy-button"
        data-copied={isCopied() || undefined}
        variant={local.variant}
        size={local.size}
        aria-label={
          iconOnly
            ? isCopied()
              ? local.copiedLabel
              : local.copyLabel
            : undefined
        }
        class={local.class}
        sx={[copyButton.root, local.sx]}
        {...rest}
        onClick={copy}
      >
        <span
          data-slot="copy-button-icon"
          data-icon={iconOnly ? undefined : "inline-start"}
          sx={copyButton.icon}
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
        {local.children}
      </Button>
      <span aria-live="polite" sx={visuallyHidden}>
        {isCopied() ? local.copiedLabel : ""}
      </span>
    </>
  )
}

export { CopyButton }
