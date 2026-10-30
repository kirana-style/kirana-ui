import { css, select } from "@kirana-style/core"

import * as React from "react"

import { Bubble, BubbleContent } from "../ui/bubble"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Message, MessageContent } from "../ui/message"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
  useMessageScroller,
} from "../ui/message-scroller"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"
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
  flex1OverflowHiddenP0: css({
    flex: 1,
    overflow: "hidden",
    padding: { "*": null, base: "0" },
  }),
  flexItemsCenterJustifyCe: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: "1px",
    borderTopColor: theme.border,
  }),
  full: css({ width: "100%" }),
  mxAutoMaxWSmPx05TextCent: css({
    marginInline: "auto",
    maxWidth: containerSize.sm,
    paddingInline: { "*": null, base: spacing(0.5) },
    textAlign: "center",
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
  }),
  pCardSpacing: css({
    paddingInline: { "*": null, base: cardCtx.spacing },
    paddingBlock: { "*": null, base: cardCtx.spacing },
  }),
  spaceY2: css({
    [select.child(":not(:last-child)")]: { marginBottom: space[2] },
  }),
  whitespacePreWrap: css({ whiteSpace: "pre-wrap" }),
}

const messages = [
  {
    id: "open-1",
    role: "user",
    text: "This is the first message the user sent in the conversation.",
  },
  {
    id: "open-2",
    role: "assistant",
    text: "Workspace creation rose 8%, but first invite completion only rose 2%.",
  },
  {
    id: "open-3",
    role: "user",
    text: "This is the last message the user sent in the conversation.",
  },
  {
    id: "open-4",
    role: "assistant",
    text: "Start with the invite step. Teams are creating workspaces but waiting to add collaborators.\n\nRecommended follow-up:\n\n1. Compare invite drop-off by account size.\n2. Check whether users who skip invites still return within 24 hours.\n3. Review the empty-state copy on the first project screen.\n4. Segment activation by template, since template users may not need invites right away.\n\nIf that pattern holds, the next experiment should make collaboration useful earlier instead of prompting for invites harder.",
  },
] satisfies Array<{
  id: string
  role: "user" | "assistant"
  text: string
}>

const positions = [
  { value: "start", label: "start" },
  { value: "end", label: "end" },
  { value: "last-anchor", label: "last-anchor" },
] satisfies Array<{
  value: "start" | "end" | "last-anchor"
  label: string
}>

export default function MessageScrollerOpeningPosition() {
  const [positionKey, setPositionKey] = React.useState(0)
  const [position, setPosition] = React.useState<
    "start" | "end" | "last-anchor"
  >("last-anchor")

  return (
    <div sx={page.example}>
      <div sx={styles.relativeFlexFlexColGap4}>
        <Card sx={styles.mxAutoH140WFullMaxWSmGap}>
          <CardHeader sx={styles.gap1BorderB}>
            <CardTitle>Opening Position</CardTitle>
            <CardDescription>
              Choose where a saved transcript opens.
            </CardDescription>
          </CardHeader>
          <CardContent sx={styles.flex1OverflowHiddenP0}>
            <MessageScrollerProvider>
              <OpeningPositionScroller
                position={position}
                positionKey={positionKey}
              />
            </MessageScrollerProvider>
          </CardContent>
          <CardFooter sx={styles.flexItemsCenterJustifyCe}>
            <Tabs
              value={position}
              onValueChange={(value) => {
                if (
                  value === "start" ||
                  value === "end" ||
                  value === "last-anchor"
                ) {
                  setPosition(value)
                  setPositionKey((key) => key + 1)
                }
              }}
              sx={styles.full}
            >
              <TabsList sx={styles.full}>
                {positions.map((option) => (
                  <TabsTrigger key={option.value} value={option.value}>
                    {option.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </CardFooter>
        </Card>
        <div sx={styles.mxAutoMaxWSmPx05TextCent}>
          Toggle the defaultScrollPosition to see where the transcript starts
          when you open the thread
        </div>
      </div>
    </div>
  )
}

function OpeningPositionScroller({
  position,
  positionKey,
}: {
  position: "start" | "end" | "last-anchor"
  positionKey: number
}) {
  const { scrollToEnd, scrollToMessage, scrollToStart } = useMessageScroller()

  React.useLayoutEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (position === "start") {
        scrollToStart({ behavior: "auto" })
        return
      }

      if (position === "end") {
        scrollToEnd({ behavior: "auto" })
        return
      }

      scrollToMessage("open-3", {
        align: "start",
        behavior: "auto",
        scrollMargin: 64,
      })
    })

    return () => {
      cancelAnimationFrame(frame)
    }
  }, [position, positionKey, scrollToEnd, scrollToMessage, scrollToStart])

  return (
    <MessageScroller>
      <MessageScrollerViewport>
        <MessageScrollerContent sx={styles.pCardSpacing}>
          {messages.map((message) => {
            const isUserMessage = message.role === "user"

            return (
              <MessageScrollerItem
                key={message.id}
                messageId={message.id}
                scrollAnchor={isUserMessage}
              >
                <Message align={isUserMessage ? "end" : "start"}>
                  <MessageContent>
                    <Bubble variant={isUserMessage ? "muted" : "ghost"}>
                      <BubbleContent sx={styles.spaceY2}>
                        {message.text
                          .split(/\n\s*\n/)
                          .map((paragraph) => paragraph.trim())
                          .filter(Boolean)
                          .map((paragraph, index) => (
                            <p key={index} sx={styles.whitespacePreWrap}>
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
  )
}
