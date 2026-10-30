import { IconPlaceholder } from "../../../icons/icon-placeholder"
import * as React from "react"

import { MessageAnimated } from "../components/message-animated"
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
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "../ui/message-scroller"
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group"
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
    borderBottomWidth: { "*": null, base: "1px" },
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderBottomColor: theme.border,
    borderStyle: { "*": null, base: "solid" },
    // Upstream's `[.border-b]:pb-(--card-spacing)`.
    paddingBottom: cardCtx.spacing,
  }),
  cardContent: css({
    minHeight: { "*": null, base: space["0"] },
    flex: "1 1 0%",
    overflow: { "*": null, base: "hidden" },
    padding: { "*": null, base: space["0"] },
  }),
  empty: css({
    height: { "*": null, base: "100%" },
  }),
  messageScrollerContent: css({
    padding: { "*": null, base: cardCtx.spacing },
  }),
  button: css({
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
  div2: css({
    marginInline: "auto",
    maxWidth: containerSize.xs,
    paddingInline: space["0.5"],
    textAlign: "center",
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
  }),
}

type AnchorRole = "user" | "assistant"

type ChatMessage = {
  id: string
  role: AnchorRole
  text: string
}

const scriptedMessages: ChatMessage[] = [
  {
    id: "anchor-1-user",
    role: "user",
    text: "Can you show me how anchoring behaves when a new prompt starts the turn?",
  },
  {
    id: "anchor-1-assistant",
    role: "assistant",
    text: "Append the user prompt first, then append the assistant response. With User selected, the prompt settles near the top and the assistant response fills in below it.",
  },
  {
    id: "anchor-2-user",
    role: "user",
    text: "What changes when assistant messages are the anchor?",
  },
  {
    id: "anchor-2-assistant",
    role: "assistant",
    text: "Now each assistant response is the item `MessageScroller` keeps in view. This is useful when the reply is the moment you want readers to land on after each turn.",
  },
  {
    id: "anchor-3-user",
    role: "user",
    text: "Can I switch roles and keep adding turns?",
  },
  {
    id: "anchor-3-assistant",
    role: "assistant",
    text: "Yes. The next appended message with the selected role becomes the anchor, so you can compare user and assistant anchoring without resetting the demo.",
  },
]

export default function MessageScrollerAnchoring() {
  const [anchorRole, setAnchorRole] = React.useState<AnchorRole>("user")
  const [messages, setMessages] = React.useState<ChatMessage[]>([])
  const [messageIndex, setMessageIndex] = React.useState(0)
  const nextMessage = scriptedMessages[messageIndex]

  return (
    <div sx={page.example}>
      <div sx={styles.div}>
        <Card sx={styles.card}>
          <CardHeader sx={styles.cardHeader}>
            <CardTitle>Anchoring Turns</CardTitle>
            <CardDescription>
              Choose which role settles near the top edge.
            </CardDescription>
            <CardAction>
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label="Reset anchored turns"
                isDisabled={messages.length === 0}
                onClick={() => {
                  setMessages([])
                  setMessageIndex(0)
                }}
              >
                <IconPlaceholder
                  lucide="RotateCwIcon"
                  tabler="IconRotateClockwise2"
                  hugeicons="Rotate01Icon"
                  phosphor="ArrowClockwiseIcon"
                  remixicon="RiRefreshLine"
                />
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent sx={styles.cardContent}>
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
                  <EmptyTitle>No anchored messages yet</EmptyTitle>
                  <EmptyDescription>
                    Send the first message to see the selected role anchor.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            ) : (
              <MessageScrollerProvider>
                <MessageScroller>
                  <MessageScrollerViewport>
                    <MessageScrollerContent sx={styles.messageScrollerContent}>
                      {messages.map((message) => (
                        <MessageAnimated
                          key={message.id}
                          message={message}
                          scrollAnchor={message.role === anchorRole}
                          userVariant="muted"
                          assistantVariant="ghost"
                        />
                      ))}
                    </MessageScrollerContent>
                  </MessageScrollerViewport>
                  <MessageScrollerButton />
                </MessageScroller>
              </MessageScrollerProvider>
            )}
          </CardContent>
          <CardFooter>
            <ToggleGroup
              aria-label="Select scroll anchor role"
              selectedKeys={[anchorRole]}
              onSelectionChange={(value) => {
                const nextValue = [...value][0]

                if (nextValue === "user" || nextValue === "assistant") {
                  setAnchorRole(nextValue)
                  setMessages([])
                  setMessageIndex(0)
                }
              }}
            >
              <ToggleGroupItem id="user" aria-label="Anchor user messages">
                User
              </ToggleGroupItem>
              <ToggleGroupItem
                id="assistant"
                aria-label="Anchor assistant messages"
              >
                Assistant
              </ToggleGroupItem>
            </ToggleGroup>
            <Button
              type="button"
              size="icon"
              sx={styles.button}
              isDisabled={!nextMessage}
              onClick={() => {
                if (!nextMessage) {
                  return
                }

                setMessages((current) => [...current, nextMessage])
                setMessageIndex((index) => index + 1)
              }}
            >
              <IconPlaceholder
                lucide="ArrowUpIcon"
                tabler="IconArrowUp"
                hugeicons="ArrowUp02Icon"
                phosphor="ArrowUpIcon"
                remixicon="RiArrowUpLine"
              />
              <span sx={styles.span}>Send Message</span>
            </Button>
          </CardFooter>
        </Card>
        <div sx={styles.div2}>
          Toggle the anchor role, then send messages to compare where turns
          settle.
        </div>
      </div>
    </div>
  )
}
