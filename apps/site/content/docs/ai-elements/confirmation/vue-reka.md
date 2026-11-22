# Confirmation

<!-- ::preview item="confirmation-demo" height="410" combinations="vue/reka" runtimes="ai-sdk,tanstack-ai" -->

Confirmation asks the person for a yes or no before a tool runs. The question is an [Item](/docs/components/item) with Deny and Approve buttons. Once the person answers, the call becomes a [Tool](/docs/ai-elements/tool) line.

## Installation

Confirmation is built with the [Item](/docs/components/item) and [Button](/docs/components/button) components.

<!-- ::installation name="item button" combinations="vue/reka" runtimes="ai-sdk,tanstack-ai" -->

## Usage

The code under the preview is the whole example, in one file.

## In a Chat

<!-- ::start:runtime ai-sdk -->

While the part is `approval-requested`, answer with the approval id. Pass `sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithApprovalResponses` so the chat continues once every approval has an answer.

```ts showLineNumbers
addToolApprovalResponse({
  id: part.approval.id,
  approved: true,
})
```

```ts showLineNumbers
useChat({
  sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithApprovalResponses,
})
```

Approve streams the tool output. Deny streams `output-denied`. Either way, the part becomes a Tool line.

See [Tool](/docs/ai-elements/tool#approval).

<!-- ::end:runtime -->

<!-- ::start:runtime tanstack-ai -->

Give the tool `needsApproval: true` and pass it to `useChat` in `tools`. While its call waits, it is a `tool-approval` among `useChat`'s `interrupts`: answer it with `resolveInterrupt`. The chat continues on its own once every interrupt has an answer.

```ts showLineNumbers
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

```ts showLineNumbers
const approval = interrupts.value.find(
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

The [TanStack AI helper](/docs/helpers/tanstack-ai) (`@shadcn/helpers`) cannot script an approval: its connection carries no interrupt. Script the call with no output and give the client the tool with `needsApproval`, as above. The client asks, runs the tool once approved, and the next agent turn reads the answer from the transcript: a denied call ends in `error`.

```ts showLineNumbers
const chat = createChat<typeof tools>()
  .user("Clean up the build folder.")
  .assistant(({ writer }) => {
    writer.tool("runCommand", { input: { command: "rm -rf dist" } })
  })
  .assistant(({ writer, messages = [] }) => {
    const approved = messages.some((message) =>
      message.parts.some(
        (part) => part.type === "tool-call" && part.state === "complete"
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
