# Terminal

<!-- ::preview item="terminal-demo" height="710" combinations="vue/uisdk" runtimes="ai-sdk,tanstack-ai" -->

Terminal is a shell command the agent runs, such as a lint, a test run or a build. The line shows the command, and its output streams in underneath while it runs.

Terminal is built with `Trace` with a `TraceCollapsible` for each command.

## Installation

Terminal is built with the [Trace](/docs/components/trace) and [Code Block](/docs/components/code-block) components.

<!-- ::installation name="trace code-block" combinations="vue/uisdk" -->

## Usage

```ts showLineNumbers
import { CodeBlock, CodeBlockContent } from "@/components/ui/code-block"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace"
```

The example draws each step with its own parts, which you copy beside it:

<!-- ::start:runtime ai-sdk -->

<!-- ::demo-source item="terminal-demo" parts="true" combinations="vue/uisdk" -->

<!-- ::end:runtime -->

<!-- ::start:runtime tanstack-ai -->

<!-- ::demo-source item="terminal-demo-tanstack-ai" parts="true" combinations="vue/uisdk" -->

<!-- ::end:runtime -->

## Exit Code

A command that exits with any code other than `0` failed. Set `status="error"`.

<!-- ::preview item="terminal-error" height="440" combinations="vue/uisdk" -->

| Command                  | `status`    | Title                        |
| ------------------------ | ----------- | ---------------------------- |
| Running                  | `"running"` | Running pnpm build           |
| Exited with `0`          | none        | Ran pnpm build               |
| Exited with another code | `"error"`   | pnpm lint exited with code 1 |

The command is a tool call, so its states map the same way as in [Tool](/docs/ai-elements/tool#states).

## Open While Running

Open the line once the first output arrives, so the output is visible while the command runs. Leave it open or closed after that, as in [Trace](/docs/components/trace#open-state).

## In a Chat

<!-- ::start:runtime ai-sdk -->

A tool result arrives only once the command exits. To stream the output while it runs, write it from the tool as a data part with the tool call's id. The AI SDK replaces a data part that has the same id, so the output grows in place.

```ts showLineNumbers
writer.write({
  type: "data-terminal",
  id: toolCallId,
  data: { output },
})
```

On the client, find the data part that matches each tool part.

```ts showLineNumbers
function getOutput(message: ChatMessage, toolCallId: string) {
  for (const part of message.parts) {
    if (part.type === "data-terminal" && part.id === toolCallId) {
      return part.data.output
    }
  }

  return ""
}
```

<!-- ::end:runtime -->

<!-- ::start:runtime tanstack-ai -->

A tool result arrives only once the command exits. TanStack AI streams no data parts: to stream the output while the command runs, emit it from the tool with `emitCustomEvent`, and keep it for each tool call from `useChat`'s `onCustomEvent`.

```ts showLineNumbers title="app/api/chat/route.ts"
const runCommand = runCommandDef.server(async ({ command }, context) => {
  const output = await run(command, (text) =>
    context?.emitCustomEvent("terminal", { output: text })
  )
  return { exitCode: output.exitCode, output: output.text }
})
```

```ts showLineNumbers
const outputs = ref<Record<string, string>>({})

useChat({
  connection,
  threadId,
  onCustomEvent: (eventType, data, { toolCallId }) => {
    if (eventType === "terminal" && toolCallId) {
      outputs.value[toolCallId] = (data as { output: string }).output
    }
  },
})
```

The [TanStack AI helper](/docs/helpers/tanstack-ai) (`@shadcn/helpers`) that the example runs on emits no custom events, so its output arrives with the result, once the command exits.

<!-- ::end:runtime -->

## API Reference

See [Trace](/docs/components/trace#api-reference).
