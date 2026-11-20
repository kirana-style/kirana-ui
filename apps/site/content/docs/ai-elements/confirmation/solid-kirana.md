# Confirmation

<!-- ::preview item="confirmation-demo" runtimes="ai-sdk,tanstack-ai" height="410" combinations="solid/kirana" -->

Confirmation asks the person for a yes or no before a tool runs. The question is an [Item](/docs/components/item) with Deny and Approve buttons. Once the person answers, the call becomes a [Tool](/docs/ai-elements/tool) line.

## Installation

Confirmation is built with the [Item](/docs/components/item) and [Button](/docs/components/button) components.

<!-- ::installation name="item button" combinations="solid/kirana" -->

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

TanStack AI pauses the run at a tool defined with `needsApproval: true`, and `useChat` lists the pause in `interrupts()`. While it waits, the `tool-call` part is `approval-requested`. Answer the interrupt; the run goes on once every interrupt has an answer.

```ts showLineNumbers
interrupt.resolveInterrupt(true)
```

Once answered, the part is `approval-responded`, and `part.approval.approved` says how. Either way, the part becomes a Tool line.

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

The helper's TanStack AI writer cannot send an interrupt. To script the question with [`createChat`](/docs/helpers/tanstack-ai) (`@shadcn/helpers/tanstack-ai`), make the command a client tool instead: its `execute` waits for the person's answer and returns it as the output, the chat sends the result back, and the next agent turn reads it from `messages`.

```ts showLineNumbers
const runCommand = toolDefinition({
  name: "runCommand",
  description:
    "Run a shell command in the project, once the person approves it.",
  inputSchema: z.object({ command: z.string() }),
  outputSchema: z.object({ approved: z.boolean() }),
})
const tools = clientTools(
  runCommand.client(() => new Promise((resolve) => ask(resolve)))
)

const chat = createChat<typeof tools>()
  .user("Clean up the build folder.")
  .assistant(({ writer }) => {
    writer.tool("runCommand", { input: { command: "rm -rf dist" } })
  })
  .assistant(({ writer, messages }) => {
    const approved = messages
      ?.at(-1)
      ?.parts.some(
        (part) =>
          part.type === "tool-call" &&
          part.name === "runCommand" &&
          part.output?.approved
      )
    writer.text(
      approved
        ? "Removed the dist folder."
        : "Okay, I left the dist folder in place."
    )
  })
```

`ask` stands for the code that shows the question and calls `resolve({ approved })` when the person answers. Pass the same `tools` to `useChat`.

<!-- ::end:runtime -->
