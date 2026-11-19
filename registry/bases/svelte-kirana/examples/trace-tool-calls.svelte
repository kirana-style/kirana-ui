<script lang="ts">
  import { Chat } from "@ai-sdk/svelte"
  import type { UIMessage } from "ai"

  import { createChat, getMessageText } from "../../../lib/ai"
  import ToolTrace from "../components/trace-tool-calls/ToolTrace.svelte"
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

  const chat = createChat()
    .user("Which package managers are installed?")
    .assistant(({ writer }) => {
      writer
        .tool("runCommand", {
          dynamic: true,
          input: { command: "node --version" },
        })
        .sleep(900)
        .output({ stdout: "v24.18.0" })
      writer
        .tool("runCommand", {
          dynamic: true,
          input: { command: "npm --version" },
        })
        .sleep(900)
        .output({ stdout: "11.6.2" })
      writer
        .tool("runCommand", {
          dynamic: true,
          input: { command: "pnpm --version" },
        })
        .sleep(900)
        .error("command not found: pnpm")
      writer.text("Node 24 and npm 11 are installed. pnpm is not.")
    })

  const initialMessages = chat.get(0)
  const transport = chat.transport({ delayMs: 20 })

  function groupParts(parts: UIMessage["parts"]) {
    const runs: { trace: boolean; parts: UIMessage["parts"] }[] = []

    for (const part of parts) {
      const trace = part.type === "dynamic-tool"

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

  const conversation = new Chat({
    messages: initialMessages,
    transport,
  })
  const nextMessage = $derived.by(() => chat.next(conversation.messages))
  const busy = $derived.by(
    () => conversation.status === "submitted" || conversation.status === "streaming"
  )
  const live = (message: UIMessage) =>
    conversation.status === "streaming" && message === conversation.messages.at(-1)

  function advance() {
    if (nextMessage) void conversation.sendMessage(nextMessage)
    else conversation.messages = initialMessages
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
                  {#each run.parts as part, index (part.type === 'dynamic-tool' ? part.toolCallId : index)}
                    {#if part.type === 'dynamic-tool'}
                      <ToolTrace part={part} live={live(message)} />
                    {/if}
                  {/each}
                </Trace>
              {:else}
                {#each run.parts as part, index (`${runIndex}-${index}`)}
                  {#if part.type === 'text'}
                    <p>
                      {part.text}
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
