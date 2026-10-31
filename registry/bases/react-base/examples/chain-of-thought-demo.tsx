import { IconPlaceholder } from "../../../icons/icon-placeholder"
import * as React from "react"
import { useChat } from "@ai-sdk/react"
import type { UIDataTypes, UIMessage } from "ai"

import { createChat, getMessageText } from "../../../lib/ai"
import { Badge } from "../ui/badge"
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
  fontFamily,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"

// Tailwind's `spin`.
const spin = keyframes({ to: { transform: "rotate(360deg)" } })

const styles = {
  statusIconIconPlaceholder: css({
    animationDuration: "1s",
    animationIterationCount: "infinite",
    animationName: spin,
    animationTimingFunction: "linear",
  }),
  stepRowCodeBlockContent: css({
    maxHeight: { "*": null, base: space[64] },
  }),
  stepRowSpan: css({
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
  stepRowCodeBlockContent2: css({
    maxHeight: { "*": null, base: space[64] },
  }),
  stepRowDiv: css({
    display: "flex",
    flexWrap: "wrap",
    gap: space["1.5"],
  }),
  stepRowBadge: css({
    fontFamily: { "*": null, base: fontFamily.mono },
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
    searchWeb: {
      input: { query: string }
      output: { results: { title: string; url: string }[] }
    }
    readBuildLog: {
      input: { deployment: string }
      output: { log: string }
    }
    searchCode: {
      input: { query: string }
      output: { files: string[] }
    }
  }
>

type StepPart = Extract<
  ChatMessage["parts"][number],
  { type: "tool-searchWeb" | "tool-readBuildLog" | "tool-searchCode" }
>

const chat = createChat<ChatMessage>()
  .user("Why is the checkout deploy so slow?")
  .assistant(({ writer }) => {
    writer
      .tool("readBuildLog", { input: { deployment: "dpl_8Kx2" } })
      .sleep(900)
      .output({
        log: "install    41s\ncompile    38s\nimages   3m 52s",
      })
    writer
      .tool("searchWeb", { input: { query: "next.js image cache key" } })
      .sleep(900)
      .output({
        results: [
          {
            title: "Image component | nextjs.org",
            url: "https://nextjs.org/docs/app/api-reference/components/image",
          },
          {
            title: "Build cache | vercel.com",
            url: "https://vercel.com/docs/deployments/troubleshoot-a-build",
          },
        ],
      })
    writer
      .tool("searchCode", { input: { query: "cacheKey" } })
      .sleep(900)
      .output({ files: ["next.config.ts", "scripts/optimize-images.ts"] })
    writer.text(
      "Image optimization takes almost four minutes because its cache key includes the commit hash. Key it on the image directory instead."
    )
  })

const transcript = chat.get()
const [question] = chat.get(1)
const transport = chat.transport({ delayMs: 20 })

function StatusIcon({ status }: { status?: "running" | "error" }) {
  if (status === "running") {
    return (
      <IconPlaceholder
        lucide="LoaderCircleIcon"
        tabler="IconLoader2"
        hugeicons="Loading03Icon"
        phosphor="CircleNotchIcon"
        remixicon="RiLoader4Line"
        {...styleProps(styles.statusIconIconPlaceholder)}
      />
    )
  }

  return status === "error" ? (
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
  )
}

function Step({
  title,
  status,
  defaultOpen,
  children,
}: {
  title: string
  status?: "running" | "error"
  defaultOpen?: boolean
  children?: React.ReactNode
}) {
  const line = (
    <TraceLine status={status}>
      <TraceIcon>
        <StatusIcon status={status} />
      </TraceIcon>
      <TraceTitle>{title}</TraceTitle>
    </TraceLine>
  )

  if (!children) {
    return line
  }

  return (
    <TraceCollapsible defaultOpen={defaultOpen}>
      <TraceCollapsibleTrigger>{line}</TraceCollapsibleTrigger>
      <TraceCollapsibleContent>{children}</TraceCollapsibleContent>
    </TraceCollapsible>
  )
}

function StepRow({ part, streaming }: { part: StepPart; streaming: boolean }) {
  const status =
    part.state === "output-available"
      ? undefined
      : part.state === "output-error" || !streaming
        ? "error"
        : "running"
  const verb = (running: string, done: string, failed: string) =>
    status === "running" ? running : status === "error" ? failed : done
  const error = part.state === "output-error" && (
    <CodeBlock size="sm" variant="destructive">
      <CodeBlockContent wrap sx={styles.stepRowCodeBlockContent}>
        {part.errorText}
      </CodeBlockContent>
    </CodeBlock>
  )

  if (part.type === "tool-searchWeb") {
    return (
      <Step
        status={status}
        title={`${verb("Searching", "Searched", "Failed to search")} the web for ${part.input?.query}`}
      >
        {error ||
          (part.state === "output-available" && (
            <Trace>
              {part.output.results.map((result) => (
                <a
                  key={result.url}
                  href={result.url}
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
                      {result.title}
                      <span sx={styles.stepRowSpan}> (opens in a new tab)</span>
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
          ))}
      </Step>
    )
  }

  if (part.type === "tool-readBuildLog") {
    return (
      <Step
        status={status}
        defaultOpen
        title={`${verb("Reading", "Read", "Failed to read")} the build log for ${part.input?.deployment}`}
      >
        {error ||
          (part.state === "output-available" && (
            <CodeBlock size="sm">
              <CodeBlockContent wrap sx={styles.stepRowCodeBlockContent2}>
                {part.output.log}
              </CodeBlockContent>
            </CodeBlock>
          ))}
      </Step>
    )
  }

  return (
    <Step
      status={status}
      title={`${verb("Searching", "Searched", "Failed to search")} the code for ${part.input?.query}`}
    >
      {error ||
        (part.state === "output-available" && (
          <div sx={styles.stepRowDiv}>
            {part.output.files.map((file) => (
              <Badge key={file} variant="secondary" sx={styles.stepRowBadge}>
                {file}
              </Badge>
            ))}
          </div>
        ))}
    </Step>
  )
}

function ChainOfThought({
  steps,
  streaming,
  answering,
}: {
  steps: StepPart[]
  streaming: boolean
  answering: boolean
}) {
  const [open, setOpen] = React.useState<boolean>()
  const running = streaming && !answering
  const failed = steps.filter((part) => part.state === "output-error").length
  const status = running ? "running" : failed > 0 ? "error" : undefined

  return (
    <Trace>
      <TraceCollapsible open={open ?? running} onOpenChange={setOpen}>
        <TraceCollapsibleTrigger>
          <TraceLine status={status}>
            <TraceIcon>
              <StatusIcon status={status} />
            </TraceIcon>
            <TraceTitle>
              {running
                ? "Researching"
                : `Researched in ${steps.length} steps${failed > 0 ? `, ${failed} failed` : ""}`}
            </TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent keepMounted>
          <Trace>
            {steps.map((part) => (
              <StepRow
                key={part.toolCallId}
                part={part}
                streaming={streaming}
              />
            ))}
          </Trace>
        </TraceCollapsibleContent>
      </TraceCollapsible>
    </Trace>
  )
}

export default function ChainOfThoughtDemo() {
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
          const steps = message.parts.filter(
            (part) =>
              part.type === "tool-searchWeb" ||
              part.type === "tool-readBuildLog" ||
              part.type === "tool-searchCode"
          )
          const text = getMessageText(message)

          return (
            <Message key={message.id}>
              <MessageContent sx={styles.messageContent}>
                {steps.length > 0 && (
                  <ChainOfThought
                    steps={steps}
                    streaming={streaming}
                    answering={text.length > 0}
                  />
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
