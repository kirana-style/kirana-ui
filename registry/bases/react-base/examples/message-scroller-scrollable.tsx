import { MessageAnimated } from "../components/message-animated"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerProvider,
  MessageScrollerViewport,
  useMessageScrollerScrollable,
} from "../ui/message-scroller"
import { css } from "@kirana-style/core"
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
    marginInline: "auto",
    display: "flex",
    width: "100%",
    maxWidth: containerSize.sm,
    flexDirection: "column",
    gap: space[4],
  }),
  card: css({
    height: { "*": null, base: "35rem" },
    width: { "*": null, base: "100%" },
    gap: { "*": null, base: space["0"] },
    overflow: { "*": null, base: "hidden" },
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
    gap: { "*": null, base: space[4] },
    padding: { "*": null, base: cardCtx.spacing },
  }),
  div2: css({
    paddingInline: space["0.5"],
    textAlign: "center",
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
  }),
  scrollStateFooterCardFooter: css({
    justifyContent: { "*": null, base: "center" },
    borderStyle: { "*": null, base: "solid" },
    borderTopWidth: { "*": null, base: "1px" },
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderTopColor: theme.border,
    textAlign: { "*": null, base: "center" },
    fontSize: { "*": null, base: fontSize.sm },
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
    // Upstream's `[.border-t]:pt-(--card-spacing)`.
    paddingTop: cardCtx.spacing,
  }),
}

const messages = Array.from({ length: 12 }, (_, index) => ({
  id: `scrollable-${index + 1}`,
  role: index % 2 === 0 ? "user" : "assistant",
  text:
    index % 2 === 0
      ? `Review scroll checkpoint ${index + 1}.`
      : `Checkpoint ${index + 1} is synced. The scrollable hook updates as the viewport moves.\n\nWhen the reader is at the first message, the footer should only point them down. Once they move into the middle of the transcript, it should explain that both directions are available.\n\nAt the latest message, the footer should switch again and only point them back up.`,
})) satisfies Array<{
  id: string
  role: "user" | "assistant"
  text: string
}>

export default function MessageScrollerScrollable() {
  return (
    <div sx={page.example}>
      <div sx={styles.div}>
        <Card sx={styles.card}>
          <CardHeader sx={styles.cardHeader}>
            <CardTitle>Scroll Status</CardTitle>
            <CardDescription>
              Where the reader can go scroll to based on current scroll
              position.
            </CardDescription>
          </CardHeader>
          <MessageScrollerProvider defaultScrollPosition="start">
            <CardContent sx={styles.cardContent}>
              <MessageScroller>
                <MessageScrollerViewport>
                  <MessageScrollerContent sx={styles.messageScrollerContent}>
                    <Transcript />
                  </MessageScrollerContent>
                </MessageScrollerViewport>
                <MessageScrollerButton />
              </MessageScroller>
            </CardContent>
            <ScrollStateFooter />
          </MessageScrollerProvider>
        </Card>
        <div sx={styles.div2}>
          Scroll the transcript to see the footer update.
        </div>
      </div>
    </div>
  )
}

function Transcript() {
  return messages.map((message) => (
    <MessageAnimated
      key={message.id}
      message={message}
      scrollAnchor={message.role === "user"}
      userVariant="muted"
      assistantVariant="ghost"
    />
  ))
}

function ScrollStateFooter() {
  const { start, end } = useMessageScrollerScrollable()

  const status = getScrollStatus({ start, end })

  return (
    <CardFooter sx={styles.scrollStateFooterCardFooter}>{status}</CardFooter>
  )
}

function getScrollStatus({ start, end }: { start: boolean; end: boolean }) {
  if (start && end) {
    return "You can scroll both ways."
  }

  if (end) {
    return "You are at the top. You can only scroll down."
  }

  if (start) {
    return "You are at the bottom. You can only scroll up."
  }

  return "All messages fit in the viewport."
}
