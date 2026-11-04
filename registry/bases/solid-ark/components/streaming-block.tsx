import { For, Show, createMemo, splitProps } from "solid-js"
import {
  HighlightedLine,
  useHighlightedCode,
} from "../../../lib/solid/use-highlighted-code"
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
} from "../ui/code-block"
import type { Sx } from "@kirana-style/core"

// `code-block-streaming`'s block, a component of its own as React's file declares it beside the
// example: a code that grows, highlighted again as it does.
type StreamingBlockData = {
  title?: string
  language: string
  code: string
  lineNumbers?: boolean
  highlight?: number[]
  diff?: boolean
}

export function StreamingBlock(props: {
  block: StreamingBlockData
  code: string
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["block", "code", "class", "sx"])
  const rows = createMemo(() => local.code.split("\n"))
  // A diff row starts with +, - or a space. The marker is not part of the code.
  const source = createMemo(() =>
    local.block.diff
      ? rows()
          .map((row) => row.slice(1))
          .join("\n")
      : local.code
  )
  const lines = createMemo(() =>
    useHighlightedCode(source(), local.block.language)
  )

  function variant(index: number) {
    if (local.block.diff) {
      const row = rows()[index]
      return row?.startsWith("+")
        ? "added"
        : row?.startsWith("-")
          ? "removed"
          : "default"
    }
    return local.block.highlight?.includes(index) ? "highlighted" : "default"
  }

  return (
    <CodeBlock {...rest} class={local.class} sx={[local.sx]}>
      <Show when={local.block.title}>
        <CodeBlockHeader>
          <CodeBlockTitle>{local.block.title}</CodeBlockTitle>
          <CodeBlockActions>
            <CodeBlockCopyButton
              value={source()}
              disabled={local.code.length < local.block.code.length}
            />
          </CodeBlockActions>
        </CodeBlockHeader>
      </Show>
      <CodeBlockContent lineNumbers={local.block.lineNumbers}>
        <For each={lines()}>
          {(line, index) => (
            <CodeBlockLine variant={variant(index())}>
              <HighlightedLine tokens={line} />
            </CodeBlockLine>
          )}
        </For>
      </CodeBlockContent>
    </CodeBlock>
  )
}
