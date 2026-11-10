# Checkpoint

<!-- ::preview item="checkpoint-demo" height="410" combinations="vue/reka" -->

Checkpoint is a point in the conversation you can return to. It is a [Marker](/docs/components/marker) after a turn, with a Restore button. Restore keeps that turn and drops every message after it.

## Installation

Checkpoint is built with the [Marker](/docs/components/marker) and [Button](/docs/components/button) components.

<!-- ::installation name="marker button" combinations="vue/reka" -->

## Usage

Render a marker after the turn, with a button that restores it.

See [Marker](/docs/components/marker#separator).

The code under the preview is the whole example, in one file.

## AI SDK

Restore replaces the thread with the messages up to and including that turn. Every later turn is removed. Send a new message to continue from there.

```ts showLineNumbers
const index = messages.findIndex((message) => message.id === messageId)
setMessages(messages.slice(0, index + 1))
```

## AI SDK Helper

To script a checkpoint with [`createChat`](https://ui.shadcn.com/docs/helpers/ai-sdk) (`@shadcn/helpers`), write it as a data part on the agent's turn. Send the same `id` again only when you mean to update that checkpoint.

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
