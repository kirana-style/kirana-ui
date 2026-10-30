import * as React from "react"
import { useChat } from "@ai-sdk/react"
import { streamingMarkdownExtension } from "@tanstack/markdown/extensions/streaming"
import { Markdown } from "@tanstack/markdown/react"
import type { MarkdownComponents } from "@tanstack/markdown/react"

import { createChat, getMessageText } from "../../../lib/ai"
import { useHighlightedCode } from "../../../lib/use-highlighted-code"
import { Bubble, BubbleContent } from "../ui/bubble"
import { Button } from "../ui/button"
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
import { css, select } from "@kirana-style/core"
import { radius, theme } from "../../../core/tokens"
import {
  containerSize,
  fontFamily,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  markdownCodeCode: css({
    borderRadius: radius.sm,
    backgroundColor: theme.muted,
    paddingInline: space[1],
    paddingBlock: space["0.5"],
    fontFamily: fontFamily.mono,
    fontSize: "0.9em",
  }),
  div: css({
    display: "flex",
    minHeight: "28rem",
    width: "100%",
    maxWidth: containerSize.md,
    flexDirection: "column",
    gap: space[4],
    paddingBlock: space[6],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
  // Streamdown's `space-y-4 whitespace-normal`, around the reply's blocks.
  markdown: css({
    whiteSpace: "normal",
    [select.child(":not(:last-child)")]: { marginBottom: space[4] },
  }),
  button: css({
    marginTop: { "*": null, base: "auto" },
    alignSelf: { "*": null, base: "flex-start" },
  }),
}

const response = `Wrap the value in a \`useDebounce\` hook. It returns the latest value once it stops changing for \`delay\` milliseconds.

\`\`\`tsx
export function useDebounce<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = React.useState(value)

  React.useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timeout)
  }, [value, delay])

  return debounced
}
\`\`\`

Pass the debounced value to your fetch instead of the raw input.`

const chat = createChat()
  .user("How do I debounce a search input in React?")
  .assistant(({ writer }) => {
    writer.text(response)
  })

const transcript = chat.get()
const [question] = chat.get(1)
const transport = chat.transport({ delayMs: 30 })

// The streaming profile drops a half-written trailing block (an empty heading, a list item
// without text) until its text arrives.
const extensions = [streamingMarkdownExtension()]

// True while the reply's last code fence has not closed yet (Streamdown's
// `useIsCodeFenceIncomplete`).
const FenceOpen = React.createContext(false)

const fenceOpen = (text: string) =>
  (text.match(/^ {0,3}(?:`{3,}|~{3,})/gm)?.length ?? 0) % 2 === 1

function MarkdownCodeBlock({
  code,
  language,
}: {
  code: string
  language: string
}) {
  // True while the closing fence has not arrived yet.
  const incomplete = React.useContext(FenceOpen)
  const lines = useHighlightedCode(code, language)

  return (
    <CodeBlock>
      <CodeBlockHeader>
        <CodeBlockTitle>{language || "text"}</CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton value={code} isDisabled={incomplete} />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent>
        {lines.map((line, index) => (
          <CodeBlockLine key={index}>{line}</CodeBlockLine>
        ))}
      </CodeBlockContent>
    </CodeBlock>
  )
}

/** Inline code. Fenced code renders through `MarkdownPre`, which reads this element's text. */
function MarkdownCode(props: React.ComponentProps<"code">) {
  return <code sx={styles.markdownCodeCode} {...props} />
}

/** A fenced block: TanStack Markdown names its language in `data-lang`. */
function MarkdownPre({
  children,
  ...props
}: React.ComponentProps<"pre"> & { "data-lang"?: string }) {
  const code = React.isValidElement<{ children?: unknown }>(children)
    ? children.props.children
    : undefined

  return (
    <MarkdownCodeBlock
      code={typeof code === "string" ? code : ""}
      language={props["data-lang"] ?? ""}
    />
  )
}

const components = {
  code: MarkdownCode,
  pre: MarkdownPre,
} satisfies MarkdownComponents

export default function CodeBlockMarkdown() {
  const { messages, sendMessage, setMessages, status } = useChat({
    messages: transcript,
    transport,
  })
  const busy = status === "submitted" || status === "streaming"

  return (
    <div sx={page.example}>
      <div sx={styles.div}>
        {messages.map((message) =>
          message.role === "user" ? (
            <Message key={message.id} align="end">
              <MessageContent>
                <Bubble align="end" variant="muted">
                  <BubbleContent>{getMessageText(message)}</BubbleContent>
                </Bubble>
              </MessageContent>
            </Message>
          ) : (
            <Message key={message.id}>
              <MessageContent>
                <FenceOpen
                  value={
                    busy &&
                    message === messages.at(-1) &&
                    fenceOpen(getMessageText(message))
                  }
                >
                  <div sx={styles.markdown}>
                    <Markdown components={components} extensions={extensions}>
                      {getMessageText(message)}
                    </Markdown>
                  </div>
                </FenceOpen>
              </MessageContent>
            </Message>
          )
        )}
        {!busy && (
          <Button
            variant="outline"
            size="sm"
            sx={styles.button}
            onPress={() => {
              setMessages([])
              void sendMessage(question)
            }}
          >
            Replay
          </Button>
        )}
      </div>
    </div>
  )
}
