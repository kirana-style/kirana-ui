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
  testRowCodeBlockContent: css({
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

const testSchema = z.object({
  name: z.string(),
  status: z.enum(["passed", "failed", "skipped"]),
  error: z.string().optional(),
})

type Test = z.infer<typeof testSchema>

// The tool as the server defines it; the client takes the definition for its types.
const runTests = toolDefinition({
  name: "runTests",
  description: "Run the project's tests.",
  inputSchema: z.object({ command: z.string() }),
  outputSchema: z.object({
    suites: z.array(z.object({ name: z.string(), tests: z.array(testSchema) })),
  }),
})

const tools = clientTools(runTests)

type ChatMessage = UIMessage<typeof tools>

type ToolPart = Extract<ChatMessage["parts"][number], { type: "tool-call" }>

const chat = createChat<typeof tools>()
  .user("Run the checkout tests.")
  .assistant(({ writer }) => {
    writer
      .tool("runTests", { input: { command: "pnpm test checkout" } })
      .sleep(1500)
      .output({
        suites: [
          {
            name: "cart.test.ts",
            tests: [
              { name: "adds an item", status: "passed" },
              { name: "removes an item", status: "passed" },
              { name: "applies a discount code", status: "passed" },
            ],
          },
          {
            name: "payment.test.ts",
            tests: [
              { name: "charges the saved card", status: "passed" },
              {
                name: "retries a declined card",
                status: "failed",
                error: `Expected 2 charge attempts, received 1

  at Object.<anonymous> (src/payment.test.ts:58:22)`,
              },
            ],
          },
        ],
      })
    writer.text(
      "One test failed. The payment client does not retry a declined card, so the second charge attempt never happens."
    )
  })

const transcript = chat.get()
const [question] = chat.get(1)
const connection = chat.transport({ delayMs: 20 })

function countTests(tests: Test[]) {
  return {
    total: tests.length,
    failed: tests.filter((test) => test.status === "failed").length,
    skipped: tests.filter((test) => test.status === "skipped").length,
  }
}

function formatCounts({
  total,
  failed,
  skipped,
}: ReturnType<typeof countTests>) {
  return [
    `${total} tests`,
    failed > 0 && `${failed} failed`,
    skipped > 0 && `${skipped} skipped`,
  ]
    .filter(Boolean)
    .join(", ")
}

function TestRow({ test }: { test: Test }) {
  if (test.status === "failed") {
    return (
      <TraceCollapsible defaultOpen>
        <TraceCollapsibleTrigger>
          <TraceLine status="error">
            <TraceIcon>
              <IconPlaceholder
                lucide="XIcon"
                tabler="IconX"
                hugeicons="Cancel01Icon"
                phosphor="XIcon"
                remixicon="RiCloseLine"
              />
            </TraceIcon>
            <TraceTitle>{test.name}</TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          <CodeBlock size="sm">
            <CodeBlockContent wrap sx={styles.testRowCodeBlockContent}>
              {test.error}
            </CodeBlockContent>
          </CodeBlock>
        </TraceCollapsibleContent>
      </TraceCollapsible>
    )
  }

  return (
    <TraceLine>
      <TraceIcon>
        {test.status === "skipped" ? (
          <IconPlaceholder
            lucide="CircleDashedIcon"
            tabler="IconCircleDashed"
            hugeicons="DashedLineCircleIcon"
            phosphor="CircleDashedIcon"
            remixicon="RiLoaderLine"
          />
        ) : (
          <IconPlaceholder
            lucide="CheckIcon"
            tabler="IconCheck"
            hugeicons="Tick02Icon"
            phosphor="CheckIcon"
            remixicon="RiCheckLine"
          />
        )}
      </TraceIcon>
      <TraceTitle>
        {test.status === "skipped" ? `Skipped ${test.name}` : test.name}
      </TraceTitle>
    </TraceLine>
  )
}

function TestResultsRow({
  part,
  streaming,
}: {
  part: ToolPart
  streaming: boolean
}) {
  const command = part.input?.command

  if (part.state !== "complete" || !part.output) {
    const running = streaming && part.state !== "error"

    return (
      <TraceLine status={running ? "running" : "error"}>
        <TraceIcon>
          <IconPlaceholder
            lucide="FlaskConicalIcon"
            tabler="IconFlask"
            hugeicons="TestTube01Icon"
            phosphor="FlaskIcon"
            remixicon="RiFlaskLine"
          />
        </TraceIcon>
        <TraceTitle>
          {running ? "Running" : "Failed to run"} {command}
        </TraceTitle>
      </TraceLine>
    )
  }

  const { suites } = part.output
  const summary = countTests(suites.flatMap((suite) => suite.tests))

  return (
    <TraceCollapsible defaultOpen={summary.failed > 0}>
      <TraceCollapsibleTrigger>
        <TraceLine status={summary.failed > 0 ? "error" : undefined}>
          <TraceIcon>
            <IconPlaceholder
              lucide="FlaskConicalIcon"
              tabler="IconFlask"
              hugeicons="TestTube01Icon"
              phosphor="FlaskIcon"
              remixicon="RiFlaskLine"
            />
          </TraceIcon>
          <TraceTitle>Ran {formatCounts(summary)}</TraceTitle>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent keepMounted>
        <Trace>
          {suites.map((suite) => {
            const counts = countTests(suite.tests)

            return (
              <TraceCollapsible
                key={suite.name}
                defaultOpen={counts.failed > 0}
              >
                <TraceCollapsibleTrigger>
                  <TraceLine status={counts.failed > 0 ? "error" : undefined}>
                    <TraceIcon>
                      <IconPlaceholder
                        lucide="FileCodeIcon"
                        tabler="IconFileCode"
                        hugeicons="File01Icon"
                        phosphor="FileCodeIcon"
                        remixicon="RiFileCodeLine"
                      />
                    </TraceIcon>
                    <TraceTitle>
                      {suite.name}, {formatCounts(counts)}
                    </TraceTitle>
                  </TraceLine>
                </TraceCollapsibleTrigger>
                <TraceCollapsibleContent keepMounted>
                  <Trace>
                    {suite.tests.map((test) => (
                      <TestRow key={test.name} test={test} />
                    ))}
                  </Trace>
                </TraceCollapsibleContent>
              </TraceCollapsible>
            )
          })}
        </Trace>
      </TraceCollapsibleContent>
    </TraceCollapsible>
  )
}

export default function TestResultsDemoTanstackAi() {
  const { messages, append, setMessages, status } = useChat({
    initialMessages: transcript,
    connection,
    threadId: "test-results-demo",
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
              part.type === "tool-call" && part.name === "runTests"
          )
          const text = getMessageText(message)

          return (
            <Message key={message.id}>
              <MessageContent sx={styles.messageContent}>
                {calls.length > 0 && (
                  <Trace>
                    {calls.map((part) => (
                      <TestResultsRow
                        key={part.id}
                        part={part}
                        streaming={streaming}
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
