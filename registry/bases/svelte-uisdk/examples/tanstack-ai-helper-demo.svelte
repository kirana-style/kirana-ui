<script lang="ts">
  import { createChat } from "@tanstack/ai-svelte"
  import IconPlaceholder from "../../../icons/IconPlaceholder.svelte"
  import {
    createChat as createScriptedChat,
    getMessageText,
  } from "../../../lib/tanstack-ai"
  import MessageRow from "../components/tanstack-ai-helper-demo/MessageRow.svelte"
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
  import { css } from "@kirana-style/core"
  import { cardCtx } from "../../../core/context"
  import {
    containerSize,
    fontSize,
    lineHeight,
    space,
  } from "../../../core/scales"
  import { theme } from "../../../core/tokens"
  import { page } from "../../../styles/page.styles"

  const styles = {
    div: css({
      position: "relative",
      display: "flex",
      width: "100%",
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
    // Svelte has no MessageScroller: the thread is a scroll container that follows new text while
    // the reader is at its end.
    viewport: css({
      height: "100%",
      overflowY: "auto",
      overscrollBehavior: "contain",
    }),
    thread: css({
      display: "flex",
      minHeight: "100%",
      flexDirection: "column",
      gap: space[6],
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

  const chat = createScriptedChat()
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

  const conversation = createChat({
    initialMessages,
    connection,
    threadId: "tanstack-ai-helper-demo",
  })
  const nextMessage = $derived.by(() => chat.next(conversation.messages))
  const busy = $derived.by(
    () => conversation.status === "submitted" || conversation.status === "streaming"
  )

  let viewport = $state<HTMLElement>()
  let thread = $state<HTMLElement>()
  let pinned = true

  function onscroll() {
    if (!viewport) return
    pinned =
      viewport.scrollHeight - viewport.scrollTop - viewport.clientHeight < 8
  }

  // Follows the thread as it grows, while the reader is at its end.
  $effect(() => {
    if (!viewport || !thread) return
    const view = viewport
    const observer = new ResizeObserver(() => {
      if (pinned) view.scrollTop = view.scrollHeight
    })
    observer.observe(thread)
    return () => observer.disconnect()
  })

  function send(event: SubmitEvent) {
    event.preventDefault()
    if (!nextMessage || busy) {
      return
    }
    pinned = true
    void conversation.append(nextMessage)
  }
</script>

<div sx={page.example}>
  <div sx={styles.div}>
    <Card sx={styles.card}>
      <CardHeader sx={styles.cardHeader}>
        <CardTitle>New Chat</CardTitle>
        <CardDescription>How can I help you today?</CardDescription>
        <CardAction>
          <Tooltip>
            <TooltipTrigger>
              {#snippet asChild(props)}
                <Button {...props()} variant="outline" size="icon" aria-label="Reset conversation" onclick={() => conversation.setMessages(initialMessages)} disabled={busy}>
                  <IconPlaceholder lucide="RotateCwIcon" tabler="IconRotateClockwise2" hugeicons="Rotate01Icon" phosphor="ArrowClockwiseIcon" remixicon="RiRefreshLine" />
                </Button>
              {/snippet}
            </TooltipTrigger>
            <TooltipContent>
              <p>Reset</p>
            </TooltipContent>
          </Tooltip>
        </CardAction>
      </CardHeader>
      <CardContent sx={styles.cardContent}>
        {#if conversation.messages.length === 0}
          <Empty sx={styles.empty}>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <IconPlaceholder lucide="MessageCircleDashedIcon" tabler="IconMessageCircle" hugeicons="BubbleChatIcon" phosphor="ChatCircleDotsIcon" remixicon="RiChat3Line" />
              </EmptyMedia>
              <EmptyTitle>Morning, shadcn!</EmptyTitle>
              <EmptyDescription>
                What are we working on today? Press send to start a new
                conversation
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        {:else}
          <div bind:this={viewport} {onscroll} sx={styles.viewport}>
            <div bind:this={thread} role="log" aria-relevant="additions" aria-busy={busy} sx={styles.thread}>
              {#each conversation.messages as message (message.id)}
                <MessageRow message={message} />
              {/each}
            </div>
          </div>
        {/if}
      </CardContent>
      <CardFooter sx={styles.cardFooter}>
        <form onsubmit={send} sx={styles.form}>
          <InputGroup>
            <InputGroupTextarea aria-label="Next predefined message" data-status={conversation.status} placeholder="No messages queued. Reset the conversation." value={nextMessage ? getMessageText(nextMessage) : ""} readonly sx={styles.textarea} />
            <InputGroupAddon align="block-end" sx={styles.inputGroupAddon}>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  {#snippet asChild(props)}
                    <InputGroupButton {...props()} class={props().class} style={props().style} aria-label="Add files" type="button" size="icon-sm" variant="outline">
                      <IconPlaceholder lucide="PlusIcon" tabler="IconPlus" hugeicons="PlusSignIcon" phosphor="PlusIcon" remixicon="RiAddLine" />
                    </InputGroupButton>
                  {/snippet}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" side="top" sx={styles.dropdownMenuContent}>
                  <DropdownMenuItem>
                    <IconPlaceholder lucide="PaperclipIcon" tabler="IconPaperclip" hugeicons="AttachmentIcon" phosphor="PaperclipIcon" remixicon="RiAttachmentLine" />
                    Add Photos & Files
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <IconPlaceholder lucide="ImageIcon" tabler="IconPhoto" hugeicons="Image01Icon" phosphor="ImageIcon" remixicon="RiImageLine" />
                    Create Image
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <IconPlaceholder lucide="TelescopeIcon" tabler="IconTelescope" hugeicons="Telescope01Icon" phosphor="BinocularsIcon" remixicon="RiSearchEyeLine" />
                    Deep Research
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <IconPlaceholder lucide="GlobeIcon" tabler="IconWorld" hugeicons="Globe02Icon" phosphor="GlobeIcon" remixicon="RiGlobalLine" />
                    Web Search
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <InputGroupButton type="submit" variant="default" size="icon-sm" disabled={!nextMessage || busy} sx={styles.inputGroupButton}>
                <IconPlaceholder lucide="ArrowUpIcon" tabler="IconArrowUp" hugeicons="ArrowUpIcon" phosphor="ArrowUpIcon" remixicon="RiArrowUpLine" />
                <span sx={styles.srOnly}>Send</span>
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
