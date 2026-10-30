import { createChat, getMessageText } from "../../../lib/ai"
import { Bubble, BubbleContent } from "../ui/bubble"
import { Button } from "../ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
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
  commandMenuDropdownMenu: css({
    width: { "*": null, base: space[64] },
  }),
  commandMenuSpan: css({
    WebkitLineClamp: "1",
    WebkitBoxOrient: "vertical",
    display: "-webkit-box",
    overflow: "hidden",
    minWidth: space["0"],
  }),
}

const chat = createChat()
  .user(
    "We're seeing activation dip after workspace creation. Can you help me find the likely step?",
    { id: "command-activation" }
  )
  .assistant(
    "The sharpest drop is between creating the workspace and inviting the first teammate.\n\nWorkspace creation is still healthy, but the invite step is where users pause. That suggests the product is asking for collaboration before the user has enough confidence in the workspace."
  )
  .user("What should I compare before we change the onboarding flow?", {
    id: "command-compare",
  })
  .assistant(
    "Compare three cohorts:\n\n1. Users who choose a template before inviting teammates.\n2. Users who start from a blank workspace.\n3. Users who skip invites and return within 24 hours.\n\nIf template users invite faster, the fix is probably better first-run guidance rather than a louder invite prompt."
  )
  .user("Can you turn that into an experiment?", {
    id: "command-experiment",
  })
  .assistant(
    "Yes. Create a variant that shows a short checklist after workspace creation:\n\n- Pick a template.\n- Add one project detail.\n- Invite a teammate when the workspace has context.\n\nMeasure first invite completion, 24-hour return rate, and whether teams create a second project."
  )
  .user("What's the risk if we delay the invite prompt?", {
    id: "command-risk",
  })
  .assistant(
    "The main risk is reducing team creation for accounts that already know who they want to invite.\n\nTo protect that path, keep the invite action visible in the header and only change the primary empty-state guidance. That gives confident teams a direct route without forcing uncertain users through the invite step too early."
  )

const messages = chat.get()
const userMessages = messages.filter((message) => message.role === "user")

export default function MessageScrollerCommands() {
  return (
    <div sx={page.example}>
      <MessageScrollerProvider defaultScrollPosition="end">
        <div sx={styles.div}>
          <Card sx={styles.card}>
            <CardHeader sx={styles.cardHeader}>
              <CardTitle>Commands</CardTitle>
              <CardDescription>
                Drive the transcript from outside.
              </CardDescription>
              <CardAction>
                <CommandMenu />
              </CardAction>
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
          <div sx={styles.div2}>
            Use the controls to jump to any message in the conversation.
          </div>
        </div>
      </MessageScrollerProvider>
    </div>
  )
}

function CommandMenu() {
  const { scrollToMessage } = useMessageScroller()

  return (
    <DropdownMenuTrigger>
      <Button type="button" variant="secondary">
        Jump to...
      </Button>
      <DropdownMenu placement="bottom end" sx={styles.commandMenuDropdownMenu}>
        <DropdownMenuLabel>Conversations</DropdownMenuLabel>
        {userMessages.map((message) => (
          <DropdownMenuItem
            key={message.id}
            onAction={() =>
              scrollToMessage(message.id, {
                align: "start",
                behavior: "smooth",
              })
            }
          >
            <span sx={styles.commandMenuSpan}>
              {getTrimmedMessageText(message)}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenu>
    </DropdownMenuTrigger>
  )
}

function getTrimmedMessageText(message: (typeof userMessages)[number]) {
  const text = getMessageText(message)

  return text.length > 42 ? `${text.slice(0, 39)}...` : text
}
