<script lang="ts">
  import { createChat } from "@tanstack/ai-svelte"
  import type { UIMessage } from "@tanstack/ai-svelte"
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
  import Sources from "../components/sources-demo-tanstack-ai/Sources.svelte"
  import type { Source } from "../components/sources-demo-tanstack-ai/Sources.svelte"

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

  // TanStack AI has no source part: the sources are what a search tool returned.
  const chat = createScriptedChat()
    .user("How do I start an Astro project with pnpm?")
    .assistant(({ writer }) => {
      writer
        .tool("searchWeb", { input: { query: "create astro project pnpm" } })
        .output({
          sources: [
            {
              url: "https://docs.astro.build/en/install-and-setup/",
              title: "Install Astro | docs.astro.build",
            },
            {
              url: "https://www.npmjs.com/package/create-astro",
              title: "create-astro | npmjs.com",
            },
            {
              url: "https://docs.astro.build/en/install-and-setup/",
              title: "Install Astro | docs.astro.build",
            },
            {
              url: "https://pnpm.io/cli/create",
              title: "pnpm create | pnpm.io",
            },
          ],
        })
      writer.text(
        "Run pnpm create astro@latest and follow the prompts. It scaffolds the project and installs the dependencies."
      )
    })

  const transcript = chat.get()

  const [question] = chat.get(1)

  const connection = chat.transport({ delayMs: 20 })

  const conversation = createChat({
    initialMessages: transcript,
    connection,
    threadId: "sources-demo",
  })
  const busy = $derived.by(
    () => conversation.status === "submitted" || conversation.status === "streaming"
  )
  /** A `searchWeb` call: TanStack AI types a call by its tool's schemas, so this names them by hand. */
  type SearchPart = Omit<
    Extract<UIMessage["parts"][number], { type: "tool-call" }>,
    "name" | "input" | "output"
  > & {
    name: "searchWeb"
    input?: { query: string }
    output?: { sources: Source[] }
  }

  const sourcesOf = (message: UIMessage) =>
    message.parts
      .filter(
        (part): part is SearchPart =>
          part.type === "tool-call" && part.name === "searchWeb"
      )
      .flatMap((part) => part.output?.sources ?? [])
      .filter(
        (part, index, all) =>
          all.findIndex((other) => other.url === part.url) === index
      )

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
            {#if getMessageText(message)}
              <p>
                {getMessageText(message)}
              </p>
            {/if}
            {#if sourcesOf(message).length > 0}
              <Sources sources={sourcesOf(message)} />
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
