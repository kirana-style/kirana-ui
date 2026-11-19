import { Component, computed } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { lastAssistantMessageIsCompleteWithApprovalResponses } from "ai"
import type { UIDataTypes, UIMessage } from "ai"
import { Chat } from "../../../lib/angular/chat"
import { createChat, getMessageText } from "../../../lib/ai"
import { css } from "@kirana-style/core"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
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
import { ReasoningLine } from "../components/tool-approval/reasoning-line"

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

type Part = ChatMessage["parts"][number]

const denied = (part: Extract<Part, { type: "tool-runCommand" }>) =>
  part.state === "output-denied" ||
  (part.state === "approval-responded" && !part.approval.approved)

@Component({
  selector: "tool-approval",
  imports: [
    Bubble,
    BubbleContent,
    Button,
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
    Message,
    MessageContent,
    ReasoningLine,
    Trace,
    TraceIcon,
    TraceLine,
    TraceTitle,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.div">
        @for (message of chat.messages; track message.id) {
          @if (message.role === "user") {
            <div kuiMessage align="end">
              <div kuiMessageContent>
                <div kuiBubble align="end" variant="muted">
                  <div kuiBubbleContent>{{ getMessageText(message) }}</div>
                </div>
              </div>
            </div>
          } @else {
            <div kuiMessage>
              <div kuiMessageContent [sx]="styles.messageContent">
                @for (part of message.parts; track index; let index = $index) {
                  @if (part.type === "text") {
                    <p>{{ part.text }}</p>
                  } @else if (part.type === "reasoning") {
                    <div kuiTrace>
                      <kui-reasoning-line
                        [text]="part.text"
                        [running]="part.state === 'streaming'"
                      />
                    </div>
                  } @else if (part.type === "tool-runCommand") {
                    <!-- A pending approval is a prompt, not activity, so it sits outside Trace. -->
                    @if (part.state === "approval-requested") {
                      <div kuiItem variant="outline" size="sm">
                        <div kuiItemMedia variant="icon">
                          <svg
                            iconPlaceholder
                            lucide="CommandIcon"
                            tabler="IconCommand"
                            hugeicons="CommandIcon"
                            phosphor="CommandIcon"
                            remixicon="RiCommandLine"
                          ></svg>
                        </div>
                        <div kuiItemContent>
                          <div kuiItemTitle>
                            Run
                            {{ part.input.command }}?
                          </div>
                          <p kuiItemDescription>
                            The command runs in this project.
                          </p>
                        </div>
                        <div kuiItemActions>
                          <button
                            kuiButton
                            size="sm"
                            variant="outline"
                            (click)="
                              chat.addToolApprovalResponse({
                                id: part.approval.id,
                                approved: false,
                              })
                            "
                          >
                            Deny
                          </button>
                          <button
                            kuiButton
                            size="sm"
                            (click)="
                              chat.addToolApprovalResponse({
                                id: part.approval.id,
                                approved: true,
                              })
                            "
                          >
                            Approve
                          </button>
                        </div>
                      </div>
                    } @else {
                      <div kuiTrace>
                        <span
                          kuiTraceLine
                          [status]="
                            !denied(part) && part.state !== 'output-available'
                              ? 'running'
                              : undefined
                          "
                        >
                          <span kuiTraceIcon>
                            <svg
                              iconPlaceholder
                              lucide="CommandIcon"
                              tabler="IconCommand"
                              hugeicons="CommandIcon"
                              phosphor="CommandIcon"
                              remixicon="RiCommandLine"
                            ></svg>
                          </span>
                          <span kuiTraceTitle>
                            {{
                              denied(part)
                                ? "Denied"
                                : part.state === "output-available"
                                  ? "Ran"
                                  : "Running"
                            }}
                            {{ part.input?.command }}
                          </span>
                        </span>
                      </div>
                    }
                  }
                }
              </div>
            </div>
          }
        }
        @if (!busy()) {
          <button
            kuiButton
            variant="outline"
            size="sm"
            [sx]="styles.button"
            (click)="advance()"
          >
            {{ nextMessage() ? "Send message" : "Reset" }}
          </button>
        }
      </div>
    </div>
  `,
})
export default class ToolApproval {
  protected readonly chat = new Chat<ChatMessage>({
    messages: initialMessages,
    transport,
    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithApprovalResponses,
  })
  protected readonly nextMessage = computed(() => chat.next(this.chat.messages))
  protected readonly busy = computed(
    () => this.chat.status === "submitted" || this.chat.status === "streaming"
  )
  protected advance() {
    const next = this.nextMessage()
    if (next) void this.chat.sendMessage(next)
    else this.chat.messages = initialMessages
  }
  protected readonly styles = styles
  protected readonly denied = denied
  protected readonly getMessageText = getMessageText
  protected readonly page = page
}
