import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import {
  HighlightedLine,
  useHighlightedCode,
} from "../../../lib/angular/use-highlighted-code"
import { css } from "@kirana-style/core"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Bubble, BubbleContent } from "../ui/bubble"
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
} from "../ui/code-block"
import { Message, MessageContent } from "../ui/message"

const styles = {
  div: css({
    display: "flex",
    width: "100%",
    maxWidth: containerSize.md,
    flexDirection: "column",
    gap: space[4],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
  messageContent: css({
    gap: { "*": null, base: space[3] },
  }),
}

const code = `import { streamText } from "ai"

export async function POST(request: Request) {
  const { messages } = await request.json()

  const result = streamText({
    model: "anthropic/claude-sonnet-4.5",
    messages,
  })

  return result.toUIMessageStreamResponse()
}`

const lines = useHighlightedCode(
  () => code,
  () => "ts"
)

@Component({
  selector: "code-block-chat",
  imports: [
    HighlightedLine,
    Bubble,
    BubbleContent,
    CodeBlock,
    CodeBlockActions,
    CodeBlockContent,
    CodeBlockCopyButton,
    CodeBlockHeader,
    CodeBlockLine,
    CodeBlockTitle,
    Message,
    MessageContent,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.div">
        <div kuiMessage align="end">
          <div kuiMessageContent>
            <div kuiBubble variant="muted">
              <div kuiBubbleContent>How do I stream a response?</div>
            </div>
          </div>
        </div>
        <div kuiMessage>
          <div kuiMessageContent [sx]="styles.messageContent">
            <p>Create a route handler that returns the stream:</p>
            <div kuiCodeBlock>
              <div kuiCodeBlockHeader>
                <div kuiCodeBlockTitle>app/api/chat/route.ts</div>
                <div kuiCodeBlockActions>
                  <button kuiCodeBlockCopyButton [value]="code"></button>
                </div>
              </div>
              <pre
                kuiCodeBlockContent
              >@for (line of lines(); track index; let index = $index) {<span kuiCodeBlockLine><kui-highlighted-line [tokens]="line" /></span>}</pre>
            </div>
            <p>The client reads it with useChat.</p>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class CodeBlockChat {
  protected readonly styles = styles
  protected readonly code = code
  protected readonly lines = lines
  protected readonly page = page
}
