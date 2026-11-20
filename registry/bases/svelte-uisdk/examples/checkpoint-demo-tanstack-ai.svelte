<script lang="ts">
  import { createChat } from "@tanstack/ai-svelte"
  import type { UIMessage } from "@tanstack/ai-svelte"
  import {
    createChat as createScriptedChat,
    getMessageText,
  } from "../../../lib/tanstack-ai"
  import { Bubble, BubbleContent } from "../ui/bubble"
  import { Button } from "../ui/button"
  import { Marker, MarkerContent } from "../ui/marker"
  import { Message, MessageContent } from "../ui/message"
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
    markerContent: css({
      display: { "*": null, base: "inline-flex" },
      alignItems: { "*": null, base: "center" },
      gap: { "*": null, base: space[2] },
    }),
    button: css({
      marginTop: { "*": null, base: "auto" },
      alignSelf: { "*": null, base: "flex-start" },
    }),
  }

  /** A `saveCheckpoint` call: TanStack AI types a call by its tool's schemas, so this names them by hand. */
  type CheckpointPart = Omit<
    Extract<UIMessage["parts"][number], { type: "tool-call" }>,
    "name" | "input"
  > & { name: "saveCheckpoint"; input?: { label: string } }

  // TanStack AI has no data part: a checkpoint is a call to the agent's checkpoint tool.
  const chat = createScriptedChat()
    .user("Rename the button component to action.")
    .assistant(({ writer }) => {
      writer.text("Renamed Button to Action in components/ui/button.tsx.")
      writer.tool("saveCheckpoint", {
        input: { label: "Button renamed" },
        output: { id: "rename" },
      })
    })
    .user("Update the docs to match.")
    .assistant(({ writer }) => {
      writer.text("Updated the Button page to say Action.")
    })

  const transcript = chat.get()
  const connection = chat.transport({ delayMs: 20 })

  const conversation = createChat({
    initialMessages: transcript,
    connection,
    threadId: "checkpoint-demo",
  })
  const nextMessage = $derived.by(() => chat.next(conversation.messages))
  const busy = $derived.by(
    () => conversation.status === "submitted" || conversation.status === "streaming"
  )
  const checkpointOf = (message: UIMessage) =>
    message.parts.find(
      (part): part is CheckpointPart =>
        part.type === "tool-call" && part.name === "saveCheckpoint"
    )?.input
  const canRestore = (message: UIMessage) =>
    conversation.messages.findIndex((item) => item.id === message.id) <
    conversation.messages.length - 1

  function restore(messageId: string) {
    const index = conversation.messages.findIndex((message) => message.id === messageId)

    if (index === -1) {
      return
    }

    conversation.setMessages(conversation.messages.slice(0, index + 1))
  }

  function advance() {
    if (nextMessage) void conversation.append(nextMessage)
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
          <MessageContent>
            <p>
              {getMessageText(message)}
            </p>
          </MessageContent>
        </Message>
      {/if}
      {#if checkpointOf(message)}
        <Marker variant="separator">
          <MarkerContent sx={styles.markerContent}>
            {checkpointOf(message)!.label}
            {#if canRestore(message)}
              <Button size="xs" variant="outline" aria-label={`Restore to ${checkpointOf(message)!.label}`} onclick={() => { restore(message.id) }}>
                Restore
              </Button>
            {/if}
          </MarkerContent>
        </Marker>
      {/if}
    {/each}
    {#if !busy && nextMessage}
      <Button variant="outline" size="sm" sx={styles.button} onclick={advance}>
        Continue
      </Button>
    {/if}
  </div>
</div>
