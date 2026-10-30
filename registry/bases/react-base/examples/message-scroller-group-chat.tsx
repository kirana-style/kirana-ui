import { css } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import * as React from "react"

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
import { Message, MessageContent, MessageHeader } from "../ui/message"
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
  containerSize,
  fontSize,
  lineHeight,
  space,
  spacing,
} from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { cardCtx } from "../../../core/context"
import { page } from "../../../styles/page.styles"

const styles = {
  relativeFlexFlexColGap4: css({
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: space[4],
  }),
  mxAutoH140WFullMaxWSmGap: css({
    marginInline: "auto",
    height: { "*": null, base: spacing(140) },
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.sm,
    gap: { "*": null, base: space[0] },
  }),
  gap1BorderB: css({
    gap: { "*": null, base: space[1] },
    borderBottomWidth: "1px",
    borderBottomColor: theme.border,
  }),
  minH0Flex1P0: css({
    minHeight: "0",
    flex: "1 1 0%",
    paddingInline: { "*": null, base: "0" },
    paddingBlock: { "*": null, base: "0" },
  }),
  pCardSpacing: css({
    paddingInline: { "*": null, base: cardCtx.spacing },
    paddingBlock: { "*": null, base: cardCtx.spacing },
  }),
  flexFlexColItemsCenterGa: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: { "*": null, base: space[2] },
    borderTopWidth: "1px",
    borderTopColor: theme.border,
  }),
  full: css({ width: "100%" }),
  textXsTextMutedForegroun: css({
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
  }),
  mxAutoMaxWSmPx05TextCent: css({
    marginInline: "auto",
    maxWidth: containerSize.sm,
    paddingInline: spacing(0.5),
    textAlign: "center",
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    textWrap: "balance",
    color: theme.mutedForeground,
  }),
}

const currentUser = "Grace"

const initialItems = [
  {
    id: "group-1",
    type: "message",
    sender: "Grace",
    role: "participant",
    text: "@mary, the astrophage line keeps matching Venus energy output. Can you check my math?",
  },
  {
    id: "group-2",
    type: "message",
    sender: "Mary (Agent)",
    role: "assistant",
    text: "Yes. Confirmed. The curve points to a microorganism harvesting stellar energy and breeding near carbon dioxide. If @rocky agrees, this is the clue we need.",
  },
  {
    id: "group-3",
    type: "message",
    sender: "Grace",
    role: "participant",
    text: "ping @rocky",
    scrollAnchor: true,
  },
] satisfies GroupChatItem[]

const rockyMarker = {
  id: "group-4",
  type: "event",
  text: "Rocky has joined the chat",
  scrollAnchor: true,
} satisfies GroupChatItem

const rockyMessage = {
  id: "group-5",
  type: "message",
  sender: "Rocky",
  role: "participant",
  text: "Amaze. Astrophage eats light, makes heat, goes to carbon dioxide. Rocky has fuel model. Grace is smart.",
} satisfies GroupChatItem

type GroupChatItem =
  | {
      id: string
      type: "event"
      text: string
      scrollAnchor?: boolean
    }
  | {
      id: string
      type: "message"
      sender: string
      role: "assistant" | "participant"
      text: string
      scrollAnchor?: boolean
    }

export default function MessageScrollerGroupChat() {
  const [demoKey, setDemoKey] = React.useState(0)
  const [rockyTurn, setRockyTurn] = React.useState<
    "idle" | "marker" | "message"
  >("idle")
  const items =
    rockyTurn === "message"
      ? [...initialItems, rockyMarker, rockyMessage]
      : rockyTurn === "marker"
        ? [...initialItems, rockyMarker]
        : initialItems
  const buttonLabel =
    rockyTurn === "idle" ? "Add Rocky" : "Send Message as Rocky"
  const isComplete = rockyTurn === "message"

  return (
    <div sx={page.example}>
      <MessageScrollerProvider>
        <div sx={styles.relativeFlexFlexColGap4}>
          <Card sx={styles.mxAutoH140WFullMaxWSmGap}>
            <CardHeader sx={styles.gap1BorderB}>
              <CardTitle>Group Chat</CardTitle>
              <CardDescription>
                A group chat with several participants and an assistant. The
                Marker is marked as a turn.
              </CardDescription>
              <CardAction>
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        aria-label="Reset conversation"
                        disabled={rockyTurn === "idle"}
                        onClick={() => {
                          setRockyTurn("idle")
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
            <CardContent sx={styles.minH0Flex1P0}>
              <MessageScrollerProvider>
                <MessageScroller key={demoKey}>
                  <MessageScrollerViewport>
                    <MessageScrollerContent sx={styles.pCardSpacing}>
                      {items.map((item) =>
                        item.type === "message" ? (
                          <GroupChatMessage key={item.id} item={item} />
                        ) : (
                          <GroupChatMarker
                            key={item.id}
                            item={item}
                            scrollAnchor={item.scrollAnchor}
                          />
                        )
                      )}
                    </MessageScrollerContent>
                  </MessageScrollerViewport>
                  <MessageScrollerButton />
                </MessageScroller>
              </MessageScrollerProvider>
            </CardContent>
            <CardFooter sx={styles.flexFlexColItemsCenterGa}>
              <Button
                type="button"
                disabled={isComplete}
                onClick={() =>
                  setRockyTurn((turn) =>
                    turn === "idle" ? "marker" : "message"
                  )
                }
                sx={styles.full}
                variant="secondary"
              >
                {buttonLabel}
              </Button>
              <p sx={styles.textXsTextMutedForegroun}>
                {rockyTurn === "idle"
                  ? "This will create a marker and make it the anchor"
                  : "Now send Rocky's reply into the conversation"}
              </p>
            </CardFooter>
          </Card>
          <div sx={styles.mxAutoMaxWSmPx05TextCent}>
            When a user joins, a marker is created. scrollAnchor on the marker
            marks it as the next turn
          </div>
        </div>
      </MessageScrollerProvider>
    </div>
  )
}

function GroupChatMessage({
  item,
}: {
  item: Extract<GroupChatItem, { type: "message" }>
}) {
  const isCurrentUser = item.sender === currentUser
  const variant = isCurrentUser
    ? "muted"
    : item.role === "assistant"
      ? "ghost"
      : "tinted"

  return (
    <MessageScrollerItem messageId={item.id} scrollAnchor={item.scrollAnchor}>
      <Message align={isCurrentUser ? "end" : "start"}>
        <MessageContent>
          {!isCurrentUser && <MessageHeader>{item.sender}</MessageHeader>}
          <Bubble variant={variant}>
            <BubbleContent>{item.text}</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
    </MessageScrollerItem>
  )
}

function GroupChatMarker({
  item,
  scrollAnchor = false,
}: {
  item: Extract<GroupChatItem, { type: "event" }>
  scrollAnchor?: boolean
}) {
  return (
    <MessageScrollerItem scrollAnchor={scrollAnchor}>
      <Marker variant="separator">
        <MarkerContent>{item.text}</MarkerContent>
      </Marker>
    </MessageScrollerItem>
  )
}
