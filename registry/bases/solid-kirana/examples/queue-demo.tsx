import { TodoQueue } from "../components/queue-demo/todo-queue"
import { For, Show, createMemo } from "solid-js"
import { Chat } from "../../../lib/solid/chat"
import { createChat, getMessageText } from "../../../lib/ai"
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
import type { ChatMessage, Todo } from "../components/queue-demo/types"

export default function QueueDemo() {
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

  const chat = createChat<ChatMessage>()
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

  const transport = chat.transport({ delayMs: 20 })

  const conversation = new Chat<ChatMessage>({
    messages: transcript,
    transport,
  })
  const busy = createMemo(
    () =>
      conversation.status === "submitted" || conversation.status === "streaming"
  )
  const streaming = (message: ChatMessage) =>
    busy() && message === conversation.messages.at(-1)
  const todosOf = (message: ChatMessage) =>
    message.parts
      .filter((part) => part.type === "tool-writeTodos")
      .filter((part) => part.state !== "input-streaming")
      .at(-1)?.input?.todos

  function replay() {
    conversation.messages = []
    void conversation.sendMessage(question)
  }

  return (
    <div sx={page.example}>
      <div sx={styles.div}>
        <For each={conversation.messages}>
          {(message) => (
            <>
              {message.role === "user" ? (
                <Message align="end">
                  <MessageContent>
                    <Bubble align="end" variant="muted">
                      <BubbleContent>{getMessageText(message)}</BubbleContent>
                    </Bubble>
                  </MessageContent>
                </Message>
              ) : (
                <Message>
                  <MessageContent sx={styles.messageContent}>
                    <Show when={todosOf(message)}>
                      <TodoQueue
                        todos={todosOf(message)!}
                        streaming={streaming(message)}
                      />
                    </Show>
                    <Show when={getMessageText(message)}>
                      <p>{getMessageText(message)}</p>
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
