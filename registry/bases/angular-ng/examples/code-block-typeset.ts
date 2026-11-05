import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import {
  HighlightedLine,
  useHighlightedCode,
} from "../../../lib/angular/use-highlighted-code"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { typeset } from "../../../styles/typeset.styles"
import { IconPlaceholder } from "../../../icons/angular"
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
} from "../ui/code-block"

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

const lines = useHighlightedCode(
  () => code,
  () => "ts"
)

@Component({
  selector: "code-block-typeset",
  imports: [
    HighlightedLine,
    CodeBlock,
    CodeBlockActions,
    CodeBlockContent,
    CodeBlockCopyButton,
    CodeBlockHeader,
    CodeBlockLine,
    CodeBlockTitle,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div class="typeset" [sx]="[typeset, styles.div]">
        <h3>Stream a response</h3>
        <p>
          Create a route handler that calls
          <code>streamText</code>
          and returns the stream to the client.
        </p>
        <div kuiCodeBlock>
          <div kuiCodeBlockHeader>
            <div kuiCodeBlockTitle>
              <svg
                iconPlaceholder
                lucide="FileCodeIcon"
                tabler="IconFileCode"
                hugeicons="File01Icon"
                phosphor="FileCodeIcon"
                remixicon="RiFileCodeLine"
              ></svg
              >app/api/chat/route.ts
            </div>
            <div kuiCodeBlockActions>
              <button kuiCodeBlockCopyButton [value]="code"></button>
            </div>
          </div>
          <pre
            kuiCodeBlockContent
            lineNumbers
          >@for (line of lines(); track index; let index = $index) {<span kuiCodeBlockLine><kui-highlighted-line [tokens]="line" /></span>}</pre>
        </div>
        <p>
          The
          <code>useChat</code>
          hook reads the stream on the client and renders the answer while it is
          written.
        </p>
      </div>
    </div>
  `,
})
export default class CodeBlockTypeset {
  protected readonly styles = styles
  protected readonly code = code
  protected readonly lines = lines
  protected readonly page = page
  protected readonly typeset = typeset
}
