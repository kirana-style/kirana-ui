/**
 * shadcn/ui's `useHighlightedCode` (MIT): a code's lines, highlighted, for `CodeBlockLine`s. The
 * highlighter is synchronous, so the first render is already coloured, on the server too, and a
 * code that streams is highlighted again as it grows.
 */
import * as React from "react"

import { highlightCode } from "./highlighter"

export function useHighlightedCode(value: string, language: string) {
  // A trailing newline would render as an extra empty line.
  const code = value.endsWith("\n") ? value.slice(0, -1) : value
  return React.useMemo(() => highlightCode(code, language), [code, language])
}
