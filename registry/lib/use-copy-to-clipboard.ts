/**
 * Copies text to the clipboard, and says so for a moment: shadcn/ui's `use-copy-to-clipboard` hook
 * (MIT), from its site rather than its registry. The site's, for the examples.
 */
import * as React from "react"

import { copyText } from "./clipboard"

export function useCopyToClipboard({
  timeout = 2000,
  onCopy,
}: {
  timeout?: number
  onCopy?: () => void
} = {}) {
  const [isCopied, setIsCopied] = React.useState(false)

  const copyToClipboard = async (value: string) => {
    const hasCopied = await copyText(value)

    if (!hasCopied) {
      return false
    }

    setIsCopied(true)

    if (onCopy) {
      onCopy()
    }

    if (timeout !== 0) {
      setTimeout(() => {
        setIsCopied(false)
      }, timeout)
    }

    return true
  }

  return { isCopied, copyToClipboard }
}
