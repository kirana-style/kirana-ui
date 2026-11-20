# Checkpoint

<!-- ::preview item="checkpoint-demo" height="410" combinations="angular/kirana" runtimes="ai-sdk,tanstack-ai" -->

Checkpoint is a point in the conversation you can return to. It is a [Marker](/docs/components/marker) after a turn, with a Restore button. Restore keeps that turn and drops every message after it.

## Installation

Checkpoint is built with the [Marker](/docs/components/marker) and [Button](/docs/components/button) components.

<!-- ::installation name="marker button" combinations="angular/kirana" -->

## Usage

Render a marker after the turn, with a button that restores it.

See [Marker](/docs/components/marker#separator).

The code under the preview is the whole example, in one file.

## In a Chat

Restore replaces the thread with the messages up to and including that turn: assign `chat.messages` on the AI SDK's `Chat`, or call `setMessages` on TanStack AI's `injectChat`. Every later turn is removed. Send a new message to continue from there.

```ts showLineNumbers
const index = messages.findIndex((message) => message.id === messageId)
setMessages(messages.slice(0, index + 1))
```

## Helpers

<!-- ::start:runtime ai-sdk -->

To script a checkpoint with [`createChat`](/docs/helpers/ai-sdk) (`@shadcn/helpers`), write it as a data part on the agent's turn. Send the same `id` again only when you mean to update that checkpoint.

```ts showLineNumbers
const chat = createChat()
  .user("Rename the button component to action.")
  .assistant(({ writer }) => {
    writer.text("Renamed Button to Action in components/ui/button.tsx.")
    writer.data({
      type: "data-checkpoint",
      id: "rename",
      data: { label: "Button renamed" },
    })
  })
  .user("Update the docs to match.")
  .assistant(({ writer }) => {
    writer.text("Updated the Button page to say Action.")
  })
```

<!-- ::end:runtime -->

<!-- ::start:runtime tanstack-ai -->

The [TanStack AI helper](/docs/helpers/tanstack-ai) (`@shadcn/helpers`) streams no data parts, so the agent marks the checkpoint with a tool, and the marker reads the call's input.

```ts showLineNumbers
const saveCheckpoint = toolDefinition({
  name: "saveCheckpoint",
  description: "Mark a point the conversation can be restored to.",
  inputSchema: z.object({ label: z.string() }),
  outputSchema: z.string(),
})

const tools = clientTools(saveCheckpoint)

const chat = createChat<typeof tools>()
  .user("Rename the button component to action.")
  .assistant(({ writer }) => {
    writer.text("Renamed Button to Action in components/ui/button.tsx.")
    writer
      .tool("saveCheckpoint", { input: { label: "Button renamed" } })
      .output("Saved the checkpoint.")
  })
  .user("Update the docs to match.")
  .assistant(({ writer }) => {
    writer.text("Updated the Button page to say Action.")
  })
```

```ts showLineNumbers
const checkpoint = message.parts
  .filter((part) => part.type === "tool-call")
  .find((part) => part.name === "saveCheckpoint")?.input
```

<!-- ::end:runtime -->
