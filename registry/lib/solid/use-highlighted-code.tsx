/**
 * shadcn/ui's `useHighlightedCode` (MIT) for Solid: a code's lines, highlighted, for
 * `CodeBlockLine`s, drawn by `HighlightedLine`. The highlighter is synchronous, so the first render
 * is already coloured; a demo reads it through `createMemo` when its code changes, so a code that
 * streams is highlighted again as it grows.
 */
import { props as styleProps } from "@kirana-style/core"
import type { HighlightToken } from "@tanstack/highlight/core"
import { For, Show } from "solid-js"

import { highlight } from "../../styles/highlight.styles"
import { highlightLines } from "../highlight-tokens"

export function useHighlightedCode(code: string, language: string) {
  // A trailing newline would render as an extra empty line.
  return highlightLines(
    code.endsWith("\n") ? code.slice(0, -1) : code,
    language
  )
}

/**
 * One line's tokens, each coloured; an empty line holds a newline, as `CodeBlockLine` gives React's,
 * so copying a selection keeps blank lines.
 */
export function HighlightedLine(props: { tokens: HighlightToken[] }) {
  return (
    <Show when={props.tokens.length > 0} fallback={"\n"}>
      <For each={props.tokens}>
        {(token) =>
          token.className ? (
            <span
              {...styleProps(
                highlight[token.className as keyof typeof highlight]
              )}
            >
              {token.value}
            </span>
          ) : (
            token.value
          )
        }
      </For>
    </Show>
  )
}
