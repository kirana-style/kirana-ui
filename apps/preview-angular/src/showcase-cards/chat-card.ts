import type { ElementRef } from "@angular/core"
import {
  Component,
  afterRenderEffect,
  computed,
  effect,
  untracked,
  viewChild,
} from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { IconPlaceholder } from "@workspace/registry/icons/angular"
import {
  Bubble,
  BubbleContent,
} from "@workspace/registry/bases/angular-ng/ui/bubble"
import { Button } from "@workspace/registry/bases/angular-ng/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/registry/bases/angular-ng/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/registry/bases/angular-ng/ui/dropdown-menu"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@workspace/registry/bases/angular-ng/ui/empty"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "@workspace/registry/bases/angular-ng/ui/input-group"
import {
  Message,
  MessageContent,
} from "@workspace/registry/bases/angular-ng/ui/message"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/registry/bases/angular-ng/ui/tooltip"

/**
 * The showcase's chat, React's Message Scroller demo (`message-scroller-demo.tsx`) on Angular: the
 * same card, its empty state at rest and its scripted conversation sent a message at a time
 * through the registry's `Chat` (`lib/angular/chat.ts`). Message Scroller has no Angular version (it is `@shadcn/react`'s), so the
 * messages sit in a plain list that keeps to its bottom as they stream, each user message playing
 * the demo's slide-up entrance.
 */
