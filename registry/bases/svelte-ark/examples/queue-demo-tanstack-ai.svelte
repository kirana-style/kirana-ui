<script lang="ts">
  import { isWriteTodos } from "../components/queue-demo-tanstack-ai/types"
  import type { Todo } from "../components/queue-demo-tanstack-ai/types"
  import { createChat } from "@tanstack/ai-svelte"
  import type { UIMessage } from "@tanstack/ai-svelte"
  import {
    createChat as createScriptedChat,
    getMessageText,
  } from "../../../lib/tanstack-ai"
  import { Bubble, BubbleContent } from "../ui/bubble"
  import { Button } from "../ui/button"
  import { Message, MessageContent } from "../ui/message"
  import { css } from "@kirana-style/core"
  import {
    containerSize,
    fontSize,
    lineHeight,
    space,
  } from "../../../core/scales"
  import { page } from "../../../styles/page.styles"
  import TodoQueue from "../components/queue-demo-tanstack-ai/TodoQueue.svelte"

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

  const TODOS = [
    "Add a dark variant to the theme tokens",
    "Read the theme from a cookie",
    "Add a toggle to the settings page",
    "Check contrast on the charts",
  ]

  function todosAt(current: number) {
    return TODOS.map(
      (content, index) =>
        ({
          content,
          status:
            index < current
              ? "completed"
              : index === current
                ? "in_progress"
                : "pending",
        }) satisfies Todo
    )
  }

  const chat = createScriptedChat()
    .user("Add dark mode to the settings page.")
    .assistant(({ writer }) => {
      TODOS.forEach((_, index) => {
        writer
          .tool("writeTodos", { input: { todos: todosAt(index) } })
          .output("Updated the todo list.")
        writer.sleep(1400)
      })
      writer
        .tool("writeTodos", { input: { todos: todosAt(TODOS.length) } })
        .output("Updated the todo list.")
      writer.text("Dark mode is in. The toggle is under Settings, Appearance.")
    })

  const transcript = chat.get()

  const [question] = chat.get(1)

  const connection = chat.transport({ delayMs: 20 })

  const conversation = createChat({
    initialMessages: transcript,
    connection,
    threadId: "queue-demo",
  })
  const busy = $derived.by(
    () => conversation.status === "submitted" || conversation.status === "streaming"
  )
  const streaming = (message: UIMessage) =>
    busy && message === conversation.messages.at(-1)
  const todosOf = (message: UIMessage) =>
    message.parts
      .filter(isWriteTodos)
      // A call's input is whole once it has stopped streaming.
      .filter(
        (part) =>
          part.state !== "awaiting-input" && part.state !== "input-streaming"
      )
      .at(-1)?.input?.todos

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
            {#if todosOf(message)}
              <TodoQueue todos={todosOf(message)!} streaming={streaming(message)} />
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
