<script lang="ts">
  import { Chat } from "@ai-sdk/svelte"
  import type { ChatMessage } from "../components/tool-demo/types"
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
  import ToolRow from "../components/tool-demo/ToolRow.svelte"

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

  const chat = createChat<ChatMessage>()
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
  const toolsOf = (message: ChatMessage) =>
    message.parts.filter((part) => part.type === "tool-runCommand")

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
            {#if toolsOf(message).length > 0}
              <Trace>
                {#each toolsOf(message) as part (part.toolCallId)}
                  <ToolRow part={part} streaming={streaming(message)} defaultOpen={busy ? undefined : part.state === 'output-error'} />
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
