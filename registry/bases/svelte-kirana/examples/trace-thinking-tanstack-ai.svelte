<script lang="ts">
  import { createChat } from "@tanstack/ai-svelte"
  import type { UIMessage } from "@tanstack/ai-svelte"

  import {
    createChat as createScriptedChat,
    getMessageText,
  } from "../../../lib/tanstack-ai"
  import ThinkingTrace from "../components/trace-thinking-tanstack-ai/ThinkingTrace.svelte"
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

  const chat = createScriptedChat()
    .user("Why is the checkout deploy so slow?")
    .assistant(({ writer }) => {
      writer.reasoning(
        "The build log shows install and compile finish in under a minute. Image optimization takes almost four, and it reruns on every deploy because the cache key includes the commit hash.",
        { delayMs: 60 }
      )
      writer.sleep(400)
      writer.text(
        "Image optimization is the bottleneck. Key its cache on the lockfile and the image directory instead of the commit hash."
      )
    })

  const initialMessages = chat.get(0)
  const connection = chat.transport({ delayMs: 20 })

  function groupParts(parts: UIMessage["parts"]) {
    const runs: { trace: boolean; parts: UIMessage["parts"] }[] = []

    for (const part of parts) {
      const trace = part.type === "thinking"

      if (!trace && part.type !== "text") {
        continue
      }

      const last = runs.at(-1)

      if (last?.trace === trace) {
        last.parts.push(part)
      } else {
        runs.push({ trace, parts: [part] })
      }
    }

    return runs
  }

  const conversation = createChat({
    initialMessages,
    connection,
    threadId: "trace-thinking",
  })
  const nextMessage = $derived.by(() => chat.next(conversation.messages))
  const busy = $derived.by(
    () => conversation.status === "submitted" || conversation.status === "streaming"
  )
  const live = (message: UIMessage) =>
    conversation.status === "streaming" && message === conversation.messages.at(-1)

  function advance() {
    if (nextMessage) void conversation.append(nextMessage)
    else conversation.setMessages(initialMessages)
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
            {#each groupParts(message.parts) as run, runIndex (runIndex)}
              {#if run.trace}
                <Trace>
                  {#each run.parts as part, index (index)}
                    {#if part.type === 'thinking'}
                      <!-- A thinking part has no state of its own: it streams while it is the last part. -->
                      <ThinkingTrace text={part.content} running={live(message) && part === message.parts.at(-1)} />
                    {/if}
                  {/each}
                </Trace>
              {:else}
                {#each run.parts as part, index (`${runIndex}-${index}`)}
                  {#if part.type === 'text'}
                    <p>
                      {part.content}
                    </p>
                  {/if}
                {/each}
              {/if}
            {/each}
          </MessageContent>
        </Message>
      {/if}
    {/each}
    {#if !busy}
      <Button variant="outline" size="sm" sx={styles.button} onclick={advance}>
        {nextMessage ? "Send message" : "Reset"}
      </Button>
    {/if}
  </div>
</div>
