"use client"

import * as React from "react"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { useCopyToClipboard } from "../../../lib/use-copy-to-clipboard"
import { copyButton } from "../../../styles/copy-button.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"
import { Button } from "./button"

type CopyButtonProps = Omit<
  React.ComponentProps<typeof Button>,
  "value" | "onCopy" | "onError" | "children"
> & {
  /** Drawn beside the icon, naming the button. */
  children?: React.ReactNode
  /** The text written to the clipboard. */
  value: string
  /** How long it shows that it copied, in milliseconds; `0` keeps it shown. */
  timeout?: number
  /** Its name at rest, and what a screen reader hears once it has copied. */
  copyLabel?: string
  copiedLabel?: string
  /** Called with the value once it is on the clipboard. */
  onCopy?: (value: string) => void
  /** Called when the clipboard refuses the value; it then shows nothing. */
  onError?: () => void
}

/**
 * A Button that copies `value` when pressed and, for `timeout`, shows that it did: its copy icon
 * turns to a check, `data-copied` is written, and its name becomes `copiedLabel`. Without children
 * it is an icon button named by `copyLabel`; children are drawn beside the icon and name it.
 */
function CopyButton({
  value,
  timeout = 2000,
  copyLabel = "Copy",
  copiedLabel = "Copied",
  onCopy,
  onError,
  variant = "ghost",
  size = "icon-sm",
  sx,
  onClick,
  children,
  ...props
}: CopyButtonProps) {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout })
  const iconOnly = children === undefined || children === null

  return (
    <>
      <Button
        data-slot="copy-button"
        data-copied={isCopied || undefined}
        variant={variant}
        size={size}
        aria-label={iconOnly ? (isCopied ? copiedLabel : copyLabel) : undefined}
        sx={[copyButton.root, sx]}
        onClick={(event) => {
          onClick?.(event)
          void copyToClipboard(value).then((copied) =>
            copied ? onCopy?.(value) : onError?.()
          )
        }}
        {...props}
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
        {children}
      </Button>
      <span aria-live="polite" sx={visuallyHidden}>
        {isCopied ? copiedLabel : ""}
      </span>
    </>
  )
}

export { CopyButton }
export type { CopyButtonProps }
