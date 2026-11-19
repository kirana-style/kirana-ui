<script lang="ts">
  import { Chat } from "@ai-sdk/svelte"
  import type { ChatMessage, TaskPart } from "../components/task-demo/types"
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
  import TaskRow from "../components/task-demo/TaskRow.svelte"

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

  const TASKS = [
    {
      id: "find",
      title: ["Finding the project files", "Found the project files"],
      steps: [
        ["Searching for generateMetadata", "Searched for generateMetadata"],
        ["Reading app/layout.tsx", "Read app/layout.tsx"],
        ["Reading app/page.tsx", "Read app/page.tsx"],
      ],
    },
    {
      id: "update",
      title: ["Updating the page metadata", "Updated the page metadata"],
      steps: [
        ["Editing app/layout.tsx", "Edited app/layout.tsx"],
        ["Editing app/page.tsx", "Edited app/page.tsx"],
      ],
    },
  ]

  function taskAt(task: (typeof TASKS)[number], done: number) {
    return {
      title: task.title[done < task.steps.length ? 0 : 1],
      steps: task.steps.slice(0, done + 1).map(([running, finished], index) => ({
        title: index < done ? finished : running,
        status: index < done ? "done" : "running",
      })),
    } satisfies TaskPart["data"]
  }

  const chat = createChat<ChatMessage>()
    .user("Add Open Graph metadata to the home page.")
    .assistant(({ writer }) => {
      TASKS.forEach((task) => {
        for (let done = 0; done <= task.steps.length; done++) {
          writer
            .data({ type: "data-task", id: task.id, data: taskAt(task, done) })
            .sleep(900)
        }
      })
      writer.text(
        "Added Open Graph defaults to app/layout.tsx and a title, description and image for the home page in app/page.tsx."
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
  const tasksOf = (message: ChatMessage) =>
    message.parts.filter((part) => part.type === "data-task")

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
            {#if tasksOf(message).length > 0}
              <Trace>
                {#each tasksOf(message) as part (part.id)}
                  <TaskRow task={part.data} streaming={streaming(message)} />
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
