import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { useChat } from "@ai-sdk/react"
import type { UIMessage } from "ai"

import { createChat, getMessageText } from "../../../lib/ai"
import { Bubble, BubbleContent } from "../ui/bubble"
import { Button } from "../ui/button"
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
import { css } from "@kirana-style/core"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  sourcesSpan: css({
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

const chat = createChat()
  .user("How do I start an Astro project with pnpm?")
  .assistant(({ writer }) => {
    writer.text(
      "Run pnpm create astro@latest and follow the prompts. It scaffolds the project and installs the dependencies."
    )
    writer.sourceUrl({
      url: "https://docs.astro.build/en/install-and-setup/",
      title: "Install Astro | docs.astro.build",
    })
    writer.sourceUrl({
      url: "https://www.npmjs.com/package/create-astro",
      title: "create-astro | npmjs.com",
    })
    writer.sourceUrl({
      url: "https://docs.astro.build/en/install-and-setup/",
      title: "Install Astro | docs.astro.build",
    })
    writer.sourceUrl({
      url: "https://pnpm.io/cli/create",
      title: "pnpm create | pnpm.io",
    })
  })

const transcript = chat.get()
const [question] = chat.get(1)
const transport = chat.transport({ delayMs: 20 })

type SourcePart = Extract<UIMessage["parts"][number], { type: "source-url" }>

function Sources({ sources }: { sources: SourcePart[] }) {
  return (
    <Trace>
      <TraceCollapsible defaultExpanded>
        <TraceCollapsibleTrigger>
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
            <TraceTitle>Used {sources.length} sources</TraceTitle>
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
                  <TraceTitle>
                    {source.title ?? new URL(source.url).hostname}
                    <span sx={styles.sourcesSpan}> (opens in a new tab)</span>
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
    </Trace>
  )
}

export default function SourcesDemo() {
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

          const sources = message.parts
            .filter((part) => part.type === "source-url")
            .filter(
              (part, index, all) =>
                all.findIndex((other) => other.url === part.url) === index
            )
          const text = getMessageText(message)

          return (
            <Message key={message.id}>
              <MessageContent sx={styles.messageContent}>
                {text && <p>{text}</p>}
                {sources.length > 0 && <Sources sources={sources} />}
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
