---
title: Confirmation
description: Asks for approval before a tool runs.
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
keywords: [confirmation, ai elements, agent, chat]
---

# Confirmation

<!-- ::preview item="confirmation-demo" height="410" combinations="react/kirana,react/base,react/aria,react/uisdk,vue/kirana,vue/uisdk,svelte/kirana,svelte/uisdk,solid/kirana,solid/uisdk" runtimes="ai-sdk,tanstack-ai" -->

Confirmation asks the person for a yes or no before a tool runs. The question is an [Item](/docs/components/item) with Deny and Approve buttons. Once the person answers, the call becomes a [Tool](/docs/ai-elements/tool) line.

## Installation

Confirmation is built with the [Item](/docs/components/item) and [Button](/docs/components/button) components.

<!-- ::installation name="item button" combinations="react/kirana,react/base,react/aria,react/uisdk,vue/kirana,vue/uisdk,svelte/kirana,svelte/uisdk,solid/kirana,solid/uisdk,angular/kirana" runtimes="ai-sdk,tanstack-ai" -->

## Usage

<!-- ::start:only react/kirana,react/base,react/uisdk -->

```tsx showLineNumbers
<Item variant="outline" size="sm">
  <ItemMedia variant="icon">
    <TerminalIcon />
  </ItemMedia>
  <ItemContent>
    <ItemTitle>Run {part.input.command}?</ItemTitle>
    <ItemDescription>The command runs in this project.</ItemDescription>
  </ItemContent>
  <ItemActions>
    <Button size="sm" variant="outline" onClick={deny}>
      Deny
    </Button>
    <Button size="sm" onClick={approve}>
      Approve
    </Button>
  </ItemActions>
</Item>
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx showLineNumbers
<Item variant="outline" size="sm">
  <ItemMedia variant="icon">
    <TerminalIcon />
  </ItemMedia>
  <ItemContent>
    <ItemTitle>Run {part.input.command}?</ItemTitle>
    <ItemDescription>The command runs in this project.</ItemDescription>
  </ItemContent>
  <ItemActions>
    <Button size="sm" variant="outline" onPress={deny}>
      Deny
    </Button>
    <Button size="sm" onPress={approve}>
      Approve
    </Button>
  </ItemActions>
</Item>
```

<!-- ::end:only -->

## In a Chat

<!-- ::start:runtime ai-sdk -->

While the part is `approval-requested`, answer with the approval id. Pass `sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithApprovalResponses` so the chat continues once every approval has an answer.

```tsx showLineNumbers
addToolApprovalResponse({
  id: part.approval.id,
  approved: true,
})
```

```tsx showLineNumbers
useChat({
  sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithApprovalResponses,
})
```

Approve streams the tool output. Deny streams `output-denied`. Either way, the part becomes a Tool line.

