<script setup lang="ts">
import { computed, ref, useTemplateRef } from "vue"
import IconPlaceholder from "../../../icons/IconPlaceholder.vue"
import { Bubble, BubbleContent } from "../ui/bubble"
import { Button } from "../ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "../ui/input-group"
import { Message, MessageContent } from "../ui/message"
import { css } from "@kirana-style/core"
import { radius } from "../../../core/tokens"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { scrollFadeX } from "../../../styles/scroll-fade.styles"

const styles = {
  div: css({
    marginInline: "auto",
    display: "flex",
    width: "100%",
    maxWidth: containerSize.lg,
    flexDirection: "column",
    gap: space[6],
    paddingBlock: space[6],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
  div2: css({
    display: "flex",
    flexDirection: "column",
    gap: space[4],
  }),
  div3: css({
    display: "flex",
    flexDirection: "column",
    gap: space[2],
  }),
  div4: css({
    // `scrollbar-none`; `scroll-fade-x` is `scrollFadeX`, beside it.
    scrollbarWidth: "none",
    display: "flex",
    gap: space[2],
    overflowX: "auto",
    overscrollBehaviorX: "contain",
  }),
  button: css({
    flexShrink: { "*": null, base: "0" },
  }),
  inputGroupTextarea: css({
    // `p-3`, block sides logical: InputGroupTextarea sets `padding-block`, which a physical side
    // would not replace.
    paddingBlock: space[3],
    paddingInline: space[3],
  }),
  inputGroupButton: css({
    borderRadius: { "*": null, base: radius.full },
  }),
  inputGroupButton2: css({
    marginLeft: { "*": null, base: "auto" },
    borderRadius: { "*": null, base: radius.full },
  }),
}

const suggestions = [
  "Add a dark mode toggle",
  "Fix the failing build",
  "Write tests for the form",
  "Upgrade to Next.js 16",
  "Add a loading state",
  "Find unused dependencies",
]

const replies: Record<string, string> = {
  "Add a dark mode toggle":
    "Added a ModeToggle to the site header. It calls setTheme from next-themes.",
  "Fix the failing build":
    "The build failed on a missing import in app/page.tsx. I added it and the build passes.",
  "Write tests for the form":
    "Added four tests in signup-form.test.tsx. They cover the empty, invalid and valid states.",
  "Upgrade to Next.js 16":
    "Ran the codemod and bumped next to 16. Two routes needed async params, so I updated them.",
  "Add a loading state":
    "Added a loading.tsx to the dashboard route. It shows skeletons while the data loads.",
  "Find unused dependencies":
    "Three packages are not imported anywhere: lodash, moment and classnames. Should I remove them?",
}

const text = ref("")
const turn = ref<{ prompt: string; reply: string } | null>(null)
const form = useTemplateRef<HTMLFormElement>("form")
const canSend = computed(() => text.value.trim().length > 0)

function send(prompt: string) {
  turn.value = {
    prompt,
    reply: replies[prompt] ?? "This demo only knows the suggestions. Pick one.",
  }
  text.value = ""
}

function onSubmit(event: Event) {
  event.preventDefault()
  if (!canSend.value) {
    return
  }

  send(text.value.trim())
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault()
    form.value?.requestSubmit()
  }
}
</script>
<template>
  <div :sx="page.example">
    <div :sx="styles.div">
      <div v-if="turn" :sx="styles.div2">
        <Message align="end">
          <MessageContent>
            <Bubble align="end" variant="muted">
              <BubbleContent>
                {{ turn.prompt }}
              </BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
        <Message>
          <MessageContent>
            <p>
              {{ turn.reply }}
            </p>
          </MessageContent>
        </Message>
      </div>
      <div :sx="styles.div3">
        <div :sx="[styles.div4, scrollFadeX]">
          <Button
            v-for="suggestion in suggestions"
            :key="suggestion"
            variant="outline"
            size="sm"
            :sx="styles.button"
            @click="send(suggestion)"
          >
            {{ suggestion }}
          </Button>
        </div>
        <form ref="form" @submit="onSubmit">
          <InputGroup>
            <InputGroupTextarea
              v-model="text"
              placeholder="Ask the agent to change your code..."
              @keydown="onKeydown"
              :sx="styles.inputGroupTextarea"
            />
            <InputGroupAddon align="block-end">
              <InputGroupButton
                size="icon-sm"
                variant="outline"
                :sx="styles.inputGroupButton"
                aria-label="Attach files"
              >
                <IconPlaceholder
                  lucide="PlusIcon"
                  tabler="IconPlus"
                  hugeicons="PlusSignIcon"
                  phosphor="PlusIcon"
                  remixicon="RiAddLine"
                />
              </InputGroupButton>
              <InputGroupButton
                type="submit"
                size="icon-sm"
                variant="default"
                :sx="styles.inputGroupButton2"
                :disabled="!canSend"
                aria-label="Send"
              >
                <IconPlaceholder
                  lucide="ArrowUpIcon"
                  tabler="IconArrowUp"
                  hugeicons="ArrowUp02Icon"
                  phosphor="ArrowUpIcon"
                  remixicon="RiArrowUpLine"
                />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </form>
      </div>
    </div>
  </div>
</template>
