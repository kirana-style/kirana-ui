<script lang="ts">
  import { createChat } from "@tanstack/ai-svelte"
  import type { UIMessage } from "@tanstack/ai-svelte"
  import {
    isRunCommand,
    resultOf,
  } from "../components/terminal-demo-tanstack-ai/types"
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
  import CommandRow from "../components/terminal-demo-tanstack-ai/CommandRow.svelte"

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

  const chat = createScriptedChat()
    .user("Run the checks, then build the app.")
    .assistant(({ writer }) => {
      for (const { id, command, output } of COMMANDS) {
        // TanStack AI streams no output while a tool runs: it arrives with the result.
        writer
          .tool("runCommand", { toolCallId: id, input: { command } })
          .sleep(output.length * 200)
          .output({ exitCode: 0, output: output.join("\n") })
      }

      writer.text("Lint and tests pass, and the build compiled both routes.")
    })

  const transcript = chat.get()

  const [question] = chat.get(1)

  const connection = chat.transport({ delayMs: 20 })

  const conversation = createChat({
    initialMessages: transcript,
    connection,
    threadId: "terminal-demo",
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
                  <CommandRow part={part} result={resultOf(message, part.id)} streaming={streaming(message)} defaultOpen={
                  busy ? undefined : part === toolsOf(message).at(-1)
                } />
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
