import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { clientTools, useChat } from "@tanstack/ai-react"
import type { UIMessage } from "@tanstack/ai-react"
import { toolDefinition } from "@tanstack/ai/client"
import * as z from "zod"

import { createChat, getMessageText } from "../../../lib/tanstack-ai"
import { Bubble, BubbleContent } from "../ui/bubble"
import { Button } from "../ui/button"
import { CodeBlock, CodeBlockContent } from "../ui/code-block"
import { Message, MessageContent } from "../ui/message"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../ui/trace"
import { css } from "@kirana-style/core"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  toolRowCodeBlockContent: css({
    maxHeight: { "*": null, base: space[64] },
  }),
  div: css({
    display: "flex",
    minHeight: space[72],
    width: "100%",
    maxWidth: containerSize.sm,
    flexDirection: "column",
    gap: space[4],
    paddingBlock: space[6],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
  messageContent: css({
    gap: { "*": null, base: space[4] },
  }),
  button: css({
    marginTop: { "*": null, base: "auto" },
    alignSelf: { "*": null, base: "flex-start" },
  }),
}

// The tool as the server defines it; the client takes the definition for its types.
const runCommand = toolDefinition({
  name: "runCommand",
  description: "Run a shell command in the project.",
  inputSchema: z.object({ command: z.string() }),
  outputSchema: z.object({ stdout: z.string() }),
})

const tools = clientTools(runCommand)

type ChatMessage = UIMessage<typeof tools>

type ChatPart = ChatMessage["parts"][number]

type ToolPart = Extract<ChatPart, { type: "tool-call" }>

type ToolResultPart = Extract<ChatPart, { type: "tool-result" }>

const chat = createChat<typeof tools>()
  .user("Which package managers are installed?")
  .assistant(({ writer }) => {
    writer
      .tool("runCommand", { input: { command: "node --version" } })
      .sleep(900)
      .output({ stdout: "v24.18.0" })
    writer
      .tool("runCommand", { input: { command: "npm --version" } })
      .sleep(900)
      .output({ stdout: "11.6.2" })
    writer
      .tool("runCommand", { input: { command: "pnpm --version" } })
      .sleep(900)
      .error("command not found: pnpm")
    writer.text("Node 24 and npm 11 are installed. pnpm is not.")
  })

const transcript = chat.get()
const [question] = chat.get(1)
const connection = chat.transport({ delayMs: 20 })

function ToolRow({
  part,
  result,
  streaming,
  defaultExpanded,
}: {
  part: ToolPart
  result?: ToolResultPart
  streaming: boolean
  defaultExpanded?: boolean
}) {
  const command = part.input?.command

  if (part.state === "complete" || part.state === "error") {
    const failed = part.state === "error"

    return (
      <TraceCollapsible defaultExpanded={defaultExpanded}>
        <TraceCollapsibleTrigger>
          <TraceLine status={failed ? "error" : undefined}>
            <TraceIcon>
              <IconPlaceholder
                lucide="CommandIcon"
                tabler="IconCommand"
                hugeicons="CommandIcon"
                phosphor="CommandIcon"
                remixicon="RiCommandLine"
              />
            </TraceIcon>
            <TraceTitle>
              {failed ? "Failed to run" : "Ran"} {command}
            </TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          <CodeBlock size="sm">
            <CodeBlockContent wrap sx={styles.toolRowCodeBlockContent}>
              {failed ? result?.error : part.output?.stdout}
            </CodeBlockContent>
          </CodeBlock>
        </TraceCollapsibleContent>
      </TraceCollapsible>
    )
  }

  return (
    <TraceLine status={streaming ? "running" : "error"}>
      <TraceIcon>
        <IconPlaceholder
          lucide="CommandIcon"
          tabler="IconCommand"
          hugeicons="CommandIcon"
          phosphor="CommandIcon"
          remixicon="RiCommandLine"
        />
      </TraceIcon>
      <TraceTitle>
        {streaming ? "Running" : "Failed to run"} {command}
      </TraceTitle>
    </TraceLine>
  )
}

export default function ToolDemoTanstackAi() {
  const { messages, append, setMessages, status } = useChat({
    initialMessages: transcript,
    connection,
    threadId: "tool-demo",
    tools,
  })
  const busy = status === "submitted" || status === "streaming"

  return (
    <div sx={page.example}>
      <div sx={styles.div}>
        {messages.map((message) => {
          if (message.role === "user") {
            return (
              <Message key={message.id} align="end">
                <MessageContent>
                  <Bubble align="end" variant="muted">
                    <BubbleContent>{getMessageText(message)}</BubbleContent>
                  </Bubble>
                </MessageContent>
              </Message>
            )
          }

          const streaming = busy && message === messages.at(-1)
          const calls = message.parts.filter(
            (part): part is ToolPart =>
              part.type === "tool-call" && part.name === "runCommand"
          )
          const text = getMessageText(message)

          return (
            <Message key={message.id}>
              <MessageContent sx={styles.messageContent}>
                {calls.length > 0 && (
                  <Trace>
                    {calls.map((part) => (
                      <ToolRow
                        key={part.id}
                        part={part}
                        result={message.parts.find(
                          (result): result is ToolResultPart =>
                            result.type === "tool-result" &&
                            result.toolCallId === part.id
                        )}
                        streaming={streaming}
                        defaultExpanded={
                          busy ? undefined : part.state === "error"
                        }
                      />
                    ))}
                  </Trace>
                )}
                {text && <p>{text}</p>}
              </MessageContent>
            </Message>
          )
        })}
        {!busy && (
          <Button
            variant="outline"
            size="sm"
            sx={styles.button}
            onPress={() => {
              setMessages([])
              void append(question)
            }}
          >
            Replay
          </Button>
        )}
      </div>
    </div>
  )
}
