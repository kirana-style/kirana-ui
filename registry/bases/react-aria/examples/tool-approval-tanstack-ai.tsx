import { IconPlaceholder } from "../../../icons/icon-placeholder"
import * as React from "react"
import { clientTools, useChat } from "@tanstack/ai-react"
import { toolDefinition } from "@tanstack/ai/client"
import * as z from "zod"

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
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../ui/trace"
import { css, keyframes, props as styleProps } from "@kirana-style/core"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"

// Tailwind's `spin`.
const spin = keyframes({ to: { transform: "rotate(360deg)" } })

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
  reasoningLineIconPlaceholder: css({
    animationDuration: "1s",
    animationIterationCount: "infinite",
    animationName: spin,
    animationTimingFunction: "linear",
  }),
  reasoningLineTraceCollapsibleContent: css({
    whiteSpace: { "*": null, base: "pre-wrap" },
  }),
}

// A client tool that needs approval: the call waits as an interrupt until the person answers, and
// runs only once they approve.
const runCommand = toolDefinition({
  name: "runCommand",
  description: "Run a shell command in the project.",
  inputSchema: z.object({ command: z.string() }),
  outputSchema: z.object({ stdout: z.string() }),
  needsApproval: true,
}).client(async () => ({ stdout: "" }))

const tools = clientTools(runCommand)

const chat = createChat<typeof tools>()
  .user("Clean up the build folder.")
  .sleep(600)
  .assistant(({ writer }) => {
    writer.reasoning(
      "The build output lives in dist. Deleting it cannot be undone, so I should ask before I run the command."
    )
    writer.sleep(400)
    // No output: the call is left for the client, which asks before it runs.
    writer.tool("runCommand", { input: { command: "rm -rf dist" } })
  })
  .assistant(({ writer, messages = [], toolCall }) => {
    // The answer is in the transcript: an approved call ran and completed (LF-037).
    const approved = messages.some((message) =>
      message.parts.some(
        (part) =>
          part.type === "tool-call" &&
          part.id === toolCall?.toolCallId &&
          part.state === "complete"
      )
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

export default function ToolApprovalTanstackAi() {
  const { messages, append, setMessages, status, interrupts } = useChat({
    initialMessages,
    connection,
    threadId: "tool-approval",
    tools,
  })
  const nextMessage = chat.next(messages)
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

          return (
            <Message key={message.id}>
              <MessageContent sx={styles.messageContent}>
                {message.parts.map((part, index) => {
                  if (part.type === "text") {
                    return <p key={index}>{part.content}</p>
                  }

                  if (part.type === "thinking") {
                    return (
                      <Trace key={index}>
                        <ReasoningLine
                          text={part.content}
                          running={
                            busy &&
                            message === messages.at(-1) &&
                            index === message.parts.length - 1
                          }
                        />
                      </Trace>
                    )
                  }

                  if (part.type !== "tool-call" || part.name !== "runCommand") {
                    return null
                  }

                  const approval = interrupts.find(
                    (interrupt) =>
                      interrupt.kind === "tool-approval" &&
                      interrupt.toolCallId === part.id
                  )

                  // A pending approval is a prompt, not activity, so it sits outside Trace.
                  if (approval?.kind === "tool-approval") {
                    return (
                      <Item key={part.id} variant="outline" size="sm">
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
                            Run {approval.originalArgs.command}?
                          </ItemTitle>
                          <ItemDescription>
                            The command runs in this project.
                          </ItemDescription>
                        </ItemContent>
                        <ItemActions>
                          <Button
                            size="sm"
                            variant="outline"
                            onPress={() => approval.resolveInterrupt(false)}
                          >
                            Deny
                          </Button>
                          <Button
                            size="sm"
                            onPress={() => approval.resolveInterrupt(true)}
                          >
                            Approve
                          </Button>
                        </ItemActions>
                      </Item>
                    )
                  }

                  // A denied call ends in an error result (LF-042).
                  const denied = part.state === "error"

                  return (
                    <Trace key={part.id}>
                      <TraceLine
                        status={
                          !denied && part.state !== "complete"
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
                          {denied
                            ? "Denied"
                            : part.state === "complete"
                              ? "Ran"
                              : "Running"}{" "}
                          {part.input?.command}
                        </TraceTitle>
                      </TraceLine>
                    </Trace>
                  )
                })}
              </MessageContent>
            </Message>
          )
        })}
        {!busy && (
          <Button
            variant="outline"
            size="sm"
            sx={styles.button}
            onPress={() =>
              nextMessage ? append(nextMessage) : setMessages(initialMessages)
            }
          >
            {nextMessage ? "Send message" : "Reset"}
          </Button>
        )}
      </div>
    </div>
  )
}

function ReasoningLine({ text, running }: { text: string; running: boolean }) {
  const [open, setOpen] = React.useState<boolean>()

  return (
    <TraceCollapsible isExpanded={open ?? running} onExpandedChange={setOpen}>
      <TraceCollapsibleTrigger>
        <TraceLine status={running ? "running" : undefined}>
          <TraceIcon>
            {running ? (
              <IconPlaceholder
                lucide="LoaderCircleIcon"
                tabler="IconLoader2"
                hugeicons="Loading03Icon"
                phosphor="CircleNotchIcon"
                remixicon="RiLoader4Line"
                {...styleProps(styles.reasoningLineIconPlaceholder)}
              />
            ) : (
              <IconPlaceholder
                lucide="CircleCheckIcon"
                tabler="IconCircleCheckFilled"
                hugeicons="CheckmarkCircle01Icon"
                phosphor="CheckCircleIcon"
                remixicon="RiCheckboxCircleFill"
              />
            )}
          </TraceIcon>
          <TraceTitle>{running ? "Thinking" : "Thought"}</TraceTitle>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent sx={styles.reasoningLineTraceCollapsibleContent}>
        {text}
      </TraceCollapsibleContent>
    </TraceCollapsible>
  )
}
