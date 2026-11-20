import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { clientTools, useChat } from "@tanstack/ai-react"
import type { UIMessage } from "@tanstack/ai-react"
import { toolDefinition } from "@tanstack/ai/client"
import * as z from "zod"

import { createChat, getMessageText } from "../../../lib/tanstack-ai"
import { Bubble, BubbleContent } from "../ui/bubble"
import { Button } from "../ui/button"
import { Message, MessageContent } from "../ui/message"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceDescription,
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

const planSchema = z.object({
  title: z.string(),
  steps: z.array(
    z.object({
      title: z.string(),
      status: z.enum(["done", "running", "pending"]),
    })
  ),
})

type Plan = z.infer<typeof planSchema>

// TanStack AI's connection carries no data parts, so the agent writes its plan with a tool, as it
// would a todo list: the latest call's input is the plan.
const updatePlan = toolDefinition({
  name: "updatePlan",
  description: "Write the agent's plan.",
  inputSchema: planSchema,
  outputSchema: z.string(),
})

const tools = clientTools(updatePlan)

type ChatMessage = UIMessage<typeof tools>

type ToolPart = Extract<ChatMessage["parts"][number], { type: "tool-call" }>

const STEPS = [
  "Install @base-ui/react",
  "Replace the Radix imports",
  "Rename asChild to render",
  "Run the type checker",
]

function planAt(current: number) {
  return {
    title: "Plan: migrate to Base UI",
    steps: STEPS.map((title, index) => ({
      title,
      status:
        index < current ? "done" : index === current ? "running" : "pending",
    })),
  } satisfies Plan
}

const chat = createChat<typeof tools>()
  .user("Migrate the dialog components to Base UI.")
  .assistant(({ writer }) => {
    STEPS.forEach((_, index) => {
      writer
        .tool("updatePlan", { input: planAt(index) })
        .output("Updated the plan.")
      writer.sleep(1200)
    })
    writer
      .tool("updatePlan", { input: planAt(STEPS.length) })
      .output("Updated the plan.")
    writer.text("Migrated Dialog and AlertDialog. The type checker passes.")
  })

const transcript = chat.get()
const [question] = chat.get(1)
const connection = chat.transport({ delayMs: 20 })

function PlanRow({ plan, streaming }: { plan: Plan; streaming: boolean }) {
  const done = plan.steps.filter((step) => step.status === "done").length
  const running = streaming && done < plan.steps.length

  return (
    <TraceCollapsible defaultOpen>
      <TraceCollapsibleTrigger>
        <TraceLine status={running ? "running" : undefined}>
          <TraceIcon>
            <IconPlaceholder
              lucide="RouteIcon"
              tabler="IconRoute"
              hugeicons="Route01Icon"
              phosphor="PathIcon"
              remixicon="RiRouteLine"
            />
          </TraceIcon>
          <TraceTitle>{plan.title}</TraceTitle>
          <TraceDescription>
            {done} of {plan.steps.length} done
          </TraceDescription>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent>
        <Trace>
          {plan.steps.map((step) => (
            <TraceLine
              key={step.title}
              status={
                step.status === "pending"
                  ? "pending"
                  : streaming && step.status === "running"
                    ? "running"
                    : undefined
              }
            >
              <TraceIcon>
                {step.status === "done" ? (
                  <IconPlaceholder
                    lucide="CircleCheckIcon"
                    tabler="IconCircleCheckFilled"
                    hugeicons="CheckmarkCircle01Icon"
                    phosphor="CheckCircleIcon"
                    remixicon="RiCheckboxCircleFill"
                  />
                ) : step.status === "running" ? (
                  <IconPlaceholder
                    lucide="CircleDotIcon"
                    tabler="IconCircleDot"
                    hugeicons="RecordIcon"
                    phosphor="RecordIcon"
                    remixicon="RiRecordCircleLine"
                  />
                ) : (
                  <IconPlaceholder
                    lucide="CircleIcon"
                    tabler="IconCircle"
                    hugeicons="CircleIcon"
                    phosphor="CircleIcon"
                    remixicon="RiCheckboxBlankCircleLine"
                  />
                )}
              </TraceIcon>
              <TraceTitle>{step.title}</TraceTitle>
            </TraceLine>
          ))}
        </Trace>
      </TraceCollapsibleContent>
    </TraceCollapsible>
  )
}

export default function PlanDemoTanstackAi() {
  const { messages, append, setMessages, status } = useChat({
    initialMessages: transcript,
    connection,
    threadId: "plan-demo",
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
          // A call's input is parsed once its arguments are complete.
          const plan = message.parts
            .filter(
              (part): part is ToolPart =>
                part.type === "tool-call" && part.name === "updatePlan"
            )
            .filter((part) => part.input !== undefined)
            .at(-1)?.input
          const text = getMessageText(message)

          return (
            <Message key={message.id}>
              <MessageContent sx={styles.messageContent}>
                {plan && (
                  <Trace>
                    <PlanRow plan={plan} streaming={streaming} />
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
