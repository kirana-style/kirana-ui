<script lang="ts">
  import ReasoningLine from "../components/tool-approval-tanstack-ai/ReasoningLine.svelte"
  import IconPlaceholder from "../../../icons/IconPlaceholder.svelte"
  import { createChat } from "@tanstack/ai-svelte"
  import type { UIMessage } from "@tanstack/ai-svelte"
  import {
    createChat as createScriptedChat,
    getMessageText,
  } from "../../../lib/tanstack-ai"
  import { Bubble, BubbleContent } from "../ui/bubble"
  import { Button } from "../ui/button"
  import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
  } from "../ui/item"
  import { Message, MessageContent } from "../ui/message"
  import { Trace, TraceIcon, TraceLine, TraceTitle } from "../ui/trace"
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

  type Part = UIMessage["parts"][number]

  /** A `runCommand` call: TanStack AI types a call by its tool's schemas, so this names them by hand. */
  type RunCommandPart = Omit<
    Extract<Part, { type: "tool-call" }>,
    "name" | "input" | "output"
  > & {
    name: "runCommand"
    input?: { command: string }
    output?: { approved: boolean }
  }

  const isRunCommand = (part: Part): part is RunCommandPart =>
    part.type === "tool-call" && part.name === "runCommand"

  /** Whether the reader approved the last command, as its call's output says. */
  const approved = (messages: UIMessage[] = []) =>
    messages
      .flatMap((message) => message.parts.filter(isRunCommand))
      .at(-1)?.output?.approved === true

  // A call with no result waits for the client, which answers it with the reader's decision
  // (`addToolResult`), and the run continues. TanStack AI's own approvals (`needsApproval`,
  // answered through `interrupts`) end a run with an interrupt, which the scripted connection
  // does not send.
  const chat = createScriptedChat()
    .user("Clean up the build folder.")
    .sleep(600)
    .assistant(({ writer }) => {
      writer.reasoning(
        "The build output lives in dist. Deleting it cannot be undone, so I should ask before I run the command."
      )
      writer.sleep(400)
      writer.tool("runCommand", { input: { command: "rm -rf dist" } })
    })
    .assistant(({ writer, messages }) => {
      writer.sleep(600)
      writer.text(
        approved(messages)
          ? "Removed the dist folder."
          : "Okay, I left the dist folder in place."
      )
    })

  const initialMessages = chat.get(0)
  const connection = chat.transport({ delayMs: 20 })

  const conversation = createChat({
    initialMessages,
    connection,
    threadId: "tool-approval",
  })
  const nextMessage = $derived.by(() => chat.next(conversation.messages))
  const busy = $derived.by(
    () => conversation.status === "submitted" || conversation.status === "streaming"
  )
  const streaming = (message: UIMessage) =>
    busy && message === conversation.messages.at(-1)
  // The call waits for an answer until it has an output.
  const waiting = (part: RunCommandPart) =>
    part.state === "input-complete" && part.output === undefined
  const denied = (part: RunCommandPart) => part.output?.approved === false

  function answer(part: RunCommandPart, approve: boolean) {
    void conversation.addToolResult({
      toolCallId: part.id,
      tool: "runCommand",
      output: { approved: approve },
    })
  }

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
            {#each message.parts as part, index (index)}
              {#if part.type === 'text'}
                <p>
                  {part.content}
                </p>
              {:else if part.type === 'thinking'}
                <Trace>
                  <ReasoningLine text={part.content} running={
                    streaming(message) && index === message.parts.length - 1
                  } />
                </Trace>
              {:else if isRunCommand(part)}
                <!-- A pending approval is a prompt, not activity, so it sits outside Trace. -->
                {#if waiting(part) && !streaming(message)}
                  <Item variant="outline" size="sm">
                    <ItemMedia variant="icon">
                      <IconPlaceholder lucide="CommandIcon" tabler="IconCommand" hugeicons="CommandIcon" phosphor="CommandIcon" remixicon="RiCommandLine" />
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>
                        Run {part.input?.command}?
                      </ItemTitle>
                      <ItemDescription>
                        The command runs in this project.
                      </ItemDescription>
                    </ItemContent>
                    <ItemActions>
                      <Button size="sm" variant="outline" onclick={() => answer(part, false)}>
                        Deny
                      </Button>
                      <Button size="sm" onclick={() => answer(part, true)}>
                        Approve
                      </Button>
                    </ItemActions>
                  </Item>
                {:else}
                  <Trace>
                    <TraceLine status={
                      !denied(part) && part.state !== 'complete'
                        ? 'running'
                        : undefined
                    }>
                      <TraceIcon>
                        <IconPlaceholder lucide="CommandIcon" tabler="IconCommand" hugeicons="CommandIcon" phosphor="CommandIcon" remixicon="RiCommandLine" />
                      </TraceIcon>
                      <TraceTitle>
                        {denied(part)
                          ? "Denied"
                          : part.state === "complete"
                            ? "Ran"
                            : "Running"} {part.input?.command}
                      </TraceTitle>
                    </TraceLine>
                  </Trace>
                {/if}
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
