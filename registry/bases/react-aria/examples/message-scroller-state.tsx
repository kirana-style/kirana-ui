import { css } from "@kirana-style/core"

import { Bubble, BubbleContent } from "../ui/bubble"
import {
  Card,
  CardContent,
  CardDescription,
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
  useMessageScrollerScrollable,
} from "../ui/message-scroller"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
  spacing,
} from "../../../core/scales"
import { radius, theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"

const styles = {
  mxAutoH112WFullMaxWMdGap: css({
    marginInline: "auto",
    height: { "*": null, base: spacing(112) },
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.md,
    gap: { "*": null, base: space[0] },
  }),
  borderB: css({ borderBottomWidth: "1px", borderBottomColor: theme.border }),
  minH0Flex1P0: css({
    minHeight: "0",
    flex: "1 1 0%",
    paddingInline: { "*": null, base: "0" },
    paddingBlock: { "*": null, base: "0" },
  }),
  gap4P4Pt12: css({
    gap: { "*": null, base: space[4] },
    padding: space[4],
    paddingTop: { "*": null, base: space[12] },
  }),
  pointerEventsNoneAbsolut: css({
    pointerEvents: "none",
    position: "absolute",
    left: space[3],
    right: space[3],
    top: space[3],
    zIndex: 10,
    display: "flex",
    flexWrap: "wrap",
    gap: spacing(1.5),
  }),
  roundedFullBorderBgBackg: css({
    borderRadius: radius.full,
    borderWidth: "1px",
    borderColor: { base: theme.border, '[data-on="true"]': "transparent" },
    backgroundColor: {
      base: theme.background,
      '[data-on="true"]': theme.primary,
    },
    paddingInline: space[2],
    paddingBlock: spacing(0.5),
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: {
      base: theme.mutedForeground,
      '[data-on="true"]': theme.primaryForeground,
    },
  }),
}

const messages = Array.from({ length: 12 }, (_, index) => ({
  id: `state-${index + 1}`,
  role: index % 2 === 0 ? "user" : "assistant",
  text:
    index % 2 === 0
      ? `Check section ${index + 1} of the transcript.`
      : `Section ${index + 1} is ready. Scroll state updates without rerendering the rows.`,
})) satisfies Array<{
  id: string
  role: "user" | "assistant"
  text: string
}>

export default function MessageScrollerState() {
  return (
    <div sx={page.example}>
      <Card sx={styles.mxAutoH112WFullMaxWMdGap}>
        <CardHeader sx={styles.borderB}>
          <CardTitle>Scroll State</CardTitle>
          <CardDescription>
            Read scroll state in JavaScript with the state hook.
          </CardDescription>
        </CardHeader>
        <CardContent sx={styles.minH0Flex1P0}>
          <MessageScrollerProvider defaultScrollPosition="start">
            <MessageScroller>
              <StatusBar />
              <MessageScrollerViewport>
                <MessageScrollerContent sx={styles.gap4P4Pt12}>
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
                          <Bubble
                            variant={
                              message.role === "user" ? "default" : "muted"
                            }
                          >
                            <BubbleContent>{message.text}</BubbleContent>
                          </Bubble>
                        </MessageContent>
                      </Message>
                    </MessageScrollerItem>
                  ))}
                </MessageScrollerContent>
              </MessageScrollerViewport>
              <MessageScrollerButton />
            </MessageScroller>
          </MessageScrollerProvider>
        </CardContent>
      </Card>
    </div>
  )
}

function StatusBar() {
  const { start, end } = useMessageScrollerScrollable()
  const states = [
    { label: "At top", on: !start },
    { label: "At bottom", on: !end },
    { label: "Older above", on: start },
    { label: "Newer below", on: end },
  ]

  return (
    <div sx={styles.pointerEventsNoneAbsolut}>
      {states.map((state) => (
        <span
          key={state.label}
          data-on={state.on}
          sx={styles.roundedFullBorderBgBackg}
        >
          {state.label}
        </span>
      ))}
    </div>
  )
}
