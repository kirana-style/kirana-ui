import { For, createMemo, splitProps } from "solid-js"
import {
  HighlightedLine,
  useHighlightedCode,
} from "../../../../lib/solid/use-highlighted-code"
import { CodeBlockContent, CodeBlockLine } from "../../ui/code-block"
import type { Sx } from "@kirana-style/core"

export function FileCode(props: {
  code: string
  language: string
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["code", "language", "class", "sx"])
  const lines = createMemo(() => useHighlightedCode(local.code, local.language))

  return (
    <CodeBlockContent lineNumbers {...rest} class={local.class} sx={[local.sx]}>
      <For each={lines()}>
        {(line) => (
          <CodeBlockLine>
            <HighlightedLine tokens={line} />
          </CodeBlockLine>
        )}
      </For>
    </CodeBlockContent>
  )
}
