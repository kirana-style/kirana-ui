/**
 * Copies text to the clipboard, and says so for a moment: the React hook's (`../use-copy-to-clipboard.ts`)
 * for the Svelte examples, `isCopied` read as a getter so a template follows it.
 */
import { copyText } from "../clipboard"

export function useCopyToClipboard({
  timeout = 2000,
  onCopy,
}: {
  timeout?: number
  onCopy?: () => void
} = {}) {
  let isCopied = $state(false)

  const copyToClipboard = async (value: string) => {
    if (!(await copyText(value))) return false
    isCopied = true
    onCopy?.()
    if (timeout !== 0) setTimeout(() => (isCopied = false), timeout)
    return true
  }

  return {
    get isCopied() {
      return isCopied
    },
    copyToClipboard,
  }
}
