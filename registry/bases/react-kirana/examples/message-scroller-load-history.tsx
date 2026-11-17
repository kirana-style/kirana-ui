import { IconPlaceholder } from "../../../icons/icon-placeholder"
import * as React from "react"
import { toast } from "sonner"

import { createChat, getMessageText } from "../../../lib/ai"
import { Bubble, BubbleContent } from "../ui/bubble"
import { Button } from "../ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Marker, MarkerContent } from "../ui/marker"
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
import { css, select } from "@kirana-style/core"
import { theme } from "../../../core/tokens"
import {
  containerSize,
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
  card: css({
    marginInline: { "*": null, base: "auto" },
    height: { "*": null, base: "35rem" },
    width: { "*": null, base: "100%" },
    maxWidth: { "*": null, base: containerSize.sm },
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
  cardFooter: css({
    display: { "*": null, base: "flex" },
    flexDirection: { "*": null, base: "column" },
    alignItems: { "*": null, base: "center" },
    gap: { "*": null, base: space[2] },
    borderStyle: { "*": null, base: "solid" },
    borderTopWidth: { "*": null, base: "1px" },
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderTopColor: theme.border,
    // Upstream's `[.border-t]:pt-(--card-spacing)`.
    paddingTop: cardCtx.spacing,
  }),
  button: css({
    width: "100%",
  }),
  p2: css({
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
  }),
  div2: css({
    marginInline: "auto",
    maxWidth: containerSize.sm,
    paddingInline: space["0.5"],
    textAlign: "center",
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    textWrap: "balance",
    color: theme.mutedForeground,
  }),
}

const chat = createChat()
  .user("Can you summarize the incident channel?")
  .assistant(
    "The first alert was a delayed export job. It started backing up around 09:42 UTC and triggered the warning once the retry queue crossed the threshold.\n\nNo customer-facing checkout paths were affected, but exports for larger workspaces were running about 12 minutes behind."
  )
  .user("Was checkout affected?")
  .assistant(
    "No checkout errors were reported. Payment authorization, order creation, and confirmation emails stayed inside their normal latency bands.\n\nThe only elevated metric was export queue depth, which maps to analytics downloads instead of checkout."
  )
  .user("What changed in the last deploy?")
  .assistant(
    "Only the export queue worker changed. The deploy moved large CSV jobs onto the shared retry policy, which made each failed attempt hold a worker slot longer than before.\n\nThe app deploy did not include checkout, pricing, or billing API changes."
  )
  .user("Do we need to roll back?")
  .assistant(
    "Not yet. Queue depth is recovering after we reduced retry concurrency, and the oldest pending job is now under five minutes old.\n\nKeep rollback ready if the queue starts climbing again, but the current trend points toward recovery."
  )
  .user("Keep watching for customer-visible issues.")
  .assistant(
    "I will watch the queue and support tags for another 15 minutes. I am tracking export failures, delayed download requests, and any support thread that mentions missing reports.\n\nIf those stay quiet through the next batch window, we can close this as an internal degradation."
  )

const history = chat.get()
const INITIAL_VISIBLE_COUNT = 5

export default function MessageScrollerLoadHistory() {
  const [demoKey, setDemoKey] = React.useState(0)
  const [visibleCount, setVisibleCount] = React.useState(INITIAL_VISIBLE_COUNT)
  const visibleMessages = history.slice(-visibleCount)
  const canLoadHistory = visibleCount < history.length

  return (
    <div sx={page.example}>
      <MessageScrollerProvider>
        <div sx={styles.div}>
          <Card sx={styles.card}>
            <CardHeader sx={styles.cardHeader}>
              <CardTitle>Load History</CardTitle>
              <CardDescription>
                Prepended messages keep your place.
              </CardDescription>
              <CardAction>
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        aria-label="Reset loaded messages"
                        disabled={visibleCount === INITIAL_VISIBLE_COUNT}
                        onClick={() => {
                          setVisibleCount(INITIAL_VISIBLE_COUNT)
                          setDemoKey((key) => key + 1)
                        }}
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
              </CardAction>
            </CardHeader>
            <CardContent sx={styles.cardContent}>
              <MessageScroller key={demoKey}>
                <MessageScrollerViewport>
                  <MessageScrollerContent sx={styles.messageScrollerContent}>
                    {visibleMessages.map((message) => {
                      const isUserMessage = message.role === "user"

                      return (
                        <MessageScrollerItem
                          key={message.id}
                          messageId={message.id}
                        >
                          <Message align={isUserMessage ? "end" : "start"}>
                            <MessageContent>
                              <Bubble
                                variant={isUserMessage ? "muted" : "ghost"}
                              >
                                <BubbleContent sx={styles.bubbleContent}>
                                  {getMessageText(message)
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
                    <MessageScrollerItem scrollAnchor={false}>
                      <Marker variant="separator">
                        <MarkerContent>End of Conversation</MarkerContent>
                      </Marker>
                    </MessageScrollerItem>
                  </MessageScrollerContent>
                </MessageScrollerViewport>
                <MessageScrollerButton />
              </MessageScroller>
            </CardContent>
            <CardFooter sx={styles.cardFooter}>
              <Button
                type="button"
                disabled={!canLoadHistory}
                onClick={() => {
                  setVisibleCount(history.length)
                  toast("History loaded", {
                    description: "Scroll up to see earlier messages.",
                  })
                }}
                sx={styles.button}
                variant="secondary"
              >
                {canLoadHistory ? "Load History" : "History Loaded"}
              </Button>
              <p sx={styles.p2}>
                Restore earlier messages while keeping your place.
              </p>
            </CardFooter>
          </Card>
          <div sx={styles.div2}>
            Click Load History to load the entire conversation
          </div>
        </div>
      </MessageScrollerProvider>
    </div>
  )
}
