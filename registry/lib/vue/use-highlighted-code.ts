/**
 * shadcn/ui's `useHighlightedCode` (MIT) for Vue: a code's lines, highlighted, for
 * `CodeBlockLine`s, drawn by `HighlightedLine`. The highlighter is synchronous, so the first render
 * is already coloured, and a code that streams is highlighted again as it grows.
 */
import { props as styleProps } from "@kirana-style/core"
import { computed, defineComponent, h, toValue } from "vue"
import type { HighlightToken } from "@tanstack/highlight/core"
import type { MaybeRefOrGetter, PropType } from "vue"

import { highlight } from "../../styles/highlight.styles"
import { highlightLines } from "../highlight-tokens"

export function useHighlightedCode(
  value: MaybeRefOrGetter<string>,
  language: MaybeRefOrGetter<string>
) {
  return computed(() => {
    // A trailing newline would render as an extra empty line.
    const code = toValue(value)
    return highlightLines(
      code.endsWith("\n") ? code.slice(0, -1) : code,
      toValue(language)
    )
  })
}

/**
 * One line's tokens, each coloured; an empty line holds a newline, as `CodeBlockLine` gives React's,
 * so copying a selection keeps blank lines.
 */
export const HighlightedLine = defineComponent({
  name: "HighlightedLine",
  props: {
    tokens: { type: Array as PropType<HighlightToken[]>, required: true },
  },
  setup(props) {
    return () =>
      props.tokens.length === 0
        ? "\n"
        : props.tokens.map((token) => {
            if (!token.className) return token.value
            const { className, style } = styleProps(highlight[token.className])
            return h("span", { class: className, style }, token.value)
          })
  },
})
