import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { useChat } from "@tanstack/ai-react"
import type { UIMessage } from "@tanstack/ai-react"

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
  toolTraceCodeBlockContent: css({
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

const chat = createChat()
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

const initialMessages = chat.get(0)
const connection = chat.transport({ delayMs: 20 })

type ChatPart = UIMessage["parts"][number]

type ToolCallPart = Extract<ChatPart, { type: "tool-call" }>

type ToolResultPart = Extract<ChatPart, { type: "tool-result" }>

function ToolTrace({
  part,
  result,
  live,
}: {
  part: ToolCallPart
  result?: ToolResultPart
  live: boolean
}) {
  const command = (part.input as { command?: string } | undefined)?.command

  if (part.state === "complete" || part.state === "error") {
    const failed = part.state === "error"

    return (
      <TraceCollapsible>
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
            <CodeBlockContent wrap sx={styles.toolTraceCodeBlockContent}>
              {failed
                ? result?.error
                : (part.output as { stdout: string }).stdout}
            </CodeBlockContent>
          </CodeBlock>
        </TraceCollapsibleContent>
      </TraceCollapsible>
    )
  }

  return (
    <TraceLine status={live ? "running" : "error"}>
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
        {live ? "Running" : "Failed to run"} {command}
      </TraceTitle>
    </TraceLine>
  )
}

function groupParts(parts: UIMessage["parts"]) {
  const runs: { trace: boolean; parts: UIMessage["parts"] }[] = []

  for (const part of parts) {
    const trace = part.type === "tool-call"

    if (!trace && part.type !== "text") {
      continue
    }

    const last = runs.at(-1)

    if (last?.trace === trace) {
      last.parts.push(part)
    } else {
      runs.push({ trace, parts: [part] })
    }
  }

  return runs
}

export default function TraceToolCallsTanstackAi() {
  const { messages, append, setMessages, status } = useChat({
    initialMessages,
    connection,
    threadId: "trace-tool-calls",
  })
  const nextMessage = chat.next(messages)
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

          const live = status === "streaming" && message === messages.at(-1)

          return (
            <Message key={message.id}>
              <MessageContent sx={styles.messageContent}>
                {groupParts(message.parts).map((run, runIndex) =>
                  run.trace ? (
                    <Trace key={runIndex}>
                      {run.parts.map((part) =>
                        part.type === "tool-call" ? (
                          <ToolTrace
                            key={part.id}
                            part={part}
                            result={message.parts.find(
                              (result): result is ToolResultPart =>
                                result.type === "tool-result" &&
                                result.toolCallId === part.id
                            )}
                            live={live}
                          />
                        ) : null
                      )}
                    </Trace>
                  ) : (
                    run.parts.map((part, index) =>
                      part.type === "text" ? (
                        <p key={`${runIndex}-${index}`}>{part.content}</p>
                      ) : null
                    )
                  )
                )}
              </MessageContent>
            </Message>
          )
        })}
        {!busy && (
          <Button
            variant="outline"
            size="sm"
            sx={styles.button}
            onClick={() =>
              nextMessage ? append(nextMessage) : setMessages(initialMessages)
            }
          >
            {nextMessage ? "Send message" : "Reset"}
          </Button>
        )}
      </div>
    </div>
  )
}
