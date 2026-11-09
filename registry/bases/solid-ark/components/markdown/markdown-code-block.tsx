import { For, useContext } from "solid-js"

import {
  HighlightedLine,
  useHighlightedCode,
} from "../../../../lib/solid/use-highlighted-code"
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
} from "../../ui/code-block"
import { FenceOpenContext } from "./fence-open"

export function MarkdownCodeBlock(props: { code: string; language: string }) {
  // True while the closing fence has not arrived yet.
  const incomplete = useContext(FenceOpenContext)
  const lines = () => useHighlightedCode(props.code, props.language)
  return (
    <CodeBlock>
      <CodeBlockHeader>
        <CodeBlockTitle>{props.language || "text"}</CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton value={props.code} disabled={incomplete()} />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent lineNumbers>
        <For each={lines()}>
          {(line) => (
            <CodeBlockLine>
              <HighlightedLine tokens={line} />
            </CodeBlockLine>
          )}
        </For>
      </CodeBlockContent>
    </CodeBlock>
  )
}
