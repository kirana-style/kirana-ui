/**
 * shadcn/ui's `useHighlightedCode` (MIT) for Angular: a code's lines, highlighted, for
 * `CodeBlockLine`s, drawn by `HighlightedLine`. The highlighter is synchronous, so the first render
 * is already coloured, and a code that streams (a signal) is highlighted again as it grows.
 */
import { Component, computed, input } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import type { HighlightToken } from "@tanstack/highlight/core"

import { highlight } from "../../styles/highlight.styles"
import { highlightLines } from "../highlight-tokens"

export function useHighlightedCode(code: () => string, language: () => string) {
  return computed(() => {
    // A trailing newline would render as an extra empty line.
    const value = code()
    return highlightLines(
      value.endsWith("\n") ? value.slice(0, -1) : value,
      language()
    )
  })
}

/**
 * One line's tokens, each coloured: `<kui-highlighted-line [tokens]="line" />` inside a
 * `CodeBlockLine`, drawing no box of its own (`display: contents`). An empty line holds a newline,
 * as `CodeBlockLine` gives React's, so copying a selection keeps blank lines.
 */
@Component({
  selector: "kui-highlighted-line",
  imports: [SxDirective],
  host: { style: "display: contents" },
  // Kept on one line: it draws inside a `<pre>`, where a formatter's line breaks would show.
  // prettier-ignore
  template: `@for (token of tokens(); track $index) {@if (token.className) {<span [sx]="look(token)">{{ token.value }}</span>} @else {{{ token.value }}}} @empty {{{ "\\n" }}}`,
})
export class HighlightedLine {
  readonly tokens = input.required<HighlightToken[]>()
  protected look(token: HighlightToken) {
    return highlight[token.className as keyof typeof highlight]
  }
}
