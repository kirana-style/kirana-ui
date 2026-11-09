<script lang="ts">
  import { Chat } from "@ai-sdk/svelte"
  import type { ChatMessage } from "../components/test-results-demo/types"
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
  import TestResultsRow from "../components/test-results-demo/TestResultsRow.svelte"

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
    .user("Run the checkout tests.")
    .assistant(({ writer }) => {
      writer
        .tool("runTests", { input: { command: "pnpm test checkout" } })
        .sleep(1500)
        .output({
          suites: [
            {
              name: "cart.test.ts",
              tests: [
                { name: "adds an item", status: "passed" },
                { name: "removes an item", status: "passed" },
                { name: "applies a discount code", status: "passed" },
              ],
            },
            {
              name: "payment.test.ts",
              tests: [
                { name: "charges the saved card", status: "passed" },
                {
                  name: "retries a declined card",
                  status: "failed",
                  error: `Expected 2 charge attempts, received 1

  at Object.<anonymous> (src/payment.test.ts:58:22)`,
                },
              ],
            },
          ],
        })
      writer.text(
        "One test failed. The payment client does not retry a declined card, so the second charge attempt never happens."
      )
    })

  const transcript = chat.get()

  const [question] = chat.get(1)

  const transport = chat.transport({ delayMs: 20 })

  const conversation = new Chat<ChatMessage>({
    messages: transcript,
    transport,
  })
  const busy = $derived.by(
    () => conversation.status === "submitted" || conversation.status === "streaming"
  )
  const streaming = (message: ChatMessage) =>
    busy && message === conversation.messages.at(-1)
  const toolsOf = (message: ChatMessage) =>
    message.parts.filter((part) => part.type === "tool-runTests")

  function replay() {
    conversation.messages = []
    void conversation.sendMessage(question)
  }
</script>

<div sx={page.example}>
  <div sx={styles.div}>
    {#each conversation.messages as message (message.id)}
      {#if message.role === 'user'}
        <Message align="end">
          <MessageContent>
            <Bubble align="end" variant="muted">
              <BubbleContent>
                {getMessageText(message)}
              </BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
      {:else}
        <Message>
          <MessageContent sx={styles.messageContent}>
            {#if toolsOf(message).length > 0}
              <Trace>
                {#each toolsOf(message) as part (part.toolCallId)}
                  <TestResultsRow part={part} streaming={streaming(message)} />
                {/each}
              </Trace>
            {/if}
            {#if getMessageText(message)}
              <p>
                {getMessageText(message)}
              </p>
            {/if}
          </MessageContent>
        </Message>
      {/if}
    {/each}
    {#if !busy}
      <Button variant="outline" size="sm" sx={styles.button} onclick={replay}>
        Replay
      </Button>
    {/if}
  </div>
</div>
