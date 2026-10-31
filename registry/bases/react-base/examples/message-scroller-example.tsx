import * as React from "react"
import { useChat } from "@ai-sdk/react"

import { createChat, getMessageText } from "../../../lib/ai"
import { Example, ExampleWrapper } from "../components/example"
import { Bubble, BubbleContent } from "../ui/bubble"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "../ui/input-group"
import { Marker, MarkerContent, MarkerIcon } from "../ui/marker"
import { Message, MessageContent } from "../ui/message"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "../ui/message-scroller"
import { Spinner } from "../ui/spinner"
import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { css } from "@kirana-style/core"
import { example } from "../../../styles/example.styles"
import { space } from "../../../core/scales"
import { cardCtx } from "../../../core/context"

const styles = {
  messageScrollerDemoExample: css({
    alignSelf: "flex-start",
  }),
  messageScrollerDemoCard: css({
    height: { "*": null, base: "35rem" },
  }),
  messageScrollerDemoCardContent: css({
    minHeight: { "*": null, base: space["0"] },
    flex: "1 1 0%",
    overflow: { "*": null, base: "hidden" },
    padding: { "*": null, base: space["0"] },
  }),
  messageScrollerDemoMessageScrollerContent: css({
    padding: { "*": null, base: cardCtx.spacing },
  }),
  messageScrollerDemoBubbleContent: css({
    whiteSpace: { "*": null, base: "pre-wrap" },
  }),
  messageScrollerDemoForm: css({
    width: "100%",
  }),
  messageScrollerDemoInputGroupTextarea: css({
    height: { "*": null, base: space[10] },
    minHeight: { "*": null, base: space[10] },
    overflowY: { "*": null, base: "auto" },
  }),
  messageScrollerDemoInputGroupAddon: css({
    padding: { "*": null, base: space[2] },
  }),
  messageScrollerDemoInputGroupButton: css({
    marginLeft: { "*": null, base: "auto" },
    display: { '[data-hidden="true"]': "none" },
  }),
  messageScrollerDemoSpan: css({
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
  messageScrollerDemoInputGroupButton2: css({
    marginLeft: { "*": null, base: "auto" },
    display: { '[data-hidden="true"]': "none" },
  }),
  messageScrollerDemoSpan2: css({
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
}

export default function MessageScrollerExample() {
  return (
    <ExampleWrapper>
      <MessageScrollerDemo />
    </ExampleWrapper>
  )
}

const chat = createChat()
  .user("Hello there!")
  .sleep(2000)
  .assistant("Hey, how's it going?")
  .user(
    `I'm prototyping an AI chat surface for our product docs.

Can you sketch a sensible component breakdown and call out anything I'd regret baking into v1?`
  )
  .sleep(2000)
  .assistant(
    `## Recommended layout

Treat the chat as three layers so scrolling and the composer never fight each other:

| Layer | Responsibility |
| --- | --- |
| **Shell** | Card or page frame, title, status indicator |
| **Transcript** | \`overflow-y-auto\` message list |
| **Composer** | Input group, send, stop |

### Message rendering

- **User messages**: right-aligned, muted background, \`max-w-[80%]\`.
- **Assistant messages**: full width within the column; use \`whitespace-pre-wrap\` for text.

### Suggested component split

\`\`\`tsx
<ChatCard>
  <ChatHeader status={status} />
  <ChatTranscript messages={messages} />
  <ChatComposer onSubmit={sendMessage} onStop={stop} />
</ChatCard>
\`\`\`

### v1 pitfalls to avoid

1. **Inlining transport logic in the UI** — keep scripted/demo transport beside your example, not inside shared components.
2. **Fixed transcript height without \`overflow-hidden\`** — parent must clip, child must scroll, or the composer jumps.
3. **Not giving the scroller a ref or auto-scroll flag** — long replies should stay pinned to the bottom unless the user scrolls up.

### Practical next step

Start with plain \`whitespace-pre-wrap\` text to validate spacing and scroll behavior. Once the transcript feels right, you can swap assistant text rendering to a richer renderer if you need it.

Want me to walk through auto-scroll vs. manual scroll-to-bottom next?`
  )
  .user(
    "What about message spacing when one reply is short and the next is really long?"
  )
  .sleep(2000)
  .assistant(
    `Good question. The scroll container should own vertical rhythm, not individual bubbles.

Use a consistent \`gap\` on the message list (something like \`gap-4\` or \`gap-6\`) so short and long messages sit on the same grid. For assistant replies that span many paragraphs, keep everything in one bubble rather than splitting on every line break — otherwise the transcript feels choppy when you're skimming.

When a long reply streams in, pin the viewport to the bottom with \`MessageScroller autoScroll\` until the user scrolls up. If they've scrolled away, show a scroll-to-bottom affordance instead of yanking them back mid-read.

That's usually enough for v1. Fancy diff animations or per-paragraph fade-ins can wait until you've validated that the base scroll + composer layout holds up on real devices.`
  )
  .user("Thanks, that helps.")
  .sleep(1000)
  .assistant(
    "Happy to help — send another message when you're ready to keep stepping through the demo."
  )

const initialMessages = chat.get(0)
const transport = chat.transport({
  delayMs: 10,
})

function MessageScrollerDemo() {
  const { messages, sendMessage, status, stop } = useChat({
    messages: initialMessages,
    transport,
  })
  const nextMessage = chat.next(messages)
  const isBusy = status === "submitted" || status === "streaming"

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!nextMessage || isBusy) {
      return
    }

    void sendMessage(nextMessage)
  }

  return (
    <Example title="Chat" containerSx={styles.messageScrollerDemoExample}>
      <Card sx={[styles.messageScrollerDemoCard, example.row]}>
        <CardHeader>
          <CardTitle>How can I help you today?</CardTitle>
          <CardDescription>Status: {status}</CardDescription>
        </CardHeader>
        <CardContent sx={styles.messageScrollerDemoCardContent}>
          <MessageScrollerProvider>
            <MessageScroller>
              <MessageScrollerViewport>
                <MessageScrollerContent
                  sx={styles.messageScrollerDemoMessageScrollerContent}
                >
                  {messages.map((message) => (
                    <MessageScrollerItem
                      key={message.id}
                      messageId={message.id}
                      scrollAnchor={message.role === "user"}
                    >
                      <Message
                        align={message.role === "user" ? "end" : "start"}
                      >
                        <MessageContent>
                          {message.parts.map((part, index) => {
                            if (part.type !== "text") {
                              return null
                            }

                            return (
                              <Bubble
                                key={`${message.id}-${index}`}
                                variant={
                                  message.role === "user" ? "default" : "muted"
                                }
                              >
                                <BubbleContent
                                  sx={styles.messageScrollerDemoBubbleContent}
                                >
                                  {part.text}
                                </BubbleContent>
                              </Bubble>
                            )
                          })}
                        </MessageContent>
                      </Message>
                    </MessageScrollerItem>
                  ))}
                  {status === "submitted" ? (
                    <MessageScrollerItem scrollAnchor={false}>
                      <Marker role="status">
                        <MarkerIcon>
                          <Spinner />
                        </MarkerIcon>
                        <MarkerContent>Thinking...</MarkerContent>
                      </Marker>
                    </MessageScrollerItem>
                  ) : null}
                </MessageScrollerContent>
              </MessageScrollerViewport>
              <MessageScrollerButton />
            </MessageScroller>
          </MessageScrollerProvider>
        </CardContent>
        <CardFooter>
          <form
            onSubmit={handleFormSubmit}
            sx={styles.messageScrollerDemoForm}
            id="chat-form"
          >
            <InputGroup>
              <InputGroupTextarea
                placeholder="Ask me anything..."
                sx={styles.messageScrollerDemoInputGroupTextarea}
                value={
                  isBusy ? "" : nextMessage ? getMessageText(nextMessage) : ""
                }
                readOnly
              />
              <InputGroupAddon
                align="block-end"
                sx={styles.messageScrollerDemoInputGroupAddon}
              >
                <InputGroupButton
                  variant="default"
                  size="icon-sm"
                  type="submit"
                  disabled={!nextMessage || isBusy}
                  sx={styles.messageScrollerDemoInputGroupButton}
                  data-hidden={isBusy}
                >
                  <IconPlaceholder
                    lucide="ArrowUpIcon"
                    tabler="IconArrowUp"
                    hugeicons="ArrowUp02Icon"
                    phosphor="ArrowUpIcon"
                    remixicon="RiArrowUpLine"
                  />
                  <span sx={styles.messageScrollerDemoSpan}>Send</span>
                </InputGroupButton>
                <InputGroupButton
                  size="icon-sm"
                  type="button"
                  data-hidden={!isBusy}
                  sx={styles.messageScrollerDemoInputGroupButton2}
                  onClick={() => stop()}
                >
                  <IconPlaceholder
                    lucide="StopCircleIcon"
                    tabler="IconPlayerStop"
                    hugeicons="StopCircleIcon"
                    phosphor="StopCircleIcon"
                    remixicon="RiStopCircleLine"
                  />
                  <span sx={styles.messageScrollerDemoSpan2}>Stop</span>
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </form>
        </CardFooter>
      </Card>
    </Example>
  )
}
