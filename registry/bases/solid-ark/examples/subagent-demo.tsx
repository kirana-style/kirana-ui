import { SubagentRow } from "../components/subagent-demo/subagent-row"
import { For, Show, createMemo } from "solid-js"
import { Chat } from "../../../lib/solid/chat"
import { createChat, getMessageText } from "../../../lib/ai"
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
import type {
  ChatMessage,
  SubagentMessage,
  SubagentPart,
} from "../components/subagent-demo/types"

export default function SubagentDemo() {
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

  const steps = [
    {
      command: "grep -rn cacheKey scripts",
      stdout:
        "scripts/optimize-images.ts:14:  const cacheKey = process.env.COMMIT_SHA",
    },
    {
      command: "sed -n 13,15p scripts/optimize-images.ts",
      stdout:
        'const cacheDir = ".next/cache/images"\nconst cacheKey = process.env.COMMIT_SHA\nconst cached = await restoreCache(cacheDir, cacheKey)',
    },
    {
      command: "ls public/images | wc -l",
      stdout: "1240",
    },
  ]

  function getSubagentMessage(done: number, report?: string): SubagentMessage {
    const parts = steps.slice(0, done).map((step, index): SubagentPart => ({
      type: "tool-runCommand",
      toolCallId: `step-${index}`,
      state: "output-available",
      input: { command: step.command },
      output: { stdout: step.stdout },
    }))

    if (done < steps.length) {
      parts.push({
        type: "tool-runCommand",
        toolCallId: `step-${done}`,
        state: "input-available",
        input: { command: steps[done].command },
      })
    }

    if (report) {
      parts.push({ type: "text", text: report })
    }

    return { id: "research-agent", role: "assistant", parts }
  }

  const chat = createChat<ChatMessage>()
    .user("Why does image optimization rerun on every deploy?")
    .assistant(({ writer }) => {
      const subagent = writer
        .tool("researchAgent", {
          input: {
            task: "Find out why image optimization reruns on every deploy.",
          },
        })
        .sleep(600)
      steps.forEach((_, index) => {
        subagent
          .output(getSubagentMessage(index), { preliminary: true })
          .sleep(1000)
      })
      subagent
        .output(
          getSubagentMessage(
            steps.length,
            "The cache is keyed on the commit SHA, so every deploy misses it and optimizes all 1,240 images again."
          )
        )
        .sleep(400)
      writer.text(
        "Image optimization reruns because its cache is keyed on the commit SHA, which changes on every deploy. Key the cache on a hash of public/images instead, and unchanged images will be skipped."
      )
    })

  const transcript = chat.get()

  const [question] = chat.get(1)

  const transport = chat.transport({ delayMs: 20 })

  const conversation = new Chat<ChatMessage>({
    messages: transcript,
    transport,
  })
  const busy = createMemo(
    () =>
      conversation.status === "submitted" || conversation.status === "streaming"
  )
  const streaming = (message: ChatMessage) =>
    busy() && message === conversation.messages.at(-1)
  const agentsOf = (message: ChatMessage) =>
    message.parts.filter((part) => part.type === "tool-researchAgent")

  function replay() {
    conversation.messages = []
    void conversation.sendMessage(question)
  }

  return (
    <div sx={page.example}>
      <div sx={styles.div}>
        <For each={conversation.messages}>
          {(message) => (
            <>
              {message.role === "user" ? (
                <Message align="end">
                  <MessageContent>
                    <Bubble align="end" variant="muted">
                      <BubbleContent>{getMessageText(message)}</BubbleContent>
                    </Bubble>
                  </MessageContent>
                </Message>
              ) : (
                <Message>
                  <MessageContent sx={styles.messageContent}>
                    <Show when={agentsOf(message).length > 0}>
                      <Trace>
                        <For each={agentsOf(message)}>
                          {(part) => (
                            <SubagentRow
                              part={part}
                              streaming={streaming(message)}
                            />
                          )}
                        </For>
                      </Trace>
                    </Show>
                    <Show when={getMessageText(message)}>
                      <p>{getMessageText(message)}</p>
                    </Show>
                  </MessageContent>
                </Message>
              )}
            </>
          )}
        </For>
        <Show when={!busy()}>
          <Button
            variant="outline"
            size="sm"
            sx={styles.button}
            onClick={replay}
          >
            Replay
          </Button>
        </Show>
      </div>
    </div>
  )
}
