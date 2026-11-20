<script lang="ts">
  import { createChat } from "@tanstack/ai-svelte"
  import type { UIMessage } from "@tanstack/ai-svelte"

  import {
    createChat as createScriptedChat,
    getMessageText,
  } from "../../../lib/tanstack-ai"
  import ToolTrace from "../components/trace-tool-calls-tanstack-ai/ToolTrace.svelte"
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
    .user("Which package managers are installed?")
    .assistant(({ writer }) => {
      writer
        .tool("runCommand", {
          input: { command: "node --version" },
        })
        .sleep(900)
        .output({ stdout: "v24.18.0" })
      writer
        .tool("runCommand", {
          input: { command: "npm --version" },
        })
        .sleep(900)
        .output({ stdout: "11.6.2" })
      writer
        .tool("runCommand", {
          input: { command: "pnpm --version" },
        })
        .sleep(900)
        .error("command not found: pnpm")
      writer.text("Node 24 and npm 11 are installed. pnpm is not.")
    })

  const initialMessages = chat.get(0)
  const connection = chat.transport({ delayMs: 20 })

  function groupParts(parts: UIMessage["parts"]) {
    const runs: { trace: boolean; parts: UIMessage["parts"] }[] = []

    for (const part of parts) {
      const trace = part.type === "tool-call"

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

  /** The result TanStack AI adds beside a call, which carries its error. */
  const resultOf = (message: UIMessage, toolCallId: string) =>
    message.parts.find(
      (part): part is Extract<typeof part, { type: "tool-result" }> =>
        part.type === "tool-result" && part.toolCallId === toolCallId
    )

  const conversation = createChat({
    initialMessages,
    connection,
    threadId: "trace-tool-calls",
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
                  {#each run.parts as part, index (part.type === 'tool-call' ? part.id : index)}
                    {#if part.type === 'tool-call'}
                      <ToolTrace part={part} result={resultOf(message, part.id)} live={live(message)} />
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
