import {
  Component,
  afterRenderEffect,
  computed,
  viewChild,
} from "@angular/core"
import type { ElementRef } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { injectChat } from "@tanstack/ai-angular"
import { cardCtx } from "../../../core/context"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { axes } from "../../../core/axes"
import { theme } from "../../../core/tokens"
import { IconPlaceholder } from "../../../icons/angular"
import { createChat, getMessageText } from "../../../lib/tanstack-ai"
import { page } from "../../../styles/page.styles"
import { MessageAnimated } from "../components/tanstack-ai-helper-demo/message-animated"
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

const { vega, maia, luma, rhea, sera } = axes.style

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
  // Angular has no Message Scroller: a viewport that follows the stream while the reader is at
  // its end, as upstream's `autoScroll` does, its content laid out as the scroller's.
  viewport: css({
    width: "100%",
    height: "100%",
    minHeight: "0",
    scrollbarWidth: "thin",
    scrollbarGutter: "stable",
    overflowY: "auto",
    overscrollBehavior: "contain",
  }),
  content: css({
    display: "flex",
    minHeight: "100%",
    flexDirection: "column",
    gap: {
      base: space[6],
      [vega]: space[8],
      [maia]: space[8],
      [luma]: space[8],
      [rhea]: space[8],
      [sera]: space[8],
    },
    padding: cardCtx.spacing,
  }),
  cardFooter: css({
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[2] },
  }),
  form: css({
    width: "100%",
  }),
  // `h-14 min-h-14 overflow-hidden px-3 py-2.5 opacity-60 data-[status=ready]:opacity-100`.
  inputGroupTextarea: css({
    height: space[14],
    minHeight: { "*": null, base: space[14] },
    overflow: "hidden",
    paddingInline: { "*": null, base: space[3] },
    paddingBlock: { "*": null, base: space["2.5"] },
    opacity: { base: "60%", '[data-status="ready"]': "100%" },
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
  srOnly: css({
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
const connection = chat.transport({ delayMs: 20 })

@Component({
  selector: "tanstack-ai-helper-demo",
  imports: [
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
    InputGroupTextarea,
    MessageAnimated,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    IconPlaceholder,
    SxDirective,
  ],
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
                  type="button"
                  variant="outline"
                  size="icon"
                  aria-label="Reset conversation"
                  [disabled]="busy()"
                  (click)="chat.setMessages(initialMessages)"
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
            @if (chat.messages().length === 0) {
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
                #viewport
                [sx]="styles.viewport"
                (scroll)="onScroll(viewport)"
              >
                <div
                  role="log"
                  aria-relevant="additions"
                  [attr.aria-busy]="busy()"
                  [sx]="styles.content"
                >
                  @for (message of chat.messages(); track message.id) {
                    <kui-message-animated [message]="message" />
                  }
                </div>
              </div>
            }
          </div>
          <div kuiCardFooter [sx]="styles.cardFooter">
            <form [sx]="styles.form" (submit)="send($event)">
              <div kuiInputGroup>
                <textarea
                  kuiInputGroupTextarea
                  aria-label="Next predefined message"
                  [sx]="styles.inputGroupTextarea"
                  [attr.data-status]="chat.status()"
                  placeholder="No messages queued. Reset the conversation."
                  [value]="nextMessageText()"
                  readonly
                ></textarea>
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
                    [disabled]="!nextMessage() || busy()"
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
                    <span [sx]="styles.srOnly">Send</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div [sx]="styles.note">
          Demo is read only. Press send to send messages.
        </div>
      </div>
    </div>
  `,
})
export default class TanstackAiHelperDemo {
  protected readonly chat = injectChat({
    initialMessages,
    connection,
    threadId: "tanstack-ai-helper-demo",
  })
  protected readonly nextMessage = computed(() =>
    chat.next(this.chat.messages())
  )
  protected readonly nextMessageText = computed(() => {
    const next = this.nextMessage()
    return next ? getMessageText(next) : ""
  })
  protected readonly busy = computed(
    () =>
      this.chat.status() === "submitted" || this.chat.status() === "streaming"
  )
  private readonly viewport = viewChild<ElementRef<HTMLElement>>("viewport")
  // Whether the reader is at the transcript's end, where it follows the stream.
  private pinned = true
  protected readonly styles = styles
  protected readonly initialMessages = initialMessages
  protected readonly page = page

  constructor() {
    afterRenderEffect(() => {
      this.chat.messages()
      const viewport = this.viewport()?.nativeElement
      if (viewport && this.pinned) viewport.scrollTop = viewport.scrollHeight
    })
  }

  protected onScroll(viewport: HTMLElement) {
    this.pinned =
      viewport.scrollHeight - viewport.scrollTop - viewport.clientHeight < 8
  }

  protected send(event: Event) {
    event.preventDefault()
    const next = this.nextMessage()
    if (!next || this.busy()) return
    // A sent message brings the reader back to the end, as upstream's anchored turn does.
    this.pinned = true
    void this.chat.append(next)
  }
}
