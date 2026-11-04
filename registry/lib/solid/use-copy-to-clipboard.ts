/**
 * Copies text to the clipboard, and says so for a moment: the React hook's
 * (`../use-copy-to-clipboard.ts`) for the Solid examples, `isCopied` a signal.
 */
import { createSignal } from "solid-js"

import { copyText } from "../clipboard"

export function useCopyToClipboard({
  timeout = 2000,
  onCopy,
}: {
  timeout?: number
  onCopy?: () => void
} = {}) {
  const [isCopied, setIsCopied] = createSignal(false)

  const copyToClipboard = async (value: string) => {
    if (!(await copyText(value))) return false
    setIsCopied(true)
    onCopy?.()
    if (timeout !== 0) setTimeout(() => setIsCopied(false), timeout)
    return true
  }

  return { isCopied, copyToClipboard }
}
