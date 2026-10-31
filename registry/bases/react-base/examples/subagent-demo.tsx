import { IconPlaceholder } from "../../../icons/icon-placeholder"
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
  stepRowCodeBlockContent: css({
    maxHeight: { "*": null, base: space[64] },
  }),
  stepRowIconPlaceholder: css({
    animationDuration: "1s",
    animationIterationCount: "infinite",
    animationName: spin,
    animationTimingFunction: "linear",
  }),
  subagentRowIconPlaceholder: css({
    animationDuration: "1s",
    animationIterationCount: "infinite",
    animationName: spin,
    animationTimingFunction: "linear",
  }),
  subagentRowTraceCollapsibleContent: css({
    display: { "*": null, base: "flex" },
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[3] },
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

type SubagentMessage = UIMessage<
  unknown,
  UIDataTypes,
  {
    runCommand: {
      input: { command: string }
      output: { stdout: string }
    }
  }
>

type SubagentPart = SubagentMessage["parts"][number]

type ChatMessage = UIMessage<
  unknown,
  UIDataTypes,
  {
    researchAgent: {
      input: { task: string }
      output: SubagentMessage
    }
  }
>

type Part = ChatMessage["parts"][number]

const steps = [
  {
    command: "grep -rn cacheKey scripts",
    stdout:
      "scripts/optimize-images.ts:14:  const cacheKey = process.env.COMMIT_SHA",
  },
  {
    command: "sed -n 13,15p scripts/optimize-images.ts",
    stdout:
      'const cacheDir = ".next/cache/images"\nconst cacheKey = process.env.COMMIT_SHA\nconst cached = await restoreCache(cacheDir, cacheKey)',
  },
  {
    command: "ls public/images | wc -l",
    stdout: "1240",
  },
]

function getSubagentMessage(done: number, report?: string): SubagentMessage {
  const parts = steps.slice(0, done).map((step, index): SubagentPart => ({
    type: "tool-runCommand",
    toolCallId: `step-${index}`,
    state: "output-available",
    input: { command: step.command },
    output: { stdout: step.stdout },
  }))

  if (done < steps.length) {
    parts.push({
      type: "tool-runCommand",
      toolCallId: `step-${done}`,
      state: "input-available",
      input: { command: steps[done].command },
    })
  }

  if (report) {
    parts.push({ type: "text", text: report })
  }

  return { id: "research-agent", role: "assistant", parts }
}

const chat = createChat<ChatMessage>()
  .user("Why does image optimization rerun on every deploy?")
  .assistant(({ writer }) => {
    const subagent = writer
      .tool("researchAgent", {
        input: {
          task: "Find out why image optimization reruns on every deploy.",
        },
      })
      .sleep(600)
    steps.forEach((_, index) => {
      subagent
        .output(getSubagentMessage(index), { preliminary: true })
        .sleep(1000)
    })
    subagent
      .output(
        getSubagentMessage(
          steps.length,
          "The cache is keyed on the commit SHA, so every deploy misses it and optimizes all 1,240 images again."
        )
      )
      .sleep(400)
    writer.text(
      "Image optimization reruns because its cache is keyed on the commit SHA, which changes on every deploy. Key the cache on a hash of public/images instead, and unchanged images will be skipped."
    )
  })

const transcript = chat.get()
const [question] = chat.get(1)
const transport = chat.transport({ delayMs: 20 })

function StepRow({
  part,
  running,
}: {
  part: Extract<SubagentPart, { type: "tool-runCommand" }>
  running: boolean
}) {
  const command = part.input?.command

  if (part.state === "output-available") {
    return (
      <TraceCollapsible>
        <TraceCollapsibleTrigger>
          <TraceLine>
            <TraceIcon>
              <IconPlaceholder
                lucide="CircleCheckIcon"
                tabler="IconCircleCheckFilled"
                hugeicons="CheckmarkCircle01Icon"
                phosphor="CheckCircleIcon"
                remixicon="RiCheckboxCircleFill"
              />
            </TraceIcon>
            <TraceTitle>Ran {command}</TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          <CodeBlock size="sm">
            <CodeBlockContent wrap sx={styles.stepRowCodeBlockContent}>
              {part.output.stdout}
            </CodeBlockContent>
          </CodeBlock>
        </TraceCollapsibleContent>
      </TraceCollapsible>
    )
  }

  return (
    <TraceLine status={running ? "running" : "error"}>
      <TraceIcon>
        {running ? (
          <IconPlaceholder
            lucide="LoaderCircleIcon"
            tabler="IconLoader2"
            hugeicons="Loading03Icon"
            phosphor="CircleNotchIcon"
            remixicon="RiLoader4Line"
            {...styleProps(styles.stepRowIconPlaceholder)}
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
        {running ? "Running" : "Failed to run"} {command}
      </TraceTitle>
    </TraceLine>
  )
}

function SubagentRow({
  part,
  streaming,
}: {
  part: Extract<Part, { type: "tool-researchAgent" }>
  streaming: boolean
}) {
  const done = part.state === "output-available" && !part.preliminary
  const running = !done && part.state !== "output-error" && streaming
  const parts = part.state === "output-available" ? part.output.parts : []
  const report = parts
    .map((agentPart) => (agentPart.type === "text" ? agentPart.text : ""))
    .join("")

  const line = (
    <TraceLine status={done ? undefined : running ? "running" : "error"}>
      <TraceIcon>
        {done ? (
          <IconPlaceholder
            lucide="CircleCheckIcon"
            tabler="IconCircleCheckFilled"
            hugeicons="CheckmarkCircle01Icon"
            phosphor="CheckCircleIcon"
            remixicon="RiCheckboxCircleFill"
          />
        ) : running ? (
          <IconPlaceholder
            lucide="LoaderCircleIcon"
            tabler="IconLoader2"
            hugeicons="Loading03Icon"
            phosphor="CircleNotchIcon"
            remixicon="RiLoader4Line"
            {...styleProps(styles.subagentRowIconPlaceholder)}
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
        {done ? "Ran" : running ? "Running" : "Failed to run"} the research
        subagent
      </TraceTitle>
    </TraceLine>
  )

  if (parts.length === 0) {
    return line
  }

  return (
    <TraceCollapsible defaultOpen>
      <TraceCollapsibleTrigger>{line}</TraceCollapsibleTrigger>
      <TraceCollapsibleContent
        keepMounted
        sx={styles.subagentRowTraceCollapsibleContent}
      >
        <Trace>
          {parts.map((agentPart) =>
            agentPart.type === "tool-runCommand" ? (
              <StepRow
                key={agentPart.toolCallId}
                part={agentPart}
                running={running}
              />
            ) : null
          )}
        </Trace>
        {report && <p>{report}</p>}
      </TraceCollapsibleContent>
    </TraceCollapsible>
  )
}

export default function SubagentDemo() {
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
          const agents = message.parts.filter(
            (part) => part.type === "tool-researchAgent"
          )
          const text = getMessageText(message)

          return (
            <Message key={message.id}>
              <MessageContent sx={styles.messageContent}>
                {agents.length > 0 && (
                  <Trace>
                    {agents.map((part) => (
                      <SubagentRow
                        key={part.toolCallId}
                        part={part}
                        streaming={streaming}
                      />
                    ))}
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
