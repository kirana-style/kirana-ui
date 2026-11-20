<script setup lang="ts">
import { useChat } from "@ai-sdk/vue"
import { createChat } from "@shadcn/helpers/ai-sdk"
import { css } from "@kirana-style/core"
import { computed, nextTick, ref, watch } from "vue"

import IconPlaceholder from "../../../icons/IconPlaceholder.vue"
import { cardCtx } from "../../../core/context"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { getMessageText } from "../../../lib/ai"
import { page } from "../../../styles/page.styles"
import MessageAnimated from "../components/ai-sdk-helper-demo/MessageAnimated.vue"
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
} from "../ui/input-group"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

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

const { messages, sendMessage, status } = useChat({
  messages: initialMessages,
  transport,
})
const nextMessage = computed(() => chat.next(messages.value))
const isBusy = computed(
  () => status.value === "submitted" || status.value === "streaming"
)
// Keeps to the bottom while the reader is there, as Message Scroller's auto-scroll does.
const list = ref<HTMLElement | null>(null)
watch(
  () =>
    messages.value
      .map((message) =>
        message.parts
          .map((part) =>
            part.type === "text" || part.type === "reasoning"
              ? part.text.length
              : 0
          )
          .join()
      )
      .join(),
  async () => {
    const element = list.value
    if (!element) return
    const pinned =
      element.scrollHeight - element.scrollTop - element.clientHeight < 48
    await nextTick()
    if (pinned) element.scrollTop = element.scrollHeight
  }
)

// A fresh copy: the AI SDK's Vue chat keeps the array it is given and adds to it in place.
function reset() {
  messages.value = chat.get(0)
}

function send() {
  if (!nextMessage.value || isBusy.value) return
  void sendMessage(nextMessage.value)
}
</script>

<template>
  <div :sx="page.example">
    <div :sx="styles.div">
      <Card :sx="styles.card">
        <CardHeader :sx="styles.cardHeader">
          <CardTitle>New Chat</CardTitle>
          <CardDescription>How can I help you today?</CardDescription>
          <CardAction>
            <Tooltip>
              <TooltipTrigger as-child>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Reset conversation"
                  :disabled="isBusy"
                  @click="reset"
                >
                  <IconPlaceholder
                    lucide="RotateCwIcon"
                    tabler="IconRotateClockwise2"
                    hugeicons="Rotate01Icon"
                    phosphor="ArrowClockwiseIcon"
                    remixicon="RiRefreshLine"
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Reset</p>
              </TooltipContent>
            </Tooltip>
          </CardAction>
        </CardHeader>
        <CardContent :sx="styles.cardContent">
          <Empty v-if="messages.length === 0" :sx="styles.empty">
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
              <EmptyTitle>Morning, kirana!</EmptyTitle>
              <EmptyDescription>
                What are we working on today? Press send to start a new
                conversation
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
          <div
            v-else
            ref="list"
            role="log"
            aria-relevant="additions"
            :aria-busy="isBusy"
            :sx="styles.messages"
          >
            <MessageAnimated
              v-for="message in messages"
              :key="message.id"
              :message="message"
            />
          </div>
        </CardContent>
        <CardFooter :sx="styles.cardFooter">
          <form :sx="styles.form" @submit.prevent="send">
            <InputGroup>
              <div :sx="styles.div2">
                <span :sx="styles.span" :data-status="status">
                  <template v-if="nextMessage">{{
                    getMessageText(nextMessage)
                  }}</template>
                  <span v-else :sx="styles.span2">
                    No messages queued. Reset the conversation.
                  </span>
                </span>
              </div>
              <InputGroupAddon align="block-end" :sx="styles.inputGroupAddon">
                <DropdownMenu>
                  <DropdownMenuTrigger as-child>
                    <InputGroupButton
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
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    side="top"
                    :sx="styles.dropdownMenuContent"
                  >
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
                    <DropdownMenuSeparator />
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
                  </DropdownMenuContent>
                </DropdownMenu>
                <InputGroupButton
                  type="submit"
                  variant="default"
                  size="icon-sm"
                  :disabled="!nextMessage || isBusy"
                  :sx="styles.inputGroupButton"
                >
                  <IconPlaceholder
                    lucide="ArrowUpIcon"
                    tabler="IconArrowUp"
                    hugeicons="ArrowUp02Icon"
                    phosphor="ArrowUpIcon"
                    remixicon="RiArrowUpLine"
                  />
                  <span :sx="styles.span3">Send</span>
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </form>
        </CardFooter>
      </Card>
      <div :sx="styles.div3">
        Demo is read only. Press send to send messages.
      </div>
    </div>
  </div>
</template>
