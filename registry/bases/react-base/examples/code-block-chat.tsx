import { useHighlightedCode } from "../../../lib/use-highlighted-code"
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
import { css } from "@kirana-style/core"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"

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

export default function CodeBlockChat() {
  const lines = useHighlightedCode(code, "ts")

  return (
    <div sx={page.example}>
      <div sx={styles.div}>
        <Message align="end">
          <MessageContent>
            <Bubble variant="muted">
              <BubbleContent>How do I stream a response?</BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
        <Message>
          <MessageContent sx={styles.messageContent}>
            <p>Create a route handler that returns the stream:</p>
            <CodeBlock>
              <CodeBlockHeader>
                <CodeBlockTitle>app/api/chat/route.ts</CodeBlockTitle>
                <CodeBlockActions>
                  <CodeBlockCopyButton value={code} />
                </CodeBlockActions>
              </CodeBlockHeader>
              <CodeBlockContent>
                {lines.map((line, index) => (
                  <CodeBlockLine key={index}>{line}</CodeBlockLine>
                ))}
              </CodeBlockContent>
            </CodeBlock>
            <p>The client reads it with useChat.</p>
          </MessageContent>
        </Message>
      </div>
    </div>
  )
}
