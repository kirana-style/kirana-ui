import { IconPlaceholder } from "../../../icons/icon-placeholder"
import * as React from "react"
import { useChat } from "@ai-sdk/react"
import type { UIDataTypes, UIMessage } from "ai"

import { createChat, getMessageText } from "../../../lib/ai"
import { Bubble, BubbleContent } from "../ui/bubble"
import { Button } from "../ui/button"
import { CodeBlock, CodeBlockContent } from "../ui/code-block"
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
  thinkingRowIconPlaceholder: css({
    animationDuration: "1s",
    animationIterationCount: "infinite",
    animationName: spin,
    animationTimingFunction: "linear",
  }),
  thinkingRowTraceCollapsibleContent: css({
    whiteSpace: { "*": null, base: "pre-wrap" },
  }),
  toolRowCodeBlockContent: css({
    maxHeight: { "*": null, base: space[64] },
  }),
  toolRowCodeBlockContent2: css({
    maxHeight: { "*": null, base: space[64] },
  }),
  toolRowIconPlaceholder: css({
    animationDuration: "1s",
    animationIterationCount: "infinite",
    animationName: spin,
    animationTimingFunction: "linear",
  }),
  sourcesRowIconPlaceholder: css({
    animationDuration: "1s",
    animationIterationCount: "infinite",
    animationName: spin,
    animationTimingFunction: "linear",
  }),
  sourcesRowSpan: css({
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

type Part = ChatMessage["parts"][number]

const chat = createChat<ChatMessage>()
  .user("Why does pnpm install fail in CI?")
  .assistant(({ writer }) => {
    writer.reasoning(
      "CI installs with a frozen lockfile, so the install stops when package.json and pnpm-lock.yaml disagree. I should check what the last commit changed, then reproduce the install.",
      { delayMs: 40 }
    )
    writer
      .tool("runCommand", { input: { command: "pnpm --version" } })
      .sleep(700)
      .output({ stdout: "10.18.0" })
    writer
      .tool("runCommand", {
        input: {
          command: "git diff --stat HEAD~1 -- package.json pnpm-lock.yaml",
        },
      })
      .sleep(900)
      .output({
        stdout:
          " package.json | 2 +-\n 1 file changed, 1 insertion(+), 1 deletion(-)",
      })
    writer
      .tool("runCommand", {
        input: { command: "pnpm install --frozen-lockfile" },
      })
      .sleep(1200)
      .error(
        'ERR_PNPM_OUTDATED_LOCKFILE  Cannot install with "frozen-lockfile" because pnpm-lock.yaml is not up to date with package.json'
      )
    writer.sourceUrl({
      url: "https://pnpm.io/cli/install#--frozen-lockfile",
      title: "pnpm install | pnpm.io",
    })
    writer.sourceUrl({
      url: "https://pnpm.io/continuous-integration",
      title: "Continuous Integration | pnpm.io",
    })
    writer.sleep(1000)
    writer.text(
      "The last commit bumped a version in package.json without updating pnpm-lock.yaml, so the frozen install fails. Run pnpm install locally and commit the lockfile."
    )
  })

const transcript = chat.get()
const [question] = chat.get(1)
const transport = chat.transport({ delayMs: 20 })

function ThinkingRow({ text, running }: { text: string; running: boolean }) {
  const [open, setOpen] = React.useState<boolean>()

  const line = (
    <TraceLine status={running ? "running" : undefined}>
      <TraceIcon>
        {running ? (
          <IconPlaceholder
            lucide="LoaderCircleIcon"
            tabler="IconLoader2"
            hugeicons="Loading03Icon"
            phosphor="CircleNotchIcon"
            remixicon="RiLoader4Line"
            {...styleProps(styles.thinkingRowIconPlaceholder)}
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
      <TraceTitle>{running ? "Thinking" : "Thought for 5s"}</TraceTitle>
    </TraceLine>
  )

  if (text.length === 0) {
    return line
  }

  return (
    <TraceCollapsible isExpanded={open ?? running} onExpandedChange={setOpen}>
      <TraceCollapsibleTrigger>{line}</TraceCollapsibleTrigger>
      <TraceCollapsibleContent sx={styles.thinkingRowTraceCollapsibleContent}>
        {text}
      </TraceCollapsibleContent>
    </TraceCollapsible>
  )
}

function ToolRow({
  part,
  streaming,
  defaultOpen,
}: {
  part: Extract<Part, { type: "tool-runCommand" }>
  streaming: boolean
  defaultOpen?: boolean
}) {
  const command = part.input?.command

  if (part.state === "output-available" || part.state === "output-error") {
    const failed = part.state === "output-error"

    return (
      <TraceCollapsible defaultExpanded={defaultOpen}>
        <TraceCollapsibleTrigger>
          <TraceLine status={failed ? "error" : undefined}>
            <TraceIcon>
              {failed ? (
                <IconPlaceholder
                  lucide="CircleAlertIcon"
                  tabler="IconExclamationCircle"
                  hugeicons="AlertCircleIcon"
                  phosphor="WarningCircleIcon"
                  remixicon="RiErrorWarningLine"
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
            <TraceTitle>
              {failed ? "Failed to run" : "Ran"} {command}
            </TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          {failed ? (
            <CodeBlock size="sm" variant="destructive">
              <CodeBlockContent wrap sx={styles.toolRowCodeBlockContent}>
                {part.errorText}
              </CodeBlockContent>
            </CodeBlock>
          ) : (
            <CodeBlock size="sm">
              <CodeBlockContent wrap sx={styles.toolRowCodeBlockContent2}>
                {part.output.stdout}
              </CodeBlockContent>
            </CodeBlock>
          )}
        </TraceCollapsibleContent>
      </TraceCollapsible>
    )
  }

  return (
    <TraceLine status={streaming ? "running" : "error"}>
      <TraceIcon>
        {streaming ? (
          <IconPlaceholder
            lucide="LoaderCircleIcon"
            tabler="IconLoader2"
            hugeicons="Loading03Icon"
            phosphor="CircleNotchIcon"
            remixicon="RiLoader4Line"
            {...styleProps(styles.toolRowIconPlaceholder)}
          />
        ) : (
          <IconPlaceholder
            lucide="CircleAlertIcon"
            tabler="IconExclamationCircle"
            hugeicons="AlertCircleIcon"
            phosphor="WarningCircleIcon"
            remixicon="RiErrorWarningLine"
          />
        )}
      </TraceIcon>
      <TraceTitle>
        {streaming ? "Running" : "Failed to run"} {command}
      </TraceTitle>
    </TraceLine>
  )
}

function SourcesRow({
  sources,
  running,
}: {
  sources: Extract<Part, { type: "source-url" }>[]
  running: boolean
}) {
  return (
    <TraceCollapsible>
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
                {...styleProps(styles.sourcesRowIconPlaceholder)}
              />
            ) : (
              <IconPlaceholder
                lucide="GlobeIcon"
                tabler="IconGlobe"
                hugeicons="Globe02Icon"
                phosphor="GlobeIcon"
                remixicon="RiGlobeLine"
              />
            )}
          </TraceIcon>
          <TraceTitle>
            {running ? "Using" : "Used"} {sources.length} sources
          </TraceTitle>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent>
        <Trace>
          {sources.map((source) => (
            <a
              key={source.url}
              href={source.url}
              target="_blank"
              rel="noreferrer"
            >
              <TraceLine>
                <TraceIcon>
                  <IconPlaceholder
                    lucide="GlobeIcon"
                    tabler="IconGlobe"
                    hugeicons="Globe02Icon"
                    phosphor="GlobeIcon"
                    remixicon="RiGlobeLine"
                  />
                </TraceIcon>
                <TraceTitle>
                  {source.title ?? new URL(source.url).hostname}
                  <span sx={styles.sourcesRowSpan}> (opens in a new tab)</span>
                </TraceTitle>
                <TraceIcon>
                  <IconPlaceholder
                    lucide="ArrowUpRightIcon"
                    tabler="IconArrowUpRight"
                    hugeicons="ArrowUpRightIcon"
                    phosphor="ArrowUpRightIcon"
                    remixicon="RiArrowRightUpLine"
                  />
                </TraceIcon>
              </TraceLine>
            </a>
          ))}
        </Trace>
      </TraceCollapsibleContent>
    </TraceCollapsible>
  )
}

export default function TraceDemo() {
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
          const rows = message.parts.filter(
            (part) =>
              part.type === "reasoning" || part.type === "tool-runCommand"
          )
          const sources = message.parts.filter(
            (part) => part.type === "source-url"
          )
          const text = getMessageText(message)

          return (
            <Message key={message.id}>
              <MessageContent sx={styles.messageContent}>
                {rows.length + sources.length > 0 && (
                  <Trace>
                    {rows.map((part, index) =>
                      part.type === "reasoning" ? (
                        <ThinkingRow
                          key={index}
                          text={part.text}
                          running={streaming && part.state === "streaming"}
                        />
                      ) : part.type === "tool-runCommand" ? (
                        <ToolRow
                          key={part.toolCallId}
                          part={part}
                          streaming={streaming}
                          defaultOpen={index === 2}
                        />
                      ) : null
                    )}
                    {sources.length > 0 && (
                      <SourcesRow
                        sources={sources}
                        running={streaming && text.length === 0}
                      />
                    )}
                  </Trace>
                )}
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
            onPress={() => {
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
