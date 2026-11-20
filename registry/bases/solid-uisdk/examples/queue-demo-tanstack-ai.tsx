import { TodoQueue } from "../components/queue-demo-tanstack-ai/todo-queue"
import { For, Show, createMemo } from "solid-js"
import { useChat } from "../../../lib/solid2/tanstack-chat"
import { createChat, getMessageText } from "../../../lib/tanstack-ai"
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
import type {
  ChatMessage,
  Todo,
  tools,
} from "../components/queue-demo-tanstack-ai/types"

export default function QueueDemoTanstackAi() {
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

  const chat = createChat<typeof tools>()
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

  const { messages, append, setMessages, status } = useChat({
    threadId: "queue-demo",
    initialMessages: transcript,
    connection,
  })
  const busy = createMemo(
    () => status() === "submitted" || status() === "streaming"
  )
  // Rows follow the messages by place: a streaming message is a new object on every update.
  const streaming = (index: number) => busy() && index === messages().length - 1
  const todosOf = (message: ChatMessage) =>
    message.parts
      .filter((part) => part.type === "tool-call")
      .filter(
        (part) =>
          part.name === "writeTodos" &&
          part.state !== "awaiting-input" &&
          part.state !== "input-streaming"
      )
      .at(-1)?.input?.todos

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
                    <Show when={todosOf(message())}>
                      <TodoQueue
                        todos={todosOf(message())!}
                        streaming={streaming(index)}
                      />
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
