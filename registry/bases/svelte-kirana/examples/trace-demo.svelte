<script lang="ts">
  import { Chat } from "@ai-sdk/svelte"

  import { createChat, getMessageText } from "../../../lib/ai"
  import SourcesRow from "../components/trace-demo/SourcesRow.svelte"
  import ThinkingRow from "../components/trace-demo/ThinkingRow.svelte"
  import ToolRow from "../components/trace-demo/ToolRow.svelte"
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

  const conversation = new Chat<ChatMessage>({
    messages: transcript,
    transport,
  })
  const busy = $derived.by(
    () => conversation.status === "submitted" || conversation.status === "streaming"
  )

  type Source = Extract<Part, { type: "source-url" }>

  /** What each assistant message draws: its trace's rows and sources, and its text. */
  const replies = $derived.by(
    () =>
      new Map(
        conversation.messages.map((message) => [
          message.id,
          {
            streaming: busy && message === conversation.messages.at(-1),
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
  const reply = (message: ChatMessage) => replies.get(message.id)!

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
            {#if 
                reply(message).rows.length + reply(message).sources.length > 0
              }
              <Trace>
                {#each reply(message).rows as part, index (part.type === 'tool-runCommand' ? part.toolCallId : index)}
                  {#if part.type === 'reasoning'}
                    <ThinkingRow text={part.text} running={
                    reply(message).streaming && part.state === 'streaming'
                  } />
                  {:else if part.type === 'tool-runCommand'}
                    <ToolRow part={part} streaming={reply(message).streaming} defaultOpen={index === 2} />
                  {/if}
                {/each}
                {#if reply(message).sources.length > 0}
                  <SourcesRow sources={reply(message).sources} running={
                  reply(message).streaming && reply(message).text.length === 0
                } />
                {/if}
              </Trace>
            {/if}
            {#if reply(message).text}
              <p>
                {reply(message).text}
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
