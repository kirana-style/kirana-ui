import { TaskRow } from "../components/task-demo-tanstack-ai/task-row"
import { Index, Show, createMemo } from "solid-js"
import { useChat } from "@tanstack/ai-solid"
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
import type {
  ChatMessage,
  Task,
  tools,
} from "../components/task-demo-tanstack-ai/types"

export default function TaskDemoTanstackAi() {
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

  const TASKS = [
    {
      id: "find",
      title: ["Finding the project files", "Found the project files"],
      steps: [
        ["Searching for generateMetadata", "Searched for generateMetadata"],
        ["Reading app/layout.tsx", "Read app/layout.tsx"],
        ["Reading app/page.tsx", "Read app/page.tsx"],
      ],
    },
    {
      id: "update",
      title: ["Updating the page metadata", "Updated the page metadata"],
      steps: [
        ["Editing app/layout.tsx", "Edited app/layout.tsx"],
        ["Editing app/page.tsx", "Edited app/page.tsx"],
      ],
    },
  ]

  function taskAt(task: (typeof TASKS)[number], done: number) {
    return {
      title: task.title[done < task.steps.length ? 0 : 1],
      steps: task.steps
        .slice(0, done + 1)
        .map(([running, finished], index) => ({
          title: index < done ? finished : running,
          status: index < done ? "done" : "running",
        })),
    } satisfies Omit<Task, "id">
  }

  const chat = createChat<typeof tools>()
    .user("Add Open Graph metadata to the home page.")
    .assistant(({ writer }) => {
      TASKS.forEach((task) => {
        for (let done = 0; done <= task.steps.length; done++) {
          writer
            .tool("updateTask", {
              input: { id: task.id, ...taskAt(task, done) },
            })
            .output({})
          writer.sleep(900)
        }
      })
      writer.text(
        "Added Open Graph defaults to app/layout.tsx and a title, description and image for the home page in app/page.tsx."
      )
    })

  const transcript = chat.get()

  const [question] = chat.get(1)

  const connection = chat.transport({ delayMs: 20 })

  const { messages, append, setMessages, status } = useChat({
    threadId: "task-demo",
    initialMessages: transcript,
    connection,
  })
  const busy = createMemo(
    () => status() === "submitted" || status() === "streaming"
  )
  // Rows follow the messages by place: a streaming message is a new object on every update.
  const streaming = (index: number) => busy() && index === messages().length - 1
  // Each task's latest call, in the order the tasks started.
  const tasksOf = (message: ChatMessage) => {
    const tasks = new Map<string, Task>()
    for (const part of message.parts) {
      if (
        part.type === "tool-call" &&
        part.name === "updateTask" &&
        part.state === "complete" &&
        part.input
      )
        tasks.set(part.input.id, part.input)
    }
    return [...tasks.values()]
  }

  function replay() {
    setMessages([])
    if (question) void append(question)
  }

  return (
    <div sx={page.example}>
      <div sx={styles.div}>
        <Index each={messages()}>
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
                    <Show when={tasksOf(message()).length > 0}>
                      <Trace>
                        <Index each={tasksOf(message())}>
                          {(task) => (
                            <TaskRow
                              task={task()}
                              streaming={streaming(index)}
                            />
                          )}
                        </Index>
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
        </Index>
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
