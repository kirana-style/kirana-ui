import { ReasoningRow } from "../components/confirmation-demo/reasoning-row"
import { For, Match, Show, Switch, createMemo } from "solid-js"
import { IconPlaceholder } from "../ui/icon-placeholder"
import { Chat } from "../../../lib/solid/chat"
import { lastAssistantMessageIsCompleteWithApprovalResponses } from "ai"
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
import { Trace, TraceIcon, TraceLine, TraceTitle } from "../ui/trace"
import { css } from "@kirana-style/core"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import type { UIDataTypes, UIMessage } from "ai"

export default function ConfirmationDemo() {
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

  const conversation = new Chat<ChatMessage>({
    messages: initialMessages,
    transport,
    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithApprovalResponses,
  })
  const nextMessage = createMemo(() => chat.next(conversation.messages))
  const busy = createMemo(
    () =>
      conversation.status === "submitted" || conversation.status === "streaming"
  )
  type Part = ChatMessage["parts"][number]
  const denied = (part: Extract<Part, { type: "tool-runCommand" }>) =>
    part.state === "output-denied" ||
    (part.state === "approval-responded" && !part.approval.approved)

  function advance() {
    const next = nextMessage()
    if (next) void conversation.sendMessage(next)
    else conversation.messages = initialMessages
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
                    <For each={message.parts}>
                      {(part) => (
                        <Switch>
                          <Match when={part.type === "text" && part}>
                            {(text) => <p>{text().text}</p>}
                          </Match>
                          <Match when={part.type === "reasoning" && part}>
                            {(reasoning) => (
                              <Trace>
                                <ReasoningRow
                                  text={reasoning().text}
                                  running={reasoning().state === "streaming"}
                                />
                              </Trace>
                            )}
                          </Match>
                          {/* A pending approval is a prompt, not activity, so it sits outside Trace. */}
                          <Match
                            when={
                              part.type === "tool-runCommand" &&
                              part.state === "approval-requested" &&
                              part
                            }
                          >
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
                                    Run {tool().input.command}?
                                  </ItemTitle>
                                  <ItemDescription>
                                    The command runs in this project.
                                  </ItemDescription>
                                </ItemContent>
                                <ItemActions>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() =>
                                      conversation.addToolApprovalResponse({
                                        id: tool().approval.id,
                                        approved: false,
                                      })
                                    }
                                  >
                                    Deny
                                  </Button>
                                  <Button
                                    size="sm"
                                    onClick={() =>
                                      conversation.addToolApprovalResponse({
                                        id: tool().approval.id,
                                        approved: true,
                                      })
                                    }
                                  >
                                    Approve
                                  </Button>
                                </ItemActions>
                              </Item>
                            )}
                          </Match>
                          <Match when={part.type === "tool-runCommand" && part}>
                            {(tool) => (
                              <Trace>
                                <TraceLine
                                  status={
                                    !denied(tool()) &&
                                    tool().state !== "output-available"
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
                                      : tool().state === "output-available"
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
