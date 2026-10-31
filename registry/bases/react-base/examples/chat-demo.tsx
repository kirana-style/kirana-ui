import { IconPlaceholder } from "../../../icons/icon-placeholder"
import * as React from "react"
import { useChat } from "@ai-sdk/react"
import type { UIDataTypes, UIMessage } from "ai"

import { createChat, getMessageText } from "../../../lib/ai"
import { MESSAGE_ANIMATIONS } from "../components/message-animations"
import { Markdown } from "../components/markdown"
import { Bubble, BubbleContent } from "../ui/bubble"
import { Button } from "../ui/button"
import { CodeBlock, CodeBlockContent } from "../ui/code-block"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "../ui/input-group"
import { Message, MessageContent } from "../ui/message"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "../ui/message-scroller"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
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
import { theme } from "../../../core/tokens"
import { fontSize, fontWeight, lineHeight, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

// Tailwind's `spin`.
const spin = keyframes({ to: { transform: "rotate(360deg)" } })

const styles = {
  // Upstream's `[[data-slot=preview]:has(&)>div]:p-0!`: the demo fills its preview, unpadded (the
  // page's own background is already `bg-background`).
  flush: css({ padding: { "*": null, base: "0" } }),
  div: css({
    position: "relative",
    display: "flex",
    width: "100%",
    flexDirection: "column",
    gap: space[4],
  }),
  div2: css({
    display: "flex",
    height: "50rem",
    width: "100%",
    flexDirection: "column",
    gap: space[4],
  }),
  div3: css({
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: space[4],
    padding: space[8],
    paddingBottom: space[4],
  }),
  div4: css({
    display: "flex",
    flexDirection: "column",
    gap: space[1],
  }),
  div5: css({
    fontWeight: fontWeight.medium,
  }),
  div6: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  div7: css({
    minHeight: space["0"],
    flex: "1 1 0%",
  }),
  empty: css({
    height: { "*": null, base: "100%" },
  }),
  messageScrollerContent: css({
    gap: { "*": null, base: space[6] },
    paddingInline: { "*": null, base: space[8] },
    paddingBlock: { "*": null, base: space["0"] },
  }),
  messageContent: css({
    gap: { "*": null, base: space[3] },
  }),
  div8: css({
    padding: space[8],
    paddingTop: space["0"],
  }),
  form: css({
    width: "100%",
  }),
  inputGroupTextarea: css({
    minHeight: space[14],
  }),
  inputGroupAddon: css({
    paddingTop: { "*": null, base: space[1] },
  }),
  dropdownMenuContent: css({
    width: { "*": null, base: space[44] },
  }),
  inputGroupButton: css({
    marginLeft: { "*": null, base: "auto" },
  }),
  span: css({
    borderWidth: "0",
    clipPath: "inset(50%)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    whiteSpace: "nowrap",
    width: "1px",
  }),
  reasoningRowIconPlaceholder: css({
    animationDuration: "1s",
    animationIterationCount: "infinite",
    animationName: spin,
    animationTimingFunction: "linear",
  }),
  reasoningRowTraceCollapsibleContent: css({
    whiteSpace: { "*": null, base: "pre-wrap" },
  }),
  toolRowCodeBlockContent: css({
    maxHeight: { "*": null, base: space[64] },
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

type ChatPart = ChatMessage["parts"][number]

type ToolPart = Extract<ChatPart, { type: "tool-runCommand" }>

const chat = createChat<ChatMessage>()
  .user("Add a dark mode toggle to the settings page.")
  .sleep(600)
  .assistant(({ writer }) => {
    writer.reasoning(
      "I need to know how themes are set up before I add a toggle. If next-themes is already in the layout, the toggle only has to call setTheme."
    )
    writer.sleep(400)
    writer
      .tool("runCommand", { input: { command: "rg -l ThemeProvider app" } })
      .sleep(800)
      .output({ stdout: "app/layout.tsx" })
    writer.sleep(500)
    writer.text(`next-themes is already set up in \`app/layout.tsx\`, so the toggle only has to call \`setTheme\`.

**Changes**

- Added \`components/mode-toggle.tsx\` with a Light and Dark option.
- Put \`<ModeToggle />\` next to the Appearance heading in \`app/settings/page.tsx\`.

\`\`\`tsx
const { setTheme } = useTheme()
\`\`\`
`)
  })
  .user("Make it follow the system setting by default.")
  .sleep(600)
  .assistant(({ writer }) => {
    writer.reasoning(
      "The default theme lives on the ThemeProvider. I should check what it is set to now."
    )
    writer.sleep(400)
    writer
      .tool("runCommand", {
        input: { command: "rg -n defaultTheme app/layout.tsx" },
      })
      .sleep(800)
      .output({
        stdout: '12:  <ThemeProvider attribute="class" defaultTheme="light">',
      })
    writer.sleep(500)
    writer.text(`It was set to \`light\`. I updated the \`ThemeProvider\` in \`app/layout.tsx\`:

\`\`\`tsx
<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
\`\`\`

New visitors now get the theme from their OS. The toggle also has a **System** option, so anyone who picked Light or Dark can switch back.
`)
  })
  .user("Run the build before I ship it.")
  .sleep(600)
  .assistant(({ writer }) => {
    writer
      .tool("runCommand", { input: { command: "pnpm build" } })
      .sleep(1600)
      .output({
        stdout:
          "▲ Next.js 16.0.0\n\n✓ Compiled successfully in 4.2s\n✓ Linting and checking validity of types\n✓ Generating static pages (12/12)",
      })
    writer.sleep(500)
    writer.text(`The build passes, so it is ready to ship.

- Compiled in **4.2s**.
- No lint or type errors.
- Generated all **12** static pages.
`)
  })

const initialMessages = chat.get(0)
const transport = chat.transport({
  delayMs: 16,
  fallback:
    "This demo only knows the scripted turns. Press reset to start over.",
})

export default function ChatDemo() {
  const { messages, sendMessage, setMessages, status } = useChat({
    messages: initialMessages,
    transport,
  })
  const [draft, setDraft] = React.useState<string | null>(null)
  const formRef = React.useRef<HTMLFormElement>(null)
  const nextMessage = chat.next(messages)
  const busy = status === "submitted" || status === "streaming"
  const text = draft ?? (nextMessage ? getMessageText(nextMessage) : "")
  const canSend = text.trim().length > 0 && !busy

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!canSend) {
      return
    }

    if (draft === null && nextMessage) {
      void sendMessage(nextMessage)
    } else {
      void sendMessage({ text: text.trim() })
    }
    setDraft(null)
  }

  return (
    <div sx={[page.example, styles.flush]}>
      <MessageScrollerProvider>
        <div sx={styles.div}>
          <div sx={styles.div2}>
            <div sx={styles.div3}>
              <div sx={styles.div4}>
                <div sx={styles.div5}>New Thread</div>
                <div sx={styles.div6}>Ask the agent to change your code.</div>
              </div>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label="Reset conversation"
                      onClick={() => {
                        setMessages(initialMessages)
                        setDraft(null)
                      }}
                      disabled={busy}
                    />
                  }
                >
                  <IconPlaceholder
                    lucide="RotateCwIcon"
                    tabler="IconRotateClockwise2"
                    hugeicons="Rotate01Icon"
                    phosphor="ArrowClockwiseIcon"
                    remixicon="RiRefreshLine"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Reset</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div sx={styles.div7}>
              {messages.length === 0 ? (
                <Empty sx={styles.empty}>
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <IconPlaceholder
                        lucide="MessageCircleDashedIcon"
                        tabler="IconMessageCircle"
                        hugeicons="BubbleChatIcon"
                        phosphor="ChatCircleDotsIcon"
                        remixicon="RiChat3Line"
                      />
                    </EmptyMedia>
                    <EmptyTitle>What should we build?</EmptyTitle>
                    <EmptyDescription>
                      The agent can read your code, run commands and make
                      changes. Press send to start.
                    </EmptyDescription>
                  </EmptyHeader>
                </Empty>
              ) : (
                <MessageScroller>
                  <MessageScrollerViewport>
                    <MessageScrollerContent
                      aria-busy={busy}
                      sx={styles.messageScrollerContent}
                    >
                      {messages.map((message) => {
                        if (message.role === "user") {
                          return (
                            <MessageScrollerItem
                              key={message.id}
                              messageId={message.id}
                              scrollAnchor
                              // Motion's `slide-up` variants there, its CSS keyframes here.
                              sx={MESSAGE_ANIMATIONS["slide-up"].sx}
                            >
                              <Message align="end">
                                <MessageContent>
                                  <Bubble align="end" variant="muted">
                                    <BubbleContent>
                                      {getMessageText(message)}
                                    </BubbleContent>
                                  </Bubble>
                                </MessageContent>
                              </Message>
                            </MessageScrollerItem>
                          )
                        }

                        const streaming = busy && message === messages.at(-1)
                        const steps = message.parts.filter(
                          (part) =>
                            part.type === "reasoning" ||
                            part.type === "tool-runCommand"
                        )
                        const reply = getMessageText(message)

                        return (
                          <MessageScrollerItem
                            key={message.id}
                            messageId={message.id}
                          >
                            <Message>
                              <MessageContent sx={styles.messageContent}>
                                {steps.length > 0 && (
                                  <Trace>
                                    {steps.map((part, index) => (
                                      <StepRow
                                        key={index}
                                        part={part}
                                        streaming={streaming}
                                      />
                                    ))}
                                  </Trace>
                                )}
                                {reply && <Markdown>{reply}</Markdown>}
                              </MessageContent>
                            </Message>
                          </MessageScrollerItem>
                        )
                      })}
                    </MessageScrollerContent>
                  </MessageScrollerViewport>
                  <MessageScrollerButton />
                </MessageScroller>
              )}
            </div>
            <div sx={styles.div8}>
              <form ref={formRef} onSubmit={onSubmit} sx={styles.form}>
                <InputGroup>
                  <InputGroupTextarea
                    value={text}
                    onChange={(event) => setDraft(event.target.value)}
                    placeholder="Ask the agent..."
                    aria-label="Message"
                    sx={styles.inputGroupTextarea}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && !event.shiftKey) {
                        event.preventDefault()
                        formRef.current?.requestSubmit()
                      }
                    }}
                  />
                  <InputGroupAddon
                    align="block-end"
                    sx={styles.inputGroupAddon}
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <InputGroupButton
                            aria-label="Add context"
                            type="button"
                            size="icon-sm"
                            variant="outline"
                          />
                        }
                      >
                        <IconPlaceholder
                          lucide="PlusIcon"
                          tabler="IconPlus"
                          hugeicons="PlusSignIcon"
                          phosphor="PlusIcon"
                          remixicon="RiAddLine"
                        />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="start"
                        side="top"
                        sx={styles.dropdownMenuContent}
                      >
                        <DropdownMenuItem>
                          <IconPlaceholder
                            lucide="PaperclipIcon"
                            tabler="IconPaperclip"
                            hugeicons="AttachmentIcon"
                            phosphor="PaperclipIcon"
                            remixicon="RiAttachmentLine"
                          />
                          Add Photos & Files
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <IconPlaceholder
                            lucide="TelescopeIcon"
                            tabler="IconTelescope"
                            hugeicons="Telescope01Icon"
                            phosphor="BinocularsIcon"
                            remixicon="RiSearchEyeLine"
                          />
                          Deep Research
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <IconPlaceholder
                            lucide="GlobeIcon"
                            tabler="IconGlobe"
                            hugeicons="Globe02Icon"
                            phosphor="GlobeIcon"
                            remixicon="RiGlobeLine"
                          />
                          Web Search
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <InputGroupButton
                      type="submit"
                      variant="default"
                      size="icon-sm"
                      disabled={!canSend}
                      sx={styles.inputGroupButton}
                    >
                      <IconPlaceholder
                        lucide="ArrowUpIcon"
                        tabler="IconArrowUp"
                        hugeicons="ArrowUp02Icon"
                        phosphor="ArrowUpIcon"
                        remixicon="RiArrowUpLine"
                      />
                      <span sx={styles.span}>Send</span>
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </form>
            </div>
          </div>
        </div>
      </MessageScrollerProvider>
    </div>
  )
}

