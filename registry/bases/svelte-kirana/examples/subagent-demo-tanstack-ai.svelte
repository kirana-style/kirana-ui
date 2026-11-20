<script lang="ts">
  import { createChat } from "@tanstack/ai-svelte"
  import type { UIMessage } from "@tanstack/ai-svelte"
  import { isAgent } from "../components/subagent-demo-tanstack-ai/types"
  import {
    createChat as createScriptedChat,
    getMessageText,
  } from "../../../lib/tanstack-ai"
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
  import SubagentRow from "../components/subagent-demo-tanstack-ai/SubagentRow.svelte"

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

  /** The subagent's message once it is done: its own calls, then its report. */
  function getSubagentMessage(report: string): UIMessage {
    return {
      id: "research-agent",
      role: "assistant",
      parts: [
        ...steps.map((step, index) => ({
          type: "tool-call" as const,
          id: `step-${index}`,
          name: "runCommand",
          arguments: JSON.stringify({ command: step.command }),
          input: { command: step.command },
          state: "complete" as const,
          output: { stdout: step.stdout },
        })),
        { type: "text", content: report },
      ],
    }
  }

  // TanStack AI streams no preliminary output: the subagent's message arrives with the result.
  const chat = createScriptedChat()
    .user("Why does image optimization rerun on every deploy?")
    .assistant(({ writer }) => {
      writer
        .tool("researchAgent", {
          input: {
            task: "Find out why image optimization reruns on every deploy.",
          },
        })
        .sleep(600 + steps.length * 1000)
        .output(
          getSubagentMessage(
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

  const connection = chat.transport({ delayMs: 20 })

  const conversation = createChat({
    initialMessages: transcript,
    connection,
    threadId: "subagent-demo",
  })
  const busy = $derived.by(
    () => conversation.status === "submitted" || conversation.status === "streaming"
  )
  const streaming = (message: UIMessage) =>
    busy && message === conversation.messages.at(-1)
  const agentsOf = (message: UIMessage) => message.parts.filter(isAgent)

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
            {#if agentsOf(message).length > 0}
              <Trace>
                {#each agentsOf(message) as part (part.id)}
                  <SubagentRow part={part} streaming={streaming(message)} />
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
