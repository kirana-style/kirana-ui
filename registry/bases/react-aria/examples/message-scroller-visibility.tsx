import { Button } from "react-aria-components"

import { createChat, getMessageText } from "../../../lib/ai"
import { Bubble, BubbleContent } from "../ui/bubble"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { HoverCard, HoverCardTrigger } from "../ui/hover-card"
import { Message, MessageContent } from "../ui/message"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
  useMessageScroller,
  useMessageScrollerVisibility,
} from "../ui/message-scroller"
import { css, props as styleProps, select } from "@kirana-style/core"
import { radius, theme } from "../../../core/tokens"
import {
  containerSize,
  duration,
  easing,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { cardCtx } from "../../../core/context"
import { page } from "../../../styles/page.styles"

const styles = {
  div: css({
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: space[4],
  }),
  div2: css({
    position: "relative",
    marginInline: "auto",
    width: "100%",
    maxWidth: containerSize.sm,
  }),
  card: css({
    height: { "*": null, base: "35rem" },
    width: { "*": null, base: "100%" },
    gap: { "*": null, base: space["0"] },
  }),
  cardHeader: css({
    gap: { "*": null, base: space[1] },
    borderBottomWidth: { "*": null, base: "1px" },
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderBottomColor: theme.border,
    borderStyle: { "*": null, base: "solid" },
    // Upstream's `[.border-b]:pb-(--card-spacing)`.
    paddingBottom: cardCtx.spacing,
  }),
  cardContent: css({
    flex: "1 1 0%",
    overflow: { "*": null, base: "hidden" },
    padding: { "*": null, base: space["0"] },
  }),
  messageScrollerContent: css({
    padding: { "*": null, base: cardCtx.spacing },
  }),
  bubbleContent: css({
    [select.child(":not(:last-child)")]: {
      marginBlockStart: "0px",
      marginBottom: space[2],
    },
  }),
  p: css({
    whiteSpace: "pre-wrap",
  }),
  div3: css({
    position: "absolute",
    top: "50%",
    right: `calc(${space[12]} * -1)`,

    translate: "0 -50%",
  }),
  div4: css({
    marginInline: "auto",
    maxWidth: containerSize.sm,
    paddingInline: space["0.5"],
    textAlign: "center",
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
  }),
  transcriptOutlineButton: css({
    display: "flex",
    height: space[9],
    width: space[9],
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: space[1],
    borderRadius: radius.md,
    transitionDuration: duration[150],
    transitionProperty:
      "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke",
    transitionTimingFunction: easing.inOut,
    outlineStyle: "none",

    boxShadow: {
      ":focus-visible": `0 0 0 3px color-mix(in oklab, ${theme.ring} 50%, transparent)`,
    },
  }),
  transcriptOutlineSpan: css({
    height: space["0.5"],
    width: space[4],
    borderRadius: radius.full,
    backgroundColor: {
      base: `color-mix(in oklab, ${theme.mutedForeground} 40%, transparent)`,
      '[data-current="true"]': theme.foreground,
    },
  }),
  transcriptOutlineHoverCard: css({
    display: { "*": null, base: "flex" },
    width: { "*": null, base: space[64] },
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[1] },
    borderRadius: { "*": null, base: radius["2xl"] },
    padding: { "*": null, base: space[1] },
  }),
  transcriptOutlineButton2: css({
    display: "flex",
    minHeight: space[7],
    alignItems: "center",
    borderRadius: radius.xl,
    paddingInline: space[2],
    paddingBlock: space["1.5"],
    textAlign: "left",
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    transitionDuration: duration[150],
    transitionProperty:
      "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke",
    transitionTimingFunction: easing.inOut,
    outlineStyle: "none",

    backgroundColor: {
      ":hover": theme.accent,
      ":focus-visible": theme.accent,
      '[aria-current="true"]': theme.accent,
    },
    color: {
      ":hover": theme.accentForeground,
      ":focus-visible": theme.accentForeground,
      '[aria-current="true"]': theme.accentForeground,
    },
  }),
  transcriptOutlineSpan2: css({
    WebkitLineClamp: "1",
    WebkitBoxOrient: "vertical",
    display: "-webkit-box",
    overflow: "hidden",
    minWidth: space["0"],
  }),
}