function StepRow({ part, streaming }: { part: ChatPart; streaming: boolean }) {
  if (part.type === "reasoning") {
    return (
      <ReasoningRow text={part.text} running={part.state === "streaming"} />
    )
  }

  if (part.type === "tool-runCommand") {
    return <ToolRow part={part} streaming={streaming} />
  }

  return null
}

function ReasoningRow({ text, running }: { text: string; running: boolean }) {
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
                {...styleProps(styles.reasoningRowIconPlaceholder)}
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
      <TraceCollapsibleContent sx={styles.reasoningRowTraceCollapsibleContent}>
        {text}
      </TraceCollapsibleContent>
    </TraceCollapsible>
  )
}

function ToolRow({ part, streaming }: { part: ToolPart; streaming: boolean }) {
  const command = part.input?.command

  if (part.state === "output-available" || part.state === "output-error") {
    const failed = part.state === "output-error"

    return (
      <TraceCollapsible>
        <TraceCollapsibleTrigger>
          <TraceLine status={failed ? "error" : undefined}>
            <TraceIcon>
              <IconPlaceholder
                lucide="TerminalIcon"
                tabler="IconCommand"
                hugeicons="CommandIcon"
                phosphor="CommandIcon"
                remixicon="RiCommandLine"
              />
            </TraceIcon>
            <TraceTitle>
              {failed ? "Failed to run" : "Ran"} {command}
            </TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          <CodeBlock size="sm">
            <CodeBlockContent wrap sx={styles.toolRowCodeBlockContent}>
              {failed ? part.errorText : part.output.stdout}
            </CodeBlockContent>
          </CodeBlock>
        </TraceCollapsibleContent>
      </TraceCollapsible>
    )
  }

  return (
    <TraceLine status={streaming ? "running" : "error"}>
      <TraceIcon>
        <IconPlaceholder
          lucide="TerminalIcon"
          tabler="IconCommand"
          hugeicons="CommandIcon"
          phosphor="CommandIcon"
          remixicon="RiCommandLine"
        />
      </TraceIcon>
      <TraceTitle>
        {streaming ? "Running" : "Failed to run"} {command}
      </TraceTitle>
    </TraceLine>
  )
}
