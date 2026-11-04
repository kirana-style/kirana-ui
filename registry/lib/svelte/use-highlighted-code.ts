/**
 * shadcn/ui's `useHighlightedCode` (MIT) for Svelte: a code's lines, highlighted, for
 * `CodeBlockLine`s, drawn by `HighlightedLine`. The highlighter is synchronous, so the first render
 * is already coloured; a demo reads it through `$derived` (`const lines =
 * $derived(useHighlightedCode(code, "json"))`), so a code that streams is highlighted again as it
 * grows.
 */
import { highlightLines } from "../highlight-tokens"

export { default as HighlightedLine } from "./HighlightedLine.svelte"

export function useHighlightedCode(code: string, language: string) {
  // A trailing newline would render as an extra empty line.
  return highlightLines(
    code.endsWith("\n") ? code.slice(0, -1) : code,
    language
  )
}
