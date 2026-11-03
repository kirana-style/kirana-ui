/**
 * Copies text to the clipboard: the Clipboard API, or a selected text area where it is missing or
 * refused. From shadcn/ui's `use-copy-to-clipboard` hook (MIT), shared by each framework's.
 */
function legacyCopyToClipboard(value: string) {
  const textArea = document.createElement("textarea")
  textArea.value = value
  textArea.setAttribute("readonly", "")
  textArea.style.position = "fixed"
  textArea.style.opacity = "0"
  textArea.style.pointerEvents = "none"

  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()
  textArea.setSelectionRange(0, value.length)

  let hasCopied = false
  try {
    hasCopied = document.execCommand("copy")
  } catch {
    hasCopied = false
  }

  document.body.removeChild(textArea)
  return hasCopied
}

export async function copyText(value: string) {
  if (typeof window === "undefined" || !value) return false
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value)
      return true
    } catch {
      return legacyCopyToClipboard(value)
    }
  }
  return legacyCopyToClipboard(value)
}
