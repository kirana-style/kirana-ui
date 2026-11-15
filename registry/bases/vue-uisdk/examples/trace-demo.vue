<script setup lang="ts">
import { useChat } from "@ai-sdk/vue"
import { computed } from "vue"

import { createChat, getMessageText } from "../../../lib/ai"
import SourcesRow from "../components/trace-demo/SourcesRow.vue"
import ThinkingRow from "../components/trace-demo/ThinkingRow.vue"
import ToolRow from "../components/trace-demo/ToolRow.vue"
import type { ChatMessage, Part } from "../components/trace-demo/types"
import { Bubble, BubbleContent } from "../ui/bubble"
import { Button } from "../ui/button"
import { Message, MessageContent } from "../ui/message"
import { Trace } from "../ui/trace"
import { css } from "@kirana-style/core"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  div: css({
    display: "flex",
    minHeight: space[72],
    width: "100%",
    maxWidth: containerSize.sm,
    flexDirection: "column",
    gap: space[4],
    paddingBlock: space[6],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
  messageContent: css({
    gap: { "*": null, base: space[4] },
  }),
  button: css({
    marginTop: { "*": null, base: "auto" },
    alignSelf: { "*": null, base: "flex-start" },
  }),
}

const chat = createChat<ChatMessage>()
  .user("Why does pnpm install fail in CI?")
  .assistant(({ writer }) => {
    writer.reasoning(
      "CI installs with a frozen lockfile, so the install stops when package.json and pnpm-lock.yaml disagree. I should check what the last commit changed, then reproduce the install.",
      { delayMs: 40 }
    )
    writer
      .tool("runCommand", { input: { command: "pnpm --version" } })
      .sleep(700)
      .output({ stdout: "10.18.0" })
    writer
      .tool("runCommand", {
        input: {
          command: "git diff --stat HEAD~1 -- package.json pnpm-lock.yaml",
        },
      })
      .sleep(900)
      .output({
        stdout:
          " package.json | 2 +-\n 1 file changed, 1 insertion(+), 1 deletion(-)",
      })
    writer
      .tool("runCommand", {
        input: { command: "pnpm install --frozen-lockfile" },
      })
      .sleep(1200)
      .error(
        'ERR_PNPM_OUTDATED_LOCKFILE  Cannot install with "frozen-lockfile" because pnpm-lock.yaml is not up to date with package.json'
      )
    writer.sourceUrl({
      url: "https://pnpm.io/cli/install#--frozen-lockfile",
      title: "pnpm install | pnpm.io",
    })
    writer.sourceUrl({
      url: "https://pnpm.io/continuous-integration",
      title: "Continuous Integration | pnpm.io",
    })
    writer.sleep(1000)
    writer.text(
      "The last commit bumped a version in package.json without updating pnpm-lock.yaml, so the frozen install fails. Run pnpm install locally and commit the lockfile."
    )
  })

const transcript = chat.get()
const [question] = chat.get(1)
const transport = chat.transport({ delayMs: 20 })

const { messages, sendMessage, status } = useChat<ChatMessage>({
  messages: transcript,
  transport,
})
const busy = computed(
  () => status.value === "submitted" || status.value === "streaming"
)

type Source = Extract<Part, { type: "source-url" }>

/** What each assistant message draws: its trace's rows and sources, and its text. */
const replies = computed(
  () =>
    new Map(
      messages.value.map((message) => [
        message.id,
        {
          streaming: busy.value && message === messages.value.at(-1),
          rows: message.parts.filter(
            (part) =>
              part.type === "reasoning" || part.type === "tool-runCommand"
          ),
          sources: message.parts.filter(
            (part): part is Source => part.type === "source-url"
          ),
          text: getMessageText(message),
        },
      ])
    )
)
const reply = (message: ChatMessage) => replies.value.get(message.id)!

function replay() {
  messages.value = []
  void sendMessage(question)
}
</script>

<template>
  <div :sx="page.example">
    <div :sx="styles.div">
      <template v-for="message in messages" :key="message.id">
        <Message v-if="message.role === 'user'" align="end">
          <MessageContent>
            <Bubble align="end" variant="muted">
              <BubbleContent>{{ getMessageText(message) }}</BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
        <Message v-else>
          <MessageContent :sx="styles.messageContent">
            <Trace
              v-if="
                reply(message).rows.length + reply(message).sources.length > 0
              "
            >
              <template
                v-for="(part, index) in reply(message).rows"
                :key="part.type === 'tool-runCommand' ? part.toolCallId : index"
              >
                <ThinkingRow
                  v-if="part.type === 'reasoning'"
                  :text="part.text"
                  :running="
                    reply(message).streaming && part.state === 'streaming'
                  "
                />
                <ToolRow
                  v-else-if="part.type === 'tool-runCommand'"
                  :part="part"
                  :streaming="reply(message).streaming"
                  :default-open="index === 2"
                />
              </template>
              <SourcesRow
                v-if="reply(message).sources.length > 0"
                :sources="reply(message).sources"
                :running="
                  reply(message).streaming && reply(message).text.length === 0
                "
              />
            </Trace>
            <p v-if="reply(message).text">{{ reply(message).text }}</p>
          </MessageContent>
        </Message>
      </template>
      <Button
        v-if="!busy"
        variant="outline"
        size="sm"
        :sx="styles.button"
        @click="replay"
      >
        Replay
      </Button>
    </div>
  </div>
</template>
