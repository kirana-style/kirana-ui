import { For, createMemo } from "solid-js"
import { IconPlaceholder } from "../ui/icon-placeholder"
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
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { typeset } from "../../../styles/typeset.styles"

export default function CodeBlockTypeset() {
  const styles = {
    div: css({
      width: "100%",
      maxWidth: containerSize.md,
    }),
  }

  const code = `import { streamText } from "ai"

export async function POST(request: Request) {
  const { messages } = await request.json()
  const result = streamText({ model: "anthropic/claude-sonnet-4.5", messages })

  return result.toUIMessageStreamResponse()
}`

  const lines = createMemo(() => useHighlightedCode(code, "ts"))

  return (
    <div sx={page.example}>
      <div class="typeset" sx={[typeset, styles.div]}>
        <h3>Stream a response</h3>
        <p>
          Create a route handler that calls <code>streamText</code> and returns
          the stream to the client.
        </p>
        <CodeBlock>
          <CodeBlockHeader>
            <CodeBlockTitle>
              <IconPlaceholder
                lucide="FileCodeIcon"
                tabler="IconFileCode"
                hugeicons="File01Icon"
                phosphor="FileCodeIcon"
                remixicon="RiFileCodeLine"
              />
              app/api/chat/route.ts
            </CodeBlockTitle>
            <CodeBlockActions>
              <CodeBlockCopyButton value={code} />
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
        <p>
          The <code>useChat</code> hook reads the stream on the client and
          renders the answer while it is written.
        </p>
      </div>
    </div>
  )
}
