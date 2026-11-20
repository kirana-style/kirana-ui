---
title: Checkpoint
description: Marks a point in the conversation you can return to.
section: ai-elements
variants:
  [
    react/kirana,
    react/base,
    react/aria,
    react/uisdk,
    vue/kirana,
    vue/ark,
    vue/reka,
    vue/uisdk,
    svelte/kirana,
    svelte/ark,
    svelte/bits,
    svelte/uisdk,
    solid/kirana,
    solid/ark,
    solid/uisdk,
    angular/kirana,
    angular/ng,
  ]
keywords: [checkpoint, ai elements, agent, chat]
---

# Checkpoint

<!-- ::preview item="checkpoint-demo" height="410" combinations="react/kirana,react/base,react/aria,react/uisdk,vue/kirana,vue/uisdk,svelte/kirana,svelte/uisdk,solid/kirana,solid/uisdk" runtimes="ai-sdk,tanstack-ai" -->

Checkpoint is a point in the conversation you can return to. It is a [Marker](/docs/components/marker) after a turn, with a Restore button. Restore keeps that turn and drops every message after it.

## Installation

Checkpoint is built with the [Marker](/docs/components/marker) and [Button](/docs/components/button) components.

<!-- ::installation name="marker button" combinations="react/kirana,react/base,react/aria,react/uisdk,vue/kirana,vue/uisdk,svelte/kirana,svelte/uisdk,solid/kirana,solid/uisdk,angular/kirana" -->

## Usage

Render a marker after the turn, with a button that restores it.

<!-- ::start:only react/kirana,react/base,react/uisdk -->

```tsx showLineNumbers
const styles = {
  content: css({ display: "inline-flex", alignItems: "center", gap: space[2] }),
}

<Marker variant="separator">
  <MarkerContent sx={styles.content}>
    {label}
    <Button size="xs" variant="outline" onClick={restore}>
      Restore
    </Button>
  </MarkerContent>
</Marker>
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx showLineNumbers
const styles = {
  content: css({ display: "inline-flex", alignItems: "center", gap: space[2] }),
}

<Marker variant="separator">
  <MarkerContent sx={styles.content}>
    {label}
    <Button size="xs" variant="outline" onPress={restore}>
      Restore
    </Button>
  </MarkerContent>
</Marker>
```

<!-- ::end:only -->

See [Marker](/docs/components/marker#separator).

## In a Chat

Restore replaces the thread with the messages up to and including that turn, through `setMessages`, which the AI SDK's `useChat` and TanStack AI's both return. Every later turn is removed. Send a new message to continue from there.

```tsx showLineNumbers
const index = messages.findIndex((message) => message.id === messageId)
setMessages(messages.slice(0, index + 1))
```

## Helpers

<!-- ::start:runtime ai-sdk -->

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

<!-- ::end:runtime -->

<!-- ::start:runtime tanstack-ai -->

The [TanStack AI helper](https://ui.shadcn.com/docs/helpers/tanstack-ai) (`@shadcn/helpers`) streams no data parts, so the agent marks the checkpoint with a tool, and the marker reads the call's input.

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

```tsx showLineNumbers
const checkpoint = message.parts.find(
  (part) => part.type === "tool-call" && part.name === "saveCheckpoint"
)?.input
```

<!-- ::end:runtime -->

## Migrating from AI SDK Elements

If you added Checkpoint from [AI SDK Elements](https://elements.ai-sdk.dev), your project has a `components/ai-elements/checkpoint.tsx` wrapper. Paste this prompt into your coding agent to rebuild it on Marker and Button. Every export keeps its name and props, so the code that uses it keeps working.

<!-- ::start:only react/kirana,react/base,react/uisdk -->

```txt title="Prompt" prompt
Migrate components/ai-elements/checkpoint.tsx from AI SDK Elements to kirana/ui's Marker and Button components.

Keep every export, with the same name and props, so the code that imports it keeps working. Only change how each part renders.

1. Install the components: npx kirana-style ui add marker button
2. Read https://ui.kirana.style/docs/ai-elements/react/base/checkpoint.md and build Checkpoint the same way.
3. Rebuild each part:
   - Checkpoint renders a Marker with variant="separator" and a MarkerContent, instead of a Separator.
   - CheckpointIcon renders a MarkerIcon.
   - CheckpointTrigger renders a Button with size="xs" and variant="outline", like "Restore". Keep its tooltip prop on the Tooltip.
4. Remove the imports the file no longer uses.
5. Run the type checker and fix any errors.
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```txt title="Prompt" prompt
Migrate components/ai-elements/checkpoint.tsx from AI SDK Elements to kirana/ui's Marker and Button components.

Keep every export, with the same name and props, so the code that imports it keeps working. Only change how each part renders.

1. Install the components: npx kirana-style ui add marker button
2. Read https://ui.kirana.style/docs/ai-elements/react/aria/checkpoint.md and build Checkpoint the same way.
3. Rebuild each part:
   - Checkpoint renders a Marker with variant="separator" and a MarkerContent, instead of a Separator.
   - CheckpointIcon renders a MarkerIcon.
   - CheckpointTrigger renders a Button with size="xs" and variant="outline", like "Restore". Keep its tooltip prop on the Tooltip.
4. Remove the imports the file no longer uses.
5. Run the type checker and fix any errors.
```

<!-- ::end:only -->