const chat = createChat()
  .user("Review the incident handoff and tell me what to read first.", {
    id: "vis-brief",
  })
  .assistant(
    "Start with the summary and the impact section. The regression affected the upload queue, but the recovery path completed for every queued job."
  )
  .user("What was the customer impact?", {
    id: "vis-impact",
  })
  .assistant(
    "Impact was limited to delayed processing.\n\nNo records were dropped, and the reconciliation worker confirmed each retry batch. Support saw confusion from two customers, but there were no checkout or billing errors."
  )
  .user("What actions are open?", {
    id: "vis-actions",
  })
  .assistant(
    "Keep the retry window enabled until the next deploy, then add a queue-depth alert as the long-term fix.\n\nThe alert should fire on sustained queue growth, not a single short spike."
  )
  .user("Give me the follow-up checklist.", {
    id: "vis-checklist",
  })
  .assistant(
    "After that, compare the queue recovery graph with the deploy timeline so the handoff shows exactly when processing returned to baseline. That makes it easier for support and engineering to answer the same customer questions without re-reading the whole incident thread.\n\nI would also add a short owner note beside each follow-up item. The checklist is small, but ownership keeps the retry-window decision, alert tuning, and support macro from drifting into separate follow-up conversations.\n\nKeep the retry window enabled until the next deploy, then add a queue-depth alert as the long-term fix.\n\nThe alert should fire on sustained queue growth, not a single short spike."
  )

const messages = chat.get()
const userMessages = messages.filter((message) => message.role === "user")

export default function MessageScrollerVisibility() {
  return (
    <div sx={page.example}>
      <MessageScrollerProvider scrollMargin={12}>
        <div sx={styles.div}>
          <div sx={styles.div2}>
            <Card sx={styles.card}>
              <CardHeader sx={styles.cardHeader}>
                <CardTitle>Transcript Outline</CardTitle>
                <CardDescription>
                  Track the current anchored turn.
                </CardDescription>
              </CardHeader>
              <CardContent sx={styles.cardContent}>
                <MessageScroller>
                  <MessageScrollerViewport>
                    <MessageScrollerContent sx={styles.messageScrollerContent}>
                      {messages.map((message) => {
                        const isUserMessage = message.role === "user"
                        const text = getMessageText(message)

                        return (
                          <MessageScrollerItem
                            key={message.id}
                            messageId={message.id}
                            scrollAnchor={isUserMessage}
                          >
                            <Message align={isUserMessage ? "end" : "start"}>
                              <MessageContent>
                                <Bubble
                                  variant={isUserMessage ? "muted" : "ghost"}
                                >
                                  <BubbleContent sx={styles.bubbleContent}>
                                    {text
                                      .split(/\n\s*\n/)
                                      .map((paragraph) => paragraph.trim())
                                      .filter(Boolean)
                                      .map((paragraph, index) => (
                                        <p key={index} sx={styles.p}>
                                          {paragraph}
                                        </p>
                                      ))}
                                  </BubbleContent>
                                </Bubble>
                              </MessageContent>
                            </Message>
                          </MessageScrollerItem>
                        )
                      })}
                    </MessageScrollerContent>
                  </MessageScrollerViewport>
                  <MessageScrollerButton />
                </MessageScroller>
              </CardContent>
            </Card>
            <div sx={styles.div3}>
              <TranscriptOutline />
            </div>
          </div>
          <div sx={styles.div4}>
            Open the outline to jump between anchored turns as you read.
          </div>
        </div>
      </MessageScrollerProvider>
    </div>
  )
}

function TranscriptOutline() {
  const { scrollToMessage } = useMessageScroller()
  const { currentAnchorId } = useMessageScrollerVisibility()

  return (
    <HoverCardTrigger>
      <Button
        aria-label="Open transcript outline"
        {...styleProps(styles.transcriptOutlineButton)}
      >
        {userMessages.map((message) => (
          <span
            key={message.id}
            data-current={message.id === currentAnchorId}
            sx={styles.transcriptOutlineSpan}
          />
        ))}
      </Button>
      <HoverCard
        placement="left"
        offset={-28}
        sx={styles.transcriptOutlineHoverCard}
      >
        {userMessages.map((message) => (
          <button
            key={message.id}
            type="button"
            aria-current={
              currentAnchorId === message.id ? "location" : undefined
            }
            sx={styles.transcriptOutlineButton2}
            onClick={() =>
              scrollToMessage(message.id, {
                align: "start",
                behavior: "smooth",
              })
            }
          >
            <span sx={styles.transcriptOutlineSpan2}>
              {getTrimmedMessageText(message)}
            </span>
          </button>
        ))}
      </HoverCard>
    </HoverCardTrigger>
  )
}

function getTrimmedMessageText(message: (typeof userMessages)[number]) {
  const text = getMessageText(message)

  return text.length > 42 ? `${text.slice(0, 39)}...` : text
}
