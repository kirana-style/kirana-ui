/**
 * Copies text to the clipboard, and says so for a moment: the React hook's composable
 * (`../use-copy-to-clipboard.ts`), for the Vue examples.
 */
import { ref } from "vue"

import { copyText } from "../clipboard"

export function useCopyToClipboard({
  timeout = 2000,
  onCopy,
}: {
  timeout?: number
  onCopy?: () => void
} = {}) {
  const isCopied = ref(false)

  const copyToClipboard = async (value: string) => {
    if (!(await copyText(value))) return false
    isCopied.value = true
    onCopy?.()
    if (timeout !== 0) setTimeout(() => (isCopied.value = false), timeout)
    return true
  }

  return { isCopied, copyToClipboard }
}
