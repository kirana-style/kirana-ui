import { Component, computed } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { clientTools, injectChat } from "@tanstack/ai-angular"
import type { UIMessage } from "@tanstack/ai-angular"
import { toolDefinition } from "@tanstack/ai/client"
import * as z from "zod"
import { createChat, getMessageText } from "../../../lib/tanstack-ai"
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
import { ReasoningRow } from "../components/confirmation-demo-tanstack-ai/reasoning-row"

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

// The command runs on the client once the person approves it: TanStack AI asks for the approval
// itself, as a tool-approval interrupt, before it calls the tool.
const runCommand = toolDefinition({
  name: "runCommand",
  description: "Run a shell command in this project.",
  inputSchema: z.object({ command: z.string() }),
  outputSchema: z.object({ stdout: z.string() }),
  needsApproval: true,
}).client(() => ({ stdout: "" }))

const tools = clientTools(runCommand)

type ChatMessage = UIMessage<typeof tools>

type ToolPart = Extract<ChatMessage["parts"][number], { type: "tool-call" }>

// A denied call ends in an error, as a failed one does: TanStack AI 1.2 records no
// `outcome: "denied"` on a call denied on the client, and this tool cannot fail (LF-042).
const denied = (part: ToolPart) => part.state === "error"

const chat = createChat<typeof tools>()
  .user("Clean up the build folder.")
  .sleep(600)
  .assistant(({ writer }) => {
    writer.reasoning(
      "The build output lives in dist. Deleting it cannot be undone, so I should ask before I run the command."
    )
    writer.sleep(400)
    // No output: the turn waits for the client to run the tool, or for the person to deny it.
    writer.tool("runCommand", { input: { command: "rm -rf dist" } })
  })
  .assistant(({ writer, messages }) => {
    // The helper's `toolCall` carries no result from TanStack AI's client yet, so read the call (LF-037).
    const call = messages
      ?.at(-1)
      ?.parts.find(
        (part) => part.type === "tool-call" && part.name === "runCommand"
      )
    writer.sleep(600)
    writer.text(
      call?.type === "tool-call" && call.state === "complete"
        ? "Removed the dist folder."
        : "Okay, I left the dist folder in place."
    )
  })

const initialMessages = chat.get(0)
const connection = chat.transport({ delayMs: 20 })

@Component({
  selector: "confirmation-demo-tanstack-ai",
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
    ReasoningRow,
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
        @for (message of chat.messages(); track message.id) {
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
                    <p>{{ part.content }}</p>
                  } @else if (part.type === "thinking") {
                    <!-- A thinking part has no state: it runs while it is the streaming message's last part. -->
                    <div kuiTrace>
                      <kui-reasoning-row
                        [text]="part.content"
                        [running]="
                          streaming(message) && part === message.parts.at(-1)
                        "
                      />
                    </div>
                  } @else if (
                    part.type === "tool-call" && part.name === "runCommand"
                  ) {
                    <!-- A pending approval is a prompt, not activity, so it sits outside Trace. -->
                    @if (awaitingApproval(part.id)) {
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
                            {{ part.input?.command }}?
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
                            (click)="answer(part.id, false)"
                          >
                            Deny
                          </button>
                          <button
                            kuiButton
                            size="sm"
                            (click)="answer(part.id, true)"
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
                            !denied(part) && part.state !== 'complete'
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
                                : part.state === "complete"
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
export default class ConfirmationDemoTanstackAi {
  protected readonly chat = injectChat({
    initialMessages,
    connection,
    threadId: "confirmation-demo",
    tools,
  })
  protected readonly nextMessage = computed(() =>
    chat.next(this.chat.messages())
  )
  protected readonly busy = computed(
    () =>
      this.chat.status() === "submitted" || this.chat.status() === "streaming"
  )
  protected streaming(message: ChatMessage) {
    return this.busy() && message === this.chat.messages().at(-1)
  }
  protected approvalOf(toolCallId: string) {
    return this.chat
      .interrupts()
      .find(
        (interrupt) =>
          interrupt.kind === "tool-approval" &&
          interrupt.toolCallId === toolCallId
      )
  }
  protected awaitingApproval(toolCallId: string) {
    return this.approvalOf(toolCallId) !== undefined
  }
  protected answer(toolCallId: string, approved: boolean) {
    const approval = this.approvalOf(toolCallId)
    if (approval?.kind !== "tool-approval") return
    if (approved) approval.resolveInterrupt(true)
    else approval.resolveInterrupt(false)
  }
  protected advance() {
    const next = this.nextMessage()
    if (next) void this.chat.append(next)
    else this.chat.setMessages(initialMessages)
  }
  protected readonly styles = styles
  protected readonly denied = denied
  protected readonly getMessageText = getMessageText
  protected readonly page = page
}
