# Confirmation

<!-- ::preview item="confirmation-demo" runtimes="ai-sdk,tanstack-ai" height="410" combinations="svelte/uisdk" -->

Confirmation asks the person for a yes or no before a tool runs. The question is an [Item](/docs/components/item) with Deny and Approve buttons. Once the person answers, the call becomes a [Tool](/docs/ai-elements/tool) line.

## Installation

Confirmation is built with the [Item](/docs/components/item) and [Button](/docs/components/button) components.

<!-- ::installation name="item button" combinations="svelte/uisdk" runtimes="ai-sdk,tanstack-ai" -->

## Usage

The code under the preview is the whole example, in one file.

## In a Chat

<!-- ::start:runtime ai-sdk -->

While the part is `approval-requested`, answer with the approval id. Pass `sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithApprovalResponses` so the chat continues once every approval has an answer.

```ts showLineNumbers
chat.addToolApprovalResponse({
  id: part.approval.id,
  approved: true,
})
```

```ts showLineNumbers
new Chat({
  sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithApprovalResponses,
})
```

Approve streams the tool output. Deny streams `output-denied`. Either way, the part becomes a Tool line.

See [Tool](/docs/ai-elements/tool#approval).

<!-- ::end:runtime -->

<!-- ::start:runtime tanstack-ai -->

Give the tool `needsApproval: true` and pass it to `createChat` in `tools`. The run then stops at the call, and the approval waits in `chat.interrupts`. Answer it, and the run continues on its own.

```ts showLineNumbers
for (const interrupt of chat.interrupts) {
  if (interrupt.kind === "tool-approval") interrupt.resolveInterrupt(true)
}
```

The scripted connection the example streams through cannot stop a run at an interrupt. Its call waits for a result instead, as a client tool's does, and the buttons answer with that result. Adding it continues the run.

```ts showLineNumbers
chat.addToolResult({
  toolCallId: part.id,
  tool: "runCommand",
  output: { approved: true },
})
```

Either way, the call becomes a Tool line.

See [Tool](/docs/ai-elements/tool#approval).

<!-- ::end:runtime -->

## Helpers

<!-- ::start:runtime ai-sdk -->

To script an approval with [`createChat`](/docs/helpers/ai-sdk) (`@shadcn/helpers`), set `needsApproval` on the tool. The `output` streams after approval, and the next agent turn reads `toolCall.approved`.

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

To script the question with [`createChat`](/docs/helpers/tanstack-ai) (`@shadcn/helpers/tanstack-ai`), write the call with no output. The next agent turn waits for the result, and reads it from the thread it receives.

```ts showLineNumbers
const chat = createChat()
  .user("Clean up the build folder.")
  .assistant(({ writer }) => {
    writer.tool("runCommand", { input: { command: "rm -rf dist" } })
  })
  .assistant(({ writer, messages = [] }) => {
    const call = messages
      .flatMap((message) => message.parts)
      .findLast((part) => part.type === "tool-call")
    writer.text(
      call?.output?.approved
        ? "Removed the dist folder."
        : "Okay, I left the dist folder in place."
    )
  })
```

<!-- ::end:runtime -->
