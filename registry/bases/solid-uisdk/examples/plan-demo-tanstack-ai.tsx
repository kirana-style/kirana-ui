import { PlanRow } from "../components/plan-demo-tanstack-ai/plan-row"
import { For, Show, createMemo } from "solid-js"
import { toolDefinition } from "@tanstack/ai"
import { useChat } from "../../../lib/solid2/tanstack-chat"
import { createChat, getMessageText } from "../../../lib/tanstack-ai"
import { Bubble, BubbleContent } from "../ui/bubble"
import { Button } from "../ui/button"
import { Message, MessageContent } from "../ui/message"
import { Trace } from "../ui/trace"
import { css } from "@kirana-style/core"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { z } from "zod"
import type { UIMessage } from "@tanstack/ai-client"
import type { Plan } from "../components/plan-demo-tanstack-ai/plan-row"

export default function PlanDemoTanstackAi() {
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

  // TanStack AI's messages have no data parts: the agent writes the whole plan with a tool each
  // time a step moves, and the latest call is the plan.
  const updatePlan = toolDefinition({
    name: "updatePlan",
    description: "Write the plan, with each step's status.",
    inputSchema: z.object({
      title: z.string(),
      steps: z.array(
        z.object({
          title: z.string(),
          status: z.enum(["done", "running", "pending"]),
        })
      ),
    }),
  })
  const tools = [updatePlan] as const

  type ChatMessage = UIMessage<typeof tools>

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
        writer.tool("updatePlan", { input: planAt(index) }).output({})
        writer.sleep(1200)
      })
      writer.tool("updatePlan", { input: planAt(STEPS.length) }).output({})
      writer.text("Migrated Dialog and AlertDialog. The type checker passes.")
    })

  const transcript = chat.get()

  const [question] = chat.get(1)

  const connection = chat.transport({ delayMs: 20 })

  const { messages, append, setMessages, status } = useChat({
    threadId: "plan-demo",
    initialMessages: transcript,
    connection,
  })
  const busy = createMemo(
    () => status() === "submitted" || status() === "streaming"
  )
  // Rows follow the messages by place: a streaming message is a new object on every update.
  const streaming = (index: number) => busy() && index === messages().length - 1
  const planOf = (message: ChatMessage) =>
    message.parts
      .filter((part) => part.type === "tool-call")
      .filter((part) => part.name === "updatePlan" && part.state === "complete")
      .at(-1)?.input

  function replay() {
    setMessages([])
    if (question) void append(question)
  }

  return (
    <div sx={page.example}>
      <div sx={styles.div}>
        <For keyed={false} each={messages()}>
          {(message, index) => (
            <>
              {message().role === "user" ? (
                <Message align="end">
                  <MessageContent>
                    <Bubble align="end" variant="muted">
                      <BubbleContent>{getMessageText(message())}</BubbleContent>
                    </Bubble>
                  </MessageContent>
                </Message>
              ) : (
                <Message>
                  <MessageContent sx={styles.messageContent}>
                    <Show when={planOf(message())}>
                      <Trace>
                        <PlanRow
                          plan={planOf(message())!}
                          streaming={streaming(index)}
                        />
                      </Trace>
                    </Show>
                    <Show when={getMessageText(message())}>
                      <p>{getMessageText(message())}</p>
                    </Show>
                  </MessageContent>
                </Message>
              )}
            </>
          )}
        </For>
        <Show when={!busy()}>
          <Button
            variant="outline"
            size="sm"
            sx={styles.button}
            onClick={replay}
          >
            Replay
          </Button>
        </Show>
      </div>
    </div>
  )
}
