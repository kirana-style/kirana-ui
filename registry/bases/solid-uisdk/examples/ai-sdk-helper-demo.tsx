import { MessageRow } from "../components/ai-sdk-helper-demo/message-row"
import { For, Show, createEffect, createMemo, createSignal } from "solid-js"
import { Chat } from "../../../lib/solid2/chat"
import { css } from "@kirana-style/core"
import { createChat, getMessageText } from "../../../lib/ai"
import { IconPlaceholder } from "../ui/icon-placeholder"
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "../ui/input-group"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { cardCtx } from "../../../core/context"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
  spacing,
} from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"

export default function AiSdkHelperDemo() {
  const styles = {
    root: css({
      position: "relative",
      display: "flex",
      width: "100%",
      flexDirection: "column",
      gap: space[4],
    }),
    card: css({
      marginInline: { "*": null, base: "auto" },
      height: { "*": null, base: spacing(140) },
      width: { "*": null, base: "100%" },
      maxWidth: { "*": null, base: containerSize.sm },
      gap: { "*": null, base: 0 },
    }),
    // Upstream's `border-b`, with the padding its card gives a bordered header (`cardCtx.spacing`).
    cardHeader: css({
      gap: { "*": null, base: space[1] },
      borderBottomWidth: { "*": null, base: "1px" },
      borderBottomColor: { "*": null, base: theme.border },
      paddingBottom: { "*": null, base: cardCtx.spacing },
    }),
    cardContent: css({
      flex: { "*": null, base: "1 1 0%" },
      overflow: { "*": null, base: "hidden" },
      padding: { "*": null, base: 0 },
    }),
    empty: css({
      height: { "*": null, base: "100%" },
    }),
    // Upstream's MessageScroller, which Solid does not have: the transcript scrolls, and follows
    // the reply while the reader is at its end.
    viewport: css({
      height: "100%",
      overflowY: "auto",
      overscrollBehavior: "contain",
    }),
    transcript: css({
      display: "flex",
      flexDirection: "column",
      gap: space[4],
      padding: cardCtx.spacing,
    }),
    cardFooter: css({
      flexDirection: { "*": null, base: "column" },
      gap: { "*": null, base: space[2] },
    }),
    form: css({
      width: "100%",
    }),
    textarea: css({
      height: { "*": null, base: space[14] },
      minHeight: { "*": null, base: space[14] },
      overflow: { "*": null, base: "hidden" },
      paddingInline: { "*": null, base: space[3] },
      paddingBlock: { "*": null, base: space["2.5"] },
      opacity: { "*": null, base: 0.6, '[data-status="ready"]': 1 },
    }),
    addon: css({
      paddingTop: { "*": null, base: space[1] },
    }),
    menu: css({
      width: { "*": null, base: space[44] },
    }),
    send: css({
      marginLeft: { "*": null, base: "auto" },
    }),
    note: css({
      paddingInline: space["0.5"],
      textAlign: "center",
      fontSize: fontSize.xs,
      lineHeight: lineHeight.xs,
      color: theme.mutedForeground,
    }),
  }

  const chat = createChat()
    .user(
      "I'm building a chat for our app and the scroll behavior is driving me nuts. Every time the AI streams a reply, the whole thread jumps around."
    )
    .sleep(1000)
    .assistant(({ writer }) => {
      writer.reasoning(
        "They are describing a streaming transcript that keeps taking control of the viewport. I should explain when auto-scroll follows and when it stops."
      )
      writer.sleep(1000)
      writer.text(
        "That's the classic streaming scroll problem. Wrap your message list in `MessageScroller` and turn on `autoScroll` — the viewport pins to the bottom as tokens arrive, so users always see the latest text land in place.\n\nThe important part: it only auto-scrolls while the reader is already at the bottom. The moment they scroll up to read something earlier, auto-scroll backs off and their position is preserved. You get smooth streaming without fighting the user's intent."
      )
    })
    .user(
      "Okay, but when someone sends a new message the view still feels jarring — like the whole conversation reloads from the top."
    )
    .sleep(1000)
    .assistant(
      "MessageScrollerItem fixes that with turn anchoring. Set `scrollAnchor` on the turn that should settle near the top instead of blindly snapping to the document bottom.\n\nIt also leaves a small peek of the previous exchange visible above the anchor, so context isn't lost. The reply starts in view without that disorienting jump you get from a plain overflow container."
    )
    .user(
      "And if they've scrolled up to re-read an older answer? I don't want to yank them back down."
    )
    .sleep(1000)
    .assistant(
      "You won't. Auto-scroll only runs when the viewport is already pinned to the bottom, so scrolling up is a deliberate opt-out — their place in the thread stays put even as new tokens keep arriving below.\n\nWhen there is content they haven't seen yet, `MessageScrollerButton` appears at the bottom of the viewport. One tap jumps them back to the newest message and re-engages auto-scroll. Same pattern as Slack or iMessage: quiet when you're caught up, helpful when you're not."
    )
    .user("Last one — does this work with assistive tech?")
    .sleep(1000)
    .assistant(
      '`MessageScrollerContent` sets `role="log"` and `aria-relevant="additions"` by default, so screen readers announce new messages as they stream in.\n\nThe scroll button is a real `<button>` with an sr-only label, and it\'s removed from the tab order when you\'re already at the bottom — no ghost focus stops.'
    )

  const initialMessages = chat.get(0)
  const transport = chat.transport({ delayMs: 20 })

  const conversation = new Chat({ messages: initialMessages, transport })
  const messages = () => conversation.messages
  const status = () => conversation.status
  const nextMessage = createMemo(() => chat.next(messages()))
  const nextMessageText = createMemo(() => {
    const next = nextMessage()
    return next ? getMessageText(next) : null
  })
  const busy = createMemo(
    () => status() === "submitted" || status() === "streaming"
  )

  // Follows the transcript as it grows while the reader is at its end.
  const [viewport, setViewport] = createSignal<HTMLDivElement>()
  let pinned = true
  // The transcript's text, which grows as a reply streams into the store.
  const transcript = () =>
    messages()
      .flatMap((message) => message.parts)
      .map((part) =>
        part.type === "text" || part.type === "reasoning" ? part.text : ""
      )
      .join("")
  createEffect(
    () => [transcript(), viewport()] as const,
    ([, element]) => {
      if (element && pinned) element.scrollTop = element.scrollHeight
    }
  )

  return (
    <div sx={page.example}>
      <div sx={styles.root}>
        <Card sx={styles.card}>
          <CardHeader sx={styles.cardHeader}>
            <CardTitle>New Chat</CardTitle>
            <CardDescription>How can I help you today?</CardDescription>
            <CardAction>
              <Tooltip>
                <TooltipTrigger
                  asChild={(props) => (
                    <Button
                      {...props()}
                      variant="outline"
                      size="icon"
                      aria-label="Reset conversation"
                      onClick={() => (conversation.messages = initialMessages)}
                      disabled={busy()}
                    >
                      <IconPlaceholder
                        lucide="RotateCwIcon"
                        tabler="IconRotateClockwise2"
                        hugeicons="Rotate01Icon"
                        phosphor="ArrowClockwiseIcon"
                        remixicon="RiRefreshLine"
                      />
                    </Button>
                  )}
                />
                <TooltipContent>
                  <p>Reset</p>
                </TooltipContent>
              </Tooltip>
            </CardAction>
          </CardHeader>
          <CardContent sx={styles.cardContent}>
            <Show
              when={messages().length > 0}
              fallback={
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
                    <EmptyTitle>Morning, shadcn!</EmptyTitle>
                    <EmptyDescription>
                      What are we working on today? Press send to start a new
                      conversation
                    </EmptyDescription>
                  </EmptyHeader>
                </Empty>
              }
            >
              <div
                ref={setViewport}
                sx={styles.viewport}
                onScroll={(event) => {
                  const target = event.currentTarget
                  pinned =
                    target.scrollHeight -
                      target.scrollTop -
                      target.clientHeight <
                    8
                }}
              >
                <div
                  role="log"
                  aria-relevant="additions"
                  aria-busy={busy() ? "true" : "false"}
                  sx={styles.transcript}
                >
                  <For each={messages()}>
                    {(message) => <MessageRow message={message} />}
                  </For>
                </div>
              </div>
            </Show>
          </CardContent>
          <CardFooter sx={styles.cardFooter}>
            <form
              sx={styles.form}
              onSubmit={(event) => {
                event.preventDefault()
                const next = nextMessage()
                if (!next || busy()) {
                  return
                }
                pinned = true
                void conversation.sendMessage(next)
              }}
            >
              <InputGroup>
                <InputGroupTextarea
                  aria-label="Next predefined message"
                  data-status={status()}
                  placeholder="No messages queued. Reset the conversation."
                  value={nextMessageText() ?? ""}
                  readOnly
                  sx={styles.textarea}
                />
                <InputGroupAddon align="block-end" sx={styles.addon}>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      asChild={(props) => (
                        <InputGroupButton
                          {...props()}
                          aria-label="Add files"
                          type="button"
                          size="icon-sm"
                          variant="outline"
                        >
                          <IconPlaceholder
                            lucide="PlusIcon"
                            tabler="IconPlus"
                            hugeicons="PlusSignIcon"
                            phosphor="PlusIcon"
                            remixicon="RiAddLine"
                          />
                        </InputGroupButton>
                      )}
                    />
                    <DropdownMenuContent
                      align="start"
                      side="top"
                      sx={styles.menu}
                    >
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          <IconPlaceholder
                            lucide="PaperclipIcon"
                            tabler="IconPaperclip"
                            hugeicons="AttachmentIcon"
                            phosphor="PaperclipIcon"
                            remixicon="RiAttachmentLine"
                          />
                          Add Photos & Files
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          <IconPlaceholder
                            lucide="ImageIcon"
                            tabler="IconPhoto"
                            hugeicons="ImageIcon"
                            phosphor="ImageIcon"
                            remixicon="RiImageLine"
                          />
                          Create Image
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <IconPlaceholder
                            lucide="TelescopeIcon"
                            tabler="IconTelescope"
                            hugeicons="Telescope01Icon"
                            phosphor="BinocularsIcon"
                            remixicon="RiSearchEyeLine"
                          />
                          Deep Research
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <IconPlaceholder
                            lucide="GlobeIcon"
                            tabler="IconGlobe"
                            hugeicons="Globe02Icon"
                            phosphor="GlobeIcon"
                            remixicon="RiGlobeLine"
                          />
                          Web Search
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <InputGroupButton
                    type="submit"
                    variant="default"
                    size="icon-sm"
                    disabled={!nextMessage() || busy()}
                    sx={styles.send}
                  >
                    <IconPlaceholder
                      lucide="ArrowUpIcon"
                      tabler="IconArrowUp"
                      hugeicons="ArrowUp02Icon"
                      phosphor="ArrowUpIcon"
                      remixicon="RiArrowUpLine"
                    />
                    <span sx={visuallyHidden}>Send</span>
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </form>
          </CardFooter>
        </Card>
        <div sx={styles.note}>
          Demo is read only. Press send to send messages.
        </div>
      </div>
    </div>
  )
}
