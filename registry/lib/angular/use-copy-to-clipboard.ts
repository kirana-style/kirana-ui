/**
 * Copies text to the clipboard, and says so for a moment: the React hook's
 * (`../use-copy-to-clipboard.ts`) for the Angular examples, `isCopied` a signal a template reads.
 */
import { DestroyRef, inject, signal } from "@angular/core"

import { copyText } from "../clipboard"

export function useCopyToClipboard({
  timeout = 2000,
  onCopy,
}: {
  timeout?: number
  onCopy?: () => void
} = {}) {
  const isCopied = signal(false)
  let timer: ReturnType<typeof setTimeout> | undefined
  inject(DestroyRef).onDestroy(() => clearTimeout(timer))

  const copyToClipboard = async (value: string) => {
    if (!(await copyText(value))) return false
    isCopied.set(true)
    onCopy?.()
    clearTimeout(timer)
    if (timeout !== 0) timer = setTimeout(() => isCopied.set(false), timeout)
    return true
  }

  return { isCopied: isCopied.asReadonly(), copyToClipboard }
}