import { Chat } from "@workspace/registry/lib/angular/chat"
import { css, select } from "@kirana-style/core"
import { MESSAGE_ANIMATIONS } from "@workspace/registry/bases/react-base/components/message-animations"
import { cardCtx } from "@workspace/registry/core/context"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
} from "@workspace/registry/core/scales"
import { theme } from "@workspace/registry/core/tokens"
import { page } from "@workspace/registry/styles/page.styles"
import { createChat, getMessageText } from "@workspace/registry/lib/ai"

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
  empty: css({
    height: { "*": null, base: "100%" },
  }),
  // In place of Message Scroller's viewport and content: scrolls, and holds the messages apart.
  messages: css({
    height: "100%",
    overflowY: "auto",
    padding: cardCtx.spacing,
    display: "flex",
    flexDirection: "column",
    gap: space[4],
  }),
  paragraphs: css({
    [select.child(":not(:last-child)")]: { marginBottom: space[2] },
  }),
  paragraph: css({ whiteSpace: "pre-wrap" }),
  cardFooter: css({
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[2] },
  }),
  form: css({
    width: "100%",
  }),
  div2: css({
    height: space[14],
    width: "100%",
    paddingInline: space[3],
    paddingBlock: space["2.5"],
  }),
  span: css({
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
    display: "-webkit-box",
    overflow: "hidden",
    opacity: { base: "60%", '[data-status="ready"]': "100%" },
  }),
  span2: css({
    color: theme.mutedForeground,
  }),
  inputGroupAddon: css({
    paddingTop: { "*": null, base: space[1] },
  }),
  dropdownMenuContent: css({
    width: { "*": null, base: space[44] },
  }),
  inputGroupButton: css({
    marginLeft: { "*": null, base: "auto" },
  }),
  span3: css({
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
  div3: css({
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
  .assistant(
    "That's the classic streaming scroll problem. Wrap your message list in `MessageScroller` and turn on `autoScroll` — the viewport pins to the bottom as tokens arrive, so users always see the latest text land in place.\n\nThe important part: it only auto-scrolls while the reader is already at the bottom. The moment they scroll up to read something earlier, auto-scroll backs off and their position is preserved. You get smooth streaming without fighting the user's intent."
  )
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

const paragraphs = (text: string) =>
  text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)

@Component({
  selector: "kui-chat-card",
  imports: [
    Bubble,
    BubbleContent,
    Button,
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    Message,
    MessageContent,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    IconPlaceholder,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.div">
        <div kuiCard [sx]="styles.card">
          <div kuiCardHeader [sx]="styles.cardHeader">
            <div kuiCardTitle>New Chat</div>
            <div kuiCardDescription>How can I help you today?</div>
            <div kuiCardAction>
              <ng-container kuiTooltip>
                <button
                  kuiButton
                  kuiTooltipTrigger
                  variant="outline"
                  size="icon"
                  aria-label="Reset conversation"
                  [disabled]="isBusy()"
                  (click)="chat.messages = initialMessages"
                >
                  <svg
                    iconPlaceholder
                    lucide="RotateCwIcon"
                    tabler="IconRotateClockwise2"
                    hugeicons="Rotate01Icon"
                    phosphor="ArrowClockwiseIcon"
                    remixicon="RiRefreshLine"
                  ></svg>
                </button>
                <div kuiTooltipContent>
                  <p>Reset</p>
                </div>
              </ng-container>
            </div>
          </div>
          <div kuiCardContent [sx]="styles.cardContent">
            @if (chat.messages.length === 0) {
              <div kuiEmpty [sx]="styles.empty">
                <div kuiEmptyHeader>
                  <div kuiEmptyMedia variant="icon">
                    <svg
                      iconPlaceholder
                      lucide="MessageCircleDashedIcon"
                      tabler="IconMessageCircle"
                      hugeicons="BubbleChatIcon"
                      phosphor="ChatCircleDotsIcon"
                      remixicon="RiChat3Line"
                    ></svg>
                  </div>
                  <div kuiEmptyTitle>Morning, kirana!</div>
                  <div kuiEmptyDescription>
                    What are we working on today? Press send to start a new
                    conversation
                  </div>
                </div>
              </div>
            } @else {
              <div
                #list
                role="log"
                aria-relevant="additions"
                [attr.aria-busy]="isBusy()"
                [sx]="styles.messages"
              >
                @for (message of chat.messages; track message.id) {
                  <div [sx]="message.role === 'user' && entrance">
                    <div
                      kuiMessage
                      [align]="message.role === 'user' ? 'end' : 'start'"
                    >
                      <div kuiMessageContent>
                        <div
                          kuiBubble
                          [variant]="
                            message.role === 'user' ? 'muted' : 'ghost'
                          "
                        >
                          <div kuiBubbleContent [sx]="styles.paragraphs">
                            @for (
                              paragraph of paragraphs(getMessageText(message));
                              track index;
                              let index = $index
                            ) {
                              <p [sx]="styles.paragraph">{{ paragraph }}</p>
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              </div>
            }
          </div>
          <div kuiCardFooter [sx]="styles.cardFooter">
            <form [sx]="styles.form" (submit)="send()">
              <div kuiInputGroup>
                <div [sx]="styles.div2">
                  <span [sx]="styles.span" [attr.data-status]="chat.status">
                    @if (nextMessage(); as next) {
                      {{ getMessageText(next) }}
                    } @else {
                      <span [sx]="styles.span2"
                        >No messages queued. Reset the conversation.</span
                      >
                    }
                  </span>
                </div>
                <div
                  kuiInputGroupAddon
                  align="block-end"
                  [sx]="styles.inputGroupAddon"
                >
                  <ng-container kuiDropdownMenu>
                    <button
                      kuiInputGroupButton
                      kuiDropdownMenuTrigger
                      aria-label="Add files"
                      type="button"
                      size="icon-sm"
                      variant="outline"
                    >
                      <svg
                        iconPlaceholder
                        lucide="PlusIcon"
                        tabler="IconPlus"
                        hugeicons="PlusSignIcon"
                        phosphor="PlusIcon"
                        remixicon="RiAddLine"
                      ></svg>
                    </button>
                    <div
                      kuiDropdownMenuContent
                      align="start"
                      side="top"
                      [sx]="styles.dropdownMenuContent"
                    >
                      <div kuiDropdownMenuItem>
                        <svg
                          iconPlaceholder
                          lucide="PaperclipIcon"
                          tabler="IconPaperclip"
                          hugeicons="AttachmentIcon"
                          phosphor="PaperclipIcon"
                          remixicon="RiAttachmentLine"
                        ></svg>
                        Add Photos & Files
                      </div>
                      <div kuiDropdownMenuSeparator></div>
                      <div kuiDropdownMenuItem>
                        <svg
                          iconPlaceholder
                          lucide="ImageIcon"
                          tabler="IconPhoto"
                          hugeicons="ImageIcon"
                          phosphor="ImageIcon"
                          remixicon="RiImageLine"
                        ></svg>
                        Create Image
                      </div>
                      <div kuiDropdownMenuItem>
                        <svg
                          iconPlaceholder
                          lucide="TelescopeIcon"
                          tabler="IconTelescope"
                          hugeicons="Telescope01Icon"
                          phosphor="BinocularsIcon"
                          remixicon="RiSearchEyeLine"
                        ></svg>
                        Deep Research
                      </div>
                      <div kuiDropdownMenuItem>
                        <svg
                          iconPlaceholder
                          lucide="GlobeIcon"
                          tabler="IconGlobe"
                          hugeicons="Globe02Icon"
                          phosphor="GlobeIcon"
                          remixicon="RiGlobeLine"
                        ></svg>
                        Web Search
                      </div>
                    </div>
                  </ng-container>
                  <button
                    kuiInputGroupButton
                    type="submit"
                    variant="default"
                    size="icon-sm"
                    [disabled]="!nextMessage() || isBusy()"
                    [sx]="styles.inputGroupButton"
                  >
                    <svg
                      iconPlaceholder
                      lucide="ArrowUpIcon"
                      tabler="IconArrowUp"
                      hugeicons="ArrowUp02Icon"
                      phosphor="ArrowUpIcon"
                      remixicon="RiArrowUpLine"
                    ></svg>
                    <span [sx]="styles.span3">Send</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div [sx]="styles.div3">
          Demo is read only. Press send to send messages.
        </div>
      </div>
    </div>
  `,
})
export class ChatCard {
  protected readonly chat = new Chat({ messages: initialMessages, transport })
  protected readonly nextMessage = computed(() => chat.next(this.chat.messages))
  protected readonly isBusy = computed(
    () => this.chat.status === "submitted" || this.chat.status === "streaming"
  )
  protected readonly entrance = MESSAGE_ANIMATIONS["slide-up"].sx
  protected readonly styles = styles
  protected readonly page = page
  protected readonly initialMessages = initialMessages
  protected readonly paragraphs = paragraphs
  protected readonly getMessageText = getMessageText
  private readonly list = viewChild<ElementRef<HTMLElement>>("list")

  constructor() {
    // Keeps to the bottom while the reader is there, as Message Scroller's auto-scroll does.
    let pinned = true
    effect(() => {
      this.chat.messages.map((message) => getMessageText(message).length)
      const element = untracked(() => this.list())?.nativeElement
      if (!element) return
      pinned =
        element.scrollHeight - element.scrollTop - element.clientHeight < 48
    })
    afterRenderEffect(() => {
      this.chat.messages.map((message) => getMessageText(message).length)
      const element = this.list()?.nativeElement
      if (element && pinned) element.scrollTop = element.scrollHeight
    })
  }

  protected send() {
    const next = this.nextMessage()
    if (!next || this.isBusy()) return
    void this.chat.sendMessage(next)
  }
}
