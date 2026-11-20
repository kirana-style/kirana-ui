<script lang="ts">
  import { createChat } from "@tanstack/ai-svelte"
  import type { UIMessage } from "@tanstack/ai-svelte"
  import { isStep } from "../components/chain-of-thought-demo-tanstack-ai/types"
  import {
    createChat as createScriptedChat,
    getMessageText,
  } from "../../../lib/tanstack-ai"
  import { Bubble, BubbleContent } from "../ui/bubble"
  import { Button } from "../ui/button"
  import { Message, MessageContent } from "../ui/message"
  import { css } from "@kirana-style/core"
  import {
    containerSize,
    fontSize,
    lineHeight,
    space,
  } from "../../../core/scales"
  import { page } from "../../../styles/page.styles"
  import ChainOfThought from "../components/chain-of-thought-demo-tanstack-ai/ChainOfThought.svelte"

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
      writer
        .tool("readBuildLog", { input: { deployment: "dpl_8Kx2" } })
        .sleep(900)
        .output({
          log: "install    41s\ncompile    38s\nimages   3m 52s",
        })
      writer
        .tool("searchWeb", { input: { query: "next.js image cache key" } })
        .sleep(900)
        .output({
          results: [
            {
              title: "Image component | nextjs.org",
              url: "https://nextjs.org/docs/app/api-reference/components/image",
            },
            {
              title: "Build cache | vercel.com",
              url: "https://vercel.com/docs/deployments/troubleshoot-a-build",
            },
          ],
        })
      writer
        .tool("searchCode", { input: { query: "cacheKey" } })
        .sleep(900)
        .output({ files: ["next.config.ts", "scripts/optimize-images.ts"] })
      writer.text(
        "Image optimization takes almost four minutes because its cache key includes the commit hash. Key it on the image directory instead."
      )
    })

  const transcript = chat.get()

  const [question] = chat.get(1)

  const connection = chat.transport({ delayMs: 20 })

  const conversation = createChat({
    initialMessages: transcript,
    connection,
    threadId: "chain-of-thought-demo",
  })
  const busy = $derived.by(
    () => conversation.status === "submitted" || conversation.status === "streaming"
  )
  const streaming = (message: UIMessage) =>
    busy && message === conversation.messages.at(-1)
  const stepsOf = (message: UIMessage) => message.parts.filter(isStep)

  function replay() {
    conversation.setMessages([])
    void conversation.append(question)
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
            {#if stepsOf(message).length > 0}
              <ChainOfThought message={message} steps={stepsOf(message)} streaming={streaming(message)} answering={getMessageText(message).length > 0} />
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
