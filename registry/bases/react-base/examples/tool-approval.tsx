import { IconPlaceholder } from "../../../icons/icon-placeholder"
import * as React from "react"
import { useChat } from "@ai-sdk/react"
import { lastAssistantMessageIsCompleteWithApprovalResponses } from "ai"
import type { UIDataTypes, UIMessage } from "ai"

import { createChat, getMessageText } from "../../../lib/ai"
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

type ChatMessage = UIMessage<
  unknown,
  UIDataTypes,
  {
    runCommand: {
      input: { command: string }
      output: { stdout: string }
    }
  }
>

const chat = createChat<ChatMessage>()
  .user("Clean up the build folder.")
  .sleep(600)
  .assistant(({ writer }) => {
    writer.reasoning(
      "The build output lives in dist. Deleting it cannot be undone, so I should ask before I run the command."
    )
    writer.sleep(400)
    writer.tool("runCommand", {
      input: { command: "rm -rf dist" },
      needsApproval: true,
      output: { stdout: "" },
    })
  })
  .assistant(({ writer, toolCall }) => {
    writer.sleep(600)
    writer.text(
      toolCall?.approved
        ? "Removed the dist folder."
        : "Okay, I left the dist folder in place."
    )
  })

const initialMessages = chat.get(0)
const transport = chat.transport({ delayMs: 20 })

export default function ToolApproval() {
  const {
    messages,
    sendMessage,
    setMessages,
    status,
    addToolApprovalResponse,
  } = useChat({
    messages: initialMessages,
    transport,
    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithApprovalResponses,
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
                    return <p key={index}>{part.text}</p>
                  }

                  if (part.type === "reasoning") {
                    return (
                      <Trace key={index}>
                        <ReasoningLine
                          text={part.text}
                          running={part.state === "streaming"}
                        />
                      </Trace>
                    )
                  }

                  if (part.type !== "tool-runCommand") {
                    return null
                  }

                  // A pending approval is a prompt, not activity, so it sits outside Trace.
                  if (part.state === "approval-requested") {
                    return (
                      <Item key={part.toolCallId} variant="outline" size="sm">
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
                          <ItemTitle>Run {part.input.command}?</ItemTitle>
                          <ItemDescription>
                            The command runs in this project.
                          </ItemDescription>
                        </ItemContent>
                        <ItemActions>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              addToolApprovalResponse({
                                id: part.approval.id,
                                approved: false,
                              })
                            }
                          >
                            Deny
                          </Button>
                          <Button
                            size="sm"
                            onClick={() =>
                              addToolApprovalResponse({
                                id: part.approval.id,
                                approved: true,
                              })
                            }
                          >
                            Approve
                          </Button>
                        </ItemActions>
                      </Item>
                    )
                  }

                  const denied =
                    part.state === "output-denied" ||
                    (part.state === "approval-responded" &&
                      !part.approval.approved)

                  return (
                    <Trace key={part.toolCallId}>
                      <TraceLine
                        status={
                          !denied && part.state !== "output-available"
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
                            : part.state === "output-available"
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
            onClick={() =>
              nextMessage
                ? sendMessage(nextMessage)
                : setMessages(initialMessages)
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
    <TraceCollapsible open={open ?? running} onOpenChange={setOpen}>
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
