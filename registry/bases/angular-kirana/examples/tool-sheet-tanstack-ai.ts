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
  fontFamily,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Bubble, BubbleContent } from "../ui/bubble"
import { Button } from "../ui/button"
import { CodeBlock, CodeBlockContent } from "../ui/code-block"
import { Message, MessageContent } from "../ui/message"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"
import { Trace, TraceIcon, TraceLine, TraceTitle } from "../ui/trace"

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
  sheetTitle: css({
    fontFamily: { "*": null, base: fontFamily.mono },
  }),
  codeBlock: css({
    marginInline: { "*": null, base: space[6] },
    marginBottom: { "*": null, base: space[6] },
    width: { "*": null, base: "auto" },
  }),
  button: css({
    marginTop: { "*": null, base: "auto" },
    alignSelf: { "*": null, base: "flex-start" },
  }),
}

const PACKAGE_JSON = `{
  "name": "acme-chat",
  "private": true,
  "dependencies": {
    "@ai-sdk/react": "^4.0.0",
    "ai": "^7.0.0",
    "next": "^16.3.0"
  }
}`

// The server's tool, as the client takes it for its types: the server runs it.
const readFile = toolDefinition({
  name: "readFile",
  description: "Read a file in the project.",
  inputSchema: z.object({ path: z.string() }),
  outputSchema: z.object({ path: z.string(), content: z.string() }),
})

const tools = clientTools(readFile)

type ChatMessage = UIMessage<typeof tools>

const chat = createChat<typeof tools>()
  .user("Which AI SDK version does this app use?")
  .assistant(({ writer }) => {
    writer
      .tool("readFile", { input: { path: "package.json" } })
      .sleep(900)
      .output({ path: "package.json", content: PACKAGE_JSON })
    writer.text("It uses ai 7 with @ai-sdk/react 4.")
  })

const initialMessages = chat.get(0)

const connection = chat.transport({ delayMs: 20 })

type ReadFilePart = Extract<ChatMessage["parts"][number], { type: "tool-call" }>

@Component({
  selector: "tool-sheet-tanstack-ai",
  imports: [
    Bubble,
    BubbleContent,
    Button,
    CodeBlock,
    CodeBlockContent,
    Message,
    MessageContent,
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
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
                  } @else if (
                    part.type === "tool-call" && part.name === "readFile"
                  ) {
                    @if (part.state !== "complete") {
                      <div kuiTrace>
                        <span
                          kuiTraceLine
                          [status]="
                            running(message, part) ? 'running' : 'error'
                          "
                        >
                          <span kuiTraceIcon>
                            <svg
                              iconPlaceholder
                              lucide="FileTextIcon"
                              tabler="IconFileText"
                              hugeicons="FileIcon"
                              phosphor="FileTextIcon"
                              remixicon="RiFileTextLine"
                            ></svg>
                          </span>
                          <span kuiTraceTitle>
                            {{
                              running(message, part)
                                ? "Reading"
                                : "Failed to read"
                            }}
                            {{ part.input?.path }}
                          </span>
                        </span>
                      </div>
                    } @else {
                      <div kuiTrace>
                        <ng-container kuiSheet>
                          <button kuiSheetTrigger>
                            <span kuiTraceLine>
                              <span kuiTraceIcon>
                                <svg
                                  iconPlaceholder
                                  lucide="FileTextIcon"
                                  tabler="IconFileText"
                                  hugeicons="FileIcon"
                                  phosphor="FileTextIcon"
                                  remixicon="RiFileTextLine"
                                ></svg>
                              </span>
                              <span kuiTraceTitle>
                                Read
                                {{ part.output?.path }}
                              </span>
                              <span kuiTraceIcon>
                                <svg
                                  iconPlaceholder
                                  lucide="ChevronRightIcon"
                                  tabler="IconChevronRight"
                                  hugeicons="ArrowRight01Icon"
                                  phosphor="CaretRightIcon"
                                  remixicon="RiArrowRightSLine"
                                ></svg>
                              </span>
                            </span>
                          </button>
                          <div kuiSheetContent>
                            <div kuiSheetHeader>
                              <h2 kuiSheetTitle [sx]="styles.sheetTitle">
                                {{ part.output?.path }}
                              </h2>
                              <p kuiSheetDescription>
                                {{
                                  (part.output?.content ?? "").split(
                                    "
"
                                  ).length
                                }}
                                lines
                              </p>
                            </div>
                            <div kuiCodeBlock [sx]="styles.codeBlock">
                              <pre kuiCodeBlockContent lineNumbers>{{
                                part.output?.content
                              }}</pre>
                            </div>
                          </div>
                        </ng-container>
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
export default class ToolSheetTanstackAi {
  protected readonly chat = injectChat({
    initialMessages,
    connection,
    threadId: "tool-sheet",
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
  protected running(message: ChatMessage, part: ReadFilePart) {
    return (
      this.streaming(message) &&
      part.state !== "complete" &&
      part.state !== "error"
    )
  }
  protected advance() {
    const next = this.nextMessage()
    if (next) void this.chat.append(next)
    else this.chat.setMessages(initialMessages)
  }
  protected readonly styles = styles
  protected readonly getMessageText = getMessageText
  protected readonly page = page
}
