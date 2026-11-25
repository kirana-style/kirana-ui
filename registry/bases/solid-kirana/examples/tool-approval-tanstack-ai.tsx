import { ReasoningLine } from "../components/tool-approval-tanstack-ai/reasoning-line"
import { For, Match, Show, Switch, createMemo, createSignal } from "solid-js"
import { IconPlaceholder } from "../ui/icon-placeholder"
import { toolDefinition } from "@tanstack/ai"
import { clientTools } from "@tanstack/ai-client"
import { useChat } from "../../../lib/solid2/tanstack-chat"
import { createChat, getMessageText } from "../../../lib/tanstack-ai"
import { Bubble, BubbleContent } from "../ui/bubble"
import { Button } from "../ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "../ui/item"
import { Message, MessageContent } from "../ui/message"
import { Trace, TraceIcon, TraceLine, TraceTitle } from "../ui/trace"
import { css } from "@kirana-style/core"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { z } from "zod"
import type { UIMessage } from "@tanstack/ai-client"

export default function ToolApprovalTanstackAi() {
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

  // TanStack AI asks before a tool runs with an interrupt (`needsApproval`), which the scripted
  // connection cannot send. Here the command is a client tool instead: it waits for the person's
  // answer, and its output says whether they approved it.
  const runCommand = toolDefinition({
    name: "runCommand",
    description:
      "Run a shell command in the project, once the person approves it.",
    inputSchema: z.object({ command: z.string() }),
    outputSchema: z.object({ approved: z.boolean() }),
  })

  // The call waiting for an answer, and how to give it.
  const [asking, setAsking] = createSignal<{
    toolCallId: string
    answer: (approved: boolean) => void
  }>()
  const runCommandClient = runCommand.client(
    (_input, context) =>
      new Promise<{ approved: boolean }>((resolve, reject) => {
        context?.abortSignal?.addEventListener("abort", () => {
          setAsking(undefined)
          reject(new Error("Stopped"))
        })
        setAsking({
          toolCallId: context?.toolCallId ?? "",
          answer: (approved) => {
            setAsking(undefined)
            resolve({ approved })
          },
        })
      })
  )

  const tools = clientTools(runCommandClient)

  type ChatMessage = UIMessage<typeof tools>

  const chat = createChat<typeof tools>()
    .user("Clean up the build folder.")
    .sleep(600)
    .assistant(({ writer }) => {
      writer.reasoning(
        "The build output lives in dist. Deleting it cannot be undone, so I should ask before I run the command."
      )
      writer.sleep(400)
      writer.tool("runCommand", { input: { command: "rm -rf dist" } })
    })
    .assistant(({ writer, messages }) => {
      // The answer is the client tool's output, in the transcript the follow-up request carries
      // (the helper's `toolCall` leaves a client tool's output out on TanStack AI, LF-037).
      const approved = messages
        ?.at(-1)
        ?.parts.some(
          (part) =>
            part.type === "tool-call" &&
            part.name === "runCommand" &&
            part.output?.approved
        )
      writer.sleep(600)
      writer.text(
        approved
          ? "Removed the dist folder."
          : "Okay, I left the dist folder in place."
      )
    })

  const initialMessages = chat.get(0)
  const connection = chat.transport({ delayMs: 20 })

  const { messages, append, setMessages, status, stop } = useChat({
    threadId: "tool-approval",
    initialMessages,
    connection,
    tools,
  })
  const nextMessage = createMemo(() => chat.next(messages()))
  const busy = createMemo(
    () => status() === "submitted" || status() === "streaming"
  )
  type Part = ChatMessage["parts"][number]
  type ToolPart = Extract<Part, { type: "tool-call" }>
  const textPart = (part: Part) => (part.type === "text" ? part : undefined)
  const thinkingPart = (part: Part) =>
    part.type === "thinking" ? part : undefined
  const toolPart = (part: Part) =>
    part.type === "tool-call" && part.name === "runCommand" ? part : undefined
  const pending = (part: Part) => {
    const tool = toolPart(part)
    return tool && asking()?.toolCallId === tool.id ? tool : undefined
  }
  const denied = (part: ToolPart) => part.output?.approved === false

  function advance() {
    const next = nextMessage()
    if (next) void append(next)
    else {
      stop()
      setMessages(initialMessages)
    }
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
                    <For keyed={false} each={message().parts}>
                      {(part) => (
                        <Switch>
                          <Match when={textPart(part())}>
                            {(text) => <p>{text().content}</p>}
                          </Match>
                          <Match when={thinkingPart(part())}>
                            {(thinking) => (
                              <Trace>
                                <ReasoningLine
                                  text={thinking().content}
                                  running={
                                    busy() &&
                                    index === messages().length - 1 &&
                                    message().parts.at(-1) === thinking()
                                  }
                                />
                              </Trace>
                            )}
                          </Match>
                          {/* A pending approval is a prompt, not activity, so it sits outside Trace. */}
                          <Match when={pending(part())}>
                            {(tool) => (
                              <Item variant="outline" size="sm">
                                <ItemMedia variant="icon">
                                  <IconPlaceholder
                                    lucide="CommandIcon"
                                    tabler="IconCommand"
                                    hugeicons="CommandIcon"
                                    phosphor="CommandIcon"
                                    remixicon="RiCommandLine"
                                  />
                                </ItemMedia>
                                <ItemContent>
                                  <ItemTitle>
                                    Run {tool().input?.command}?
                                  </ItemTitle>
                                  <ItemDescription>
                                    The command runs in this project.
                                  </ItemDescription>
                                </ItemContent>
                                <ItemActions>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => asking()?.answer(false)}
                                  >
                                    Deny
                                  </Button>
                                  <Button
                                    size="sm"
                                    onClick={() => asking()?.answer(true)}
                                  >
                                    Approve
                                  </Button>
                                </ItemActions>
                              </Item>
                            )}
                          </Match>
                          <Match when={toolPart(part())}>
                            {(tool) => (
                              <Trace>
                                <TraceLine
                                  status={
                                    !denied(tool()) &&
                                    tool().state !== "complete"
                                      ? "running"
                                      : undefined
                                  }
                                >
                                  <TraceIcon>
                                    <IconPlaceholder
                                      lucide="CommandIcon"
                                      tabler="IconCommand"
                                      hugeicons="CommandIcon"
                                      phosphor="CommandIcon"
                                      remixicon="RiCommandLine"
                                    />
                                  </TraceIcon>
                                  <TraceTitle>
                                    {denied(tool())
                                      ? "Denied"
                                      : tool().state === "complete"
                                        ? "Ran"
                                        : "Running"}{" "}
                                    {tool().input?.command}
                                  </TraceTitle>
                                </TraceLine>
                              </Trace>
                            )}
                          </Match>
                        </Switch>
                      )}
                    </For>
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
            onClick={advance}
          >
            {nextMessage() ? "Send message" : "Reset"}
          </Button>
        </Show>
      </div>
    </div>
  )
}
