<script lang="ts">
  import { createChat } from "@tanstack/ai-svelte"
  import type { UIMessage } from "@tanstack/ai-svelte"
  import {
    createChat as createScriptedChat,
    getMessageText,
  } from "../../../lib/tanstack-ai"
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
  import PlanRow from "../components/plan-demo-tanstack-ai/PlanRow.svelte"
  import type { Plan } from "../components/plan-demo-tanstack-ai/PlanRow.svelte"

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

  /** An `updatePlan` call: TanStack AI types a call by its tool's schemas, so this names them by hand. */
  type PlanPart = Omit<
    Extract<UIMessage["parts"][number], { type: "tool-call" }>,
    "name" | "input"
  > & { name: "updatePlan"; input?: Plan }

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

  // TanStack AI has no data part: the plan is what the agent's plan tool was last called with.
  const chat = createScriptedChat()
    .user("Migrate the dialog components to Base UI.")
    .assistant(({ writer }) => {
      STEPS.forEach((_, index) => {
        writer.tool("updatePlan", {
          input: planAt(index),
          output: "Updated the plan.",
        })
        writer.sleep(1200)
      })
      writer.tool("updatePlan", {
        input: planAt(STEPS.length),
        output: "Updated the plan.",
      })
      writer.text("Migrated Dialog and AlertDialog. The type checker passes.")
    })

  const transcript = chat.get()

  const [question] = chat.get(1)

  const connection = chat.transport({ delayMs: 20 })

  const conversation = createChat({
    initialMessages: transcript,
    connection,
    threadId: "plan-demo",
  })
  const busy = $derived.by(
    () => conversation.status === "submitted" || conversation.status === "streaming"
  )
  const streaming = (message: UIMessage) =>
    busy && message === conversation.messages.at(-1)
  const planOf = (message: UIMessage) =>
    message.parts
      .filter(
        (part): part is PlanPart =>
          part.type === "tool-call" &&
          part.name === "updatePlan" &&
          // A call's input is whole once it has stopped streaming.
          part.state !== "awaiting-input" &&
          part.state !== "input-streaming"
      )
      .at(-1)?.input

  function replay() {
    conversation.setMessages([])
    void conversation.append(question)
  }
</script>

<div sx={page.example}>
  <div sx={styles.div}>
    {#each conversation.messages as message (message.id)}
      {#if message.role === 'user'}
        <Message align="end">
          <MessageContent>
            <Bubble align="end" variant="muted">
              <BubbleContent>
                {getMessageText(message)}
              </BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
      {:else}
        <Message>
          <MessageContent sx={styles.messageContent}>
            {#if planOf(message)}
              <Trace>
                <PlanRow plan={planOf(message)!} streaming={streaming(message)} />
              </Trace>
            {/if}
            {#if getMessageText(message)}
              <p>
                {getMessageText(message)}
              </p>
            {/if}
          </MessageContent>
        </Message>
      {/if}
    {/each}
    {#if !busy}
      <Button variant="outline" size="sm" sx={styles.button} onclick={replay}>
        Replay
      </Button>
    {/if}
  </div>
</div>
