/**
 * Syntax highlighting for Code Block, as React nodes: `highlight-tokens.ts`'s lines, each token a
 * span coloured by `highlight.styles.ts`.
 */
import * as React from "react"

import { highlight } from "../styles/highlight.styles"
import { highlightLines } from "./highlight-tokens"

export { ansiText } from "./highlight-tokens"

/** One React node per line of the code, its tokens coloured. */
export function highlightCode(code: string, language: string) {
  return highlightLines(code, language).map((tokens, row) =>
    tokens.map((token, index): React.ReactNode =>
      token.className ? (
        <span key={`${row}-${index}`} sx={highlight[token.className]}>
          {token.value}
        </span>
      ) : (
        token.value
      )
    )
  )
}
