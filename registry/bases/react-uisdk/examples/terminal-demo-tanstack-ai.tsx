import { IconPlaceholder } from "../../../icons/icon-placeholder"
import * as React from "react"
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
  commandRowCodeBlockContent: css({
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
  outputSchema: z.object({ exitCode: z.number(), output: z.string() }),
})

const tools = clientTools(runCommand)

type ChatMessage = UIMessage<typeof tools>

type ChatPart = ChatMessage["parts"][number]

type ToolPart = Extract<ChatPart, { type: "tool-call" }>

type ToolResultPart = Extract<ChatPart, { type: "tool-result" }>

const COMMANDS = [
  {
    id: "lint",
    command: "pnpm lint",
    output: ["> acme-chat@0.1.0 lint", "> eslint ."],
  },
  {
    id: "test",
    command: "pnpm test",
    output: [
      "> acme-chat@0.1.0 test",
      "> vitest run",
      "",
      " ✓ lib/ai.test.ts (6 tests) 41ms",
      " ✓ components/chat.test.tsx (9 tests) 212ms",
      "",
      " Test Files  2 passed (2)",
      "      Tests  15 passed (15)",
    ],
  },
  {
    id: "build",
    command: "pnpm build",
    output: [
      "> acme-chat@0.1.0 build",
      "> next build",
      "",
      "   ▲ Next.js 16.3.0",
      "   Creating an optimized production build ...",
      " ✓ Compiled successfully in 4.2s",
      " ✓ Generating static pages (12/12)",
      "",
      "Route (app)                Size  First Load JS",
      "┌ ○ /                     1.9 kB       112 kB",
      "└ ƒ /api/chat              141 B       102 kB",
    ],
  },
]

const chat = createChat<typeof tools>()
  .user("Run the checks, then build the app.")
  .assistant(({ writer }) => {
    for (const { id, command, output } of COMMANDS) {
      // TanStack AI's connection carries no data parts, so the output arrives with the result.
      writer
        .tool("runCommand", { toolCallId: id, input: { command } })
        .sleep(200 * output.length)
        .output({ exitCode: 0, output: output.join("\n") })
    }

    writer.text("Lint and tests pass, and the build compiled both routes.")
  })

const transcript = chat.get()
const [question] = chat.get(1)
const connection = chat.transport({ delayMs: 20 })

function getTitle(part: ToolPart, running: boolean) {
  const command = part.input?.command

  if (part.state === "complete" && part.output) {
    return part.output.exitCode === 0
      ? `Ran ${command}`
      : `${command} exited with code ${part.output.exitCode}`
  }

  return running ? `Running ${command}` : `Failed to run ${command}`
}

function CommandRow({
  part,
  result,
  streaming,
  defaultOpen,
}: {
  part: ToolPart
  result?: ToolResultPart
  streaming: boolean
  defaultOpen?: boolean
}) {
  const [open, setOpen] = React.useState(defaultOpen)
  const output = part.output?.output ?? ""
  const running =
    streaming &&
    (part.state === "input-streaming" || part.state === "input-complete")
  const failed =
    !running && (part.state !== "complete" || part.output?.exitCode !== 0)

  return (
    <TraceCollapsible
      open={open ?? (running && output.length > 0)}
      onOpenChange={setOpen}
    >
      <TraceCollapsibleTrigger>
        <TraceLine status={running ? "running" : failed ? "error" : undefined}>
          <TraceIcon>
            <IconPlaceholder
              lucide="CommandIcon"
              tabler="IconCommand"
              hugeicons="CommandIcon"
              phosphor="CommandIcon"
              remixicon="RiCommandLine"
            />
          </TraceIcon>
          <TraceTitle>{getTitle(part, running)}</TraceTitle>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent>
        <CodeBlock size="sm">
          <CodeBlockContent wrap sx={styles.commandRowCodeBlockContent}>
            {part.state === "error" ? result?.error : output}
          </CodeBlockContent>
        </CodeBlock>
      </TraceCollapsibleContent>
    </TraceCollapsible>
  )
}

export default function TerminalDemoTanstackAi() {
  const { messages, append, setMessages, status } = useChat({
    initialMessages: transcript,
    connection,
    threadId: "terminal-demo",
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
                      <CommandRow
                        key={part.id}
                        part={part}
                        result={message.parts.find(
                          (result): result is ToolResultPart =>
                            result.type === "tool-result" &&
                            result.toolCallId === part.id
                        )}
                        streaming={streaming}
                        defaultOpen={busy ? undefined : part === calls.at(-1)}
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
            onClick={() => {
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
