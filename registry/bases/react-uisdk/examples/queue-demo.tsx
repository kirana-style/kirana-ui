import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { useChat } from "@ai-sdk/react"
import type { UIDataTypes, UIMessage } from "ai"

import { createChat, getMessageText } from "../../../lib/ai"
import { Bubble, BubbleContent } from "../ui/bubble"
import { Button } from "../ui/button"
import { Message, MessageContent } from "../ui/message"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../ui/trace"
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
  messageContent: css({
    gap: { "*": null, base: space[4] },
  }),
  button: css({
    marginTop: { "*": null, base: "auto" },
    alignSelf: { "*": null, base: "flex-start" },
  }),
}

type ChatMessage = UIMessage<
  unknown,
  UIDataTypes,
  {
    writeTodos: {
      input: {
        todos: {
          content: string
          status: "pending" | "in_progress" | "completed"
        }[]
      }
      output: string
    }
  }
>

type Todo = Extract<
  ChatMessage["parts"][number],
  { type: "tool-writeTodos"; state: "input-available" }
>["input"]["todos"][number]

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

function TodoLine({ todo, streaming }: { todo: Todo; streaming: boolean }) {
  return (
    <TraceLine
      status={
        streaming && todo.status === "in_progress" ? "running" : undefined
      }
    >
      <TraceIcon>
        {todo.status === "completed" ? (
          <IconPlaceholder
            lucide="CircleCheckIcon"
            tabler="IconCircleCheckFilled"
            hugeicons="CheckmarkCircle01Icon"
            phosphor="CheckCircleIcon"
            remixicon="RiCheckboxCircleFill"
          />
        ) : todo.status === "in_progress" ? (
          <IconPlaceholder
            lucide="CircleDotIcon"
            tabler="IconCircleDot"
            hugeicons="RecordIcon"
            phosphor="RecordIcon"
            remixicon="RiRecordCircleLine"
          />
        ) : (
          <IconPlaceholder
            lucide="CircleIcon"
            tabler="IconCircle"
            hugeicons="CircleIcon"
            phosphor="CircleIcon"
            remixicon="RiCheckboxBlankCircleLine"
          />
        )}
      </TraceIcon>
      <TraceTitle>{todo.content}</TraceTitle>
    </TraceLine>
  )
}

function TodoQueue({
  todos,
  streaming,
}: {
  todos: Todo[]
  streaming: boolean
}) {
  const pending = todos.filter((todo) => todo.status !== "completed")
  const completed = todos.filter((todo) => todo.status === "completed")

  return (
    <Trace>
      {pending.length > 0 && (
        <TraceCollapsible defaultOpen>
          <TraceCollapsibleTrigger>
            <TraceLine>
              <TraceIcon>
                <IconPlaceholder
                  lucide="ListTodoIcon"
                  tabler="IconChecklist"
                  hugeicons="TaskDone01Icon"
                  phosphor="CheckSquareOffsetIcon"
                  remixicon="RiTaskLine"
                />
              </TraceIcon>
              <TraceTitle>{pending.length} to do</TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent>
            <Trace>
              {pending.map((todo) => (
                <TodoLine
                  key={todo.content}
                  todo={todo}
                  streaming={streaming}
                />
              ))}
            </Trace>
          </TraceCollapsibleContent>
        </TraceCollapsible>
      )}
      {completed.length > 0 && (
        <TraceCollapsible defaultOpen>
          <TraceCollapsibleTrigger>
            <TraceLine>
              <TraceIcon>
                <IconPlaceholder
                  lucide="ListChecksIcon"
                  tabler="IconListCheck"
                  hugeicons="CheckListIcon"
                  phosphor="ListChecksIcon"
                  remixicon="RiListCheck3"
                />
              </TraceIcon>
              <TraceTitle>{completed.length} completed</TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent>
            <Trace>
              {completed.map((todo) => (
                <TodoLine
                  key={todo.content}
                  todo={todo}
                  streaming={streaming}
                />
              ))}
            </Trace>
          </TraceCollapsibleContent>
        </TraceCollapsible>
      )}
    </Trace>
  )
}

export default function QueueDemo() {
  const { messages, sendMessage, setMessages, status } = useChat({
    messages: transcript,
    transport,
  })
  const busy = status === "submitted" || status === "streaming"

  return (
    <div sx={page.example}>
      <div sx={styles.div}>
        {messages.map((message) => {
          if (message.role === "user") {
            return (
              <Message key={message.id} align="end">
                <MessageContent>
                  <Bubble align="end" variant="muted">
                    <BubbleContent>{getMessageText(message)}</BubbleContent>
                  </Bubble>
                </MessageContent>
              </Message>
            )
          }

          const streaming = busy && message === messages.at(-1)
          const todos = message.parts
            .filter((part) => part.type === "tool-writeTodos")
            .filter((part) => part.state !== "input-streaming")
            .at(-1)?.input?.todos
          const text = getMessageText(message)

          return (
            <Message key={message.id}>
              <MessageContent sx={styles.messageContent}>
                {todos && <TodoQueue todos={todos} streaming={streaming} />}
                {text && <p>{text}</p>}
              </MessageContent>
            </Message>
          )
        })}
        {!busy && (
          <Button
            variant="outline"
            size="sm"
            sx={styles.button}
            onClick={() => {
              setMessages([])
              void sendMessage(question)
            }}
          >
            Replay
          </Button>
        )}
      </div>
    </div>
  )
}
