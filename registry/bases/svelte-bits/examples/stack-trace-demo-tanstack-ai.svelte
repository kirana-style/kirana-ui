<script lang="ts">
  import { createChat } from "@tanstack/ai-svelte"
  import type { UIMessage } from "@tanstack/ai-svelte"
  import {
    isRunCommand,
    resultOf,
  } from "../components/stack-trace-demo-tanstack-ai/types"
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
  import CommandRow from "../components/stack-trace-demo-tanstack-ai/CommandRow.svelte"

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

  const STACK = `TypeError: Cannot read properties of undefined (reading 'email')
    at seedUsers (prisma/seed.ts:27:34)
    at main (prisma/seed.ts:51:9)
    at Module._compile (node:internal/modules/cjs/loader:1554:14)
    at Object.transformer (node_modules/tsx/dist/register.cjs:3:1104)
    at Module.load (node:internal/modules/cjs/loader:1289:32)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)`

  const chat = createScriptedChat()
    .user("Reset the database and seed it.")
    .assistant(({ writer }) => {
      writer
        .tool("runCommand", {
          input: { command: "pnpm prisma migrate reset --skip-seed" },
        })
        .sleep(900)
        .output({
          stdout: `Database reset successful

The following migrations have been applied:

migrations/
  └─ 20260912_init/
  └─ 20260920_add_profiles/`,
        })
      writer
        .tool("runCommand", { input: { command: "pnpm prisma db seed" } })
        .sleep(1200)
        .error(STACK)
      writer.text(
        "The migrations ran, but the seed failed in seedUsers. One fixture has no profile, so profile.email is undefined."
      )
    })

  const transcript = chat.get()

  const [question] = chat.get(1)

  const connection = chat.transport({ delayMs: 20 })

  const conversation = createChat({
    initialMessages: transcript,
    connection,
    threadId: "stack-trace-demo",
  })
  const busy = $derived.by(
    () => conversation.status === "submitted" || conversation.status === "streaming"
  )
  const streaming = (message: UIMessage) =>
    busy && message === conversation.messages.at(-1)
  const toolsOf = (message: UIMessage) => message.parts.filter(isRunCommand)

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
            {#if toolsOf(message).length > 0}
              <Trace>
                {#each toolsOf(message) as part (part.id)}
                  <CommandRow part={part} result={resultOf(message, part.id)} streaming={streaming(message)} />
                {/each}
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
