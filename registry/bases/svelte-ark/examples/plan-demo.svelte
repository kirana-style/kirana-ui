<script lang="ts">
  import { Chat } from "@ai-sdk/svelte"
  import type { UIMessage } from "ai"
  import { createChat, getMessageText } from "../../../lib/ai"
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
  import PlanRow from "../components/plan-demo/PlanRow.svelte"
  import type { Plan } from "../components/plan-demo/PlanRow.svelte"

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

  type ChatMessage = UIMessage<unknown, { plan: Plan }>

  type PlanPart = Extract<ChatMessage["parts"][number], { type: "data-plan" }>

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
    } satisfies PlanPart["data"]
  }

  const chat = createChat<ChatMessage>()
    .user("Migrate the dialog components to Base UI.")
    .assistant(({ writer }) => {
      STEPS.forEach((_, index) => {
        writer
          .data({ type: "data-plan", id: "plan", data: planAt(index) })
          .sleep(1200)
      })
      writer.data({ type: "data-plan", id: "plan", data: planAt(STEPS.length) })
      writer.text("Migrated Dialog and AlertDialog. The type checker passes.")
    })

  const transcript = chat.get()

  const [question] = chat.get(1)

  const transport = chat.transport({ delayMs: 20 })

  const conversation = new Chat<ChatMessage>({
    messages: transcript,
    transport,
  })
  const busy = $derived.by(
    () => conversation.status === "submitted" || conversation.status === "streaming"
  )
  const streaming = (message: ChatMessage) =>
    busy && message === conversation.messages.at(-1)
  const planOf = (message: ChatMessage) =>
    message.parts.find((part) => part.type === "data-plan")

  function replay() {
    conversation.messages = []
    void conversation.sendMessage(question)
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
                <PlanRow plan={planOf(message)!.data} streaming={streaming(message)} />
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