See [Tool](/docs/ai-elements/tool#approval).

<!-- ::end:runtime -->

<!-- ::start:runtime tanstack-ai -->

Give the tool `needsApproval: true` and pass it to `useChat` in `tools`. While its call waits, it is a `tool-approval` among `useChat`'s `interrupts`: answer it with `resolveInterrupt`. The chat continues on its own once every interrupt has an answer.

```tsx showLineNumbers
const runCommand = toolDefinition({
  name: "runCommand",
  description: "Run a shell command in the project.",
  inputSchema: z.object({ command: z.string() }),
  outputSchema: z.object({ stdout: z.string() }),
  needsApproval: true,
}).client(async ({ command }) => run(command))

const tools = clientTools(runCommand)

const { messages, interrupts } = useChat({ connection, threadId, tools })
```

```tsx showLineNumbers
const approval = interrupts.find(
  (interrupt) =>
    interrupt.kind === "tool-approval" && interrupt.toolCallId === part.id
)

if (approval?.kind === "tool-approval") {
  approval.resolveInterrupt(true)
}
```

Approve runs the tool. Deny ends the call in an error result. Either way, the part becomes a Tool line.

See [Tool](/docs/ai-elements/tool#approval).

<!-- ::end:runtime -->

## Helpers

<!-- ::start:runtime ai-sdk -->

To script an approval with [`createChat`](https://ui.shadcn.com/docs/helpers/ai-sdk) (`@shadcn/helpers`), set `needsApproval` on the tool. The `output` streams after approval, and the next agent turn reads `toolCall.approved`.

```ts showLineNumbers
const chat = createChat()
  .user("Clean up the build folder.")
  .assistant(({ writer }) => {
    writer.tool("runCommand", {
      input: { command: "rm -rf dist" },
      needsApproval: true,
      output: { stdout: "" },
    })
  })
  .assistant(({ writer, toolCall }) => {
    writer.text(
      toolCall?.approved
        ? "Removed the dist folder."
        : "Okay, I left the dist folder in place."
    )
  })
```

<!-- ::end:runtime -->

<!-- ::start:runtime tanstack-ai -->

The [TanStack AI helper](https://ui.shadcn.com/docs/helpers/tanstack-ai) (`@shadcn/helpers`) cannot script an approval: its connection carries no interrupt. Script the call with no output and give the client the tool with `needsApproval`, as above. The client asks, runs the tool once approved, and the next agent turn reads the answer from the transcript.

```ts showLineNumbers
const chat = createChat<typeof tools>()
  .user("Clean up the build folder.")
  .assistant(({ writer }) => {
    writer.tool("runCommand", { input: { command: "rm -rf dist" } })
  })
  .assistant(({ writer, messages = [], toolCall }) => {
    const approved = messages.some((message) =>
      message.parts.some(
        (part) =>
          part.type === "tool-call" &&
          part.id === toolCall?.toolCallId &&
          part.state === "complete"
      )
    )
    writer.text(
      approved
        ? "Removed the dist folder."
        : "Okay, I left the dist folder in place."
    )
  })
```

<!-- ::end:runtime -->

## Migrating from AI SDK Elements

If you added Confirmation from [AI SDK Elements](https://elements.ai-sdk.dev), your project has a `components/ai-elements/confirmation.tsx` wrapper. Paste this prompt into your coding agent to rebuild it on Item and Button. Every export keeps its name and props, so the code that uses it keeps working.

<!-- ::start:only react/kirana,react/base,react/uisdk -->

```txt title="Prompt" prompt
Migrate components/ai-elements/confirmation.tsx from AI SDK Elements to Kirana UI's Item and Button components.

Keep every export, with the same name and props, so the code that imports it keeps working. Only change how each part renders.

1. Install the components: npx kirana-style ui add item button
2. Read https://ui.kirana.style/docs/ai-elements/react/base/confirmation.md and build Confirmation the same way.
3. Rebuild each part:
   - Confirmation renders an Item with variant="outline" and size="sm", instead of an Alert. Keep the approval and state props and the context they feed.
   - ConfirmationTitle renders an ItemContent with an ItemTitle.
   - ConfirmationActions renders an ItemActions.
   - ConfirmationAction renders a Button with size="sm".
   - Keep ConfirmationRequest, ConfirmationAccepted and ConfirmationRejected as they are.
4. Remove the imports the file no longer uses.
5. Run the type checker and fix any errors.
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```txt title="Prompt" prompt
Migrate components/ai-elements/confirmation.tsx from AI SDK Elements to Kirana UI's Item and Button components.

Keep every export, with the same name and props, so the code that imports it keeps working. Only change how each part renders.

1. Install the components: npx kirana-style ui add item button
2. Read https://ui.kirana.style/docs/ai-elements/react/aria/confirmation.md and build Confirmation the same way.
3. Rebuild each part:
   - Confirmation renders an Item with variant="outline" and size="sm", instead of an Alert. Keep the approval and state props and the context they feed.
   - ConfirmationTitle renders an ItemContent with an ItemTitle.
   - ConfirmationActions renders an ItemActions.
   - ConfirmationAction renders a Button with size="sm".
   - Keep ConfirmationRequest, ConfirmationAccepted and ConfirmationRejected as they are.
4. Remove the imports the file no longer uses.
5. Run the type checker and fix any errors.
```

<!-- ::end:only -->
