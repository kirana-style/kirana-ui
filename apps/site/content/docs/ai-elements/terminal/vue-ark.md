# Terminal

<!-- ::preview item="terminal-demo" height="710" combinations="vue/ark" -->

Terminal is a shell command the agent runs, such as a lint, a test run or a build. The line shows the command, and its output streams in underneath while it runs.

Terminal is built with `Trace` with a `TraceCollapsible` for each command.

## Installation

Terminal is built with the [Trace](/docs/components/trace) and [Code Block](/docs/components/code-block) components.

<!-- ::installation name="trace code-block" combinations="vue/ark" -->

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

```ts showLineNumbers title="types.ts"
import type { UIMessage } from "ai"

export type ChatMessage = UIMessage<
  unknown,
  {
    terminal: { output: string }
  },
  {
    runCommand: {
      input: { command: string }
      output: { exitCode: number }
    }
  }
>

export type ToolPart = Extract<
  ChatMessage["parts"][number],
  { type: "tool-runCommand" }
>
```

```vue showLineNumbers title="CommandRow.vue"
<script setup lang="ts">
import { computed, ref } from "vue"
import type { ToolPart } from "./types"
import IconPlaceholder from "@/lib/kirana/icons/IconPlaceholder.vue"
import { CodeBlock, CodeBlockContent } from "@/components/ui/code-block"
import {
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace"
import { css } from "@kirana-style/core"
import { space } from "@/lib/kirana/scales"

const styles = {
  commandRowCodeBlockContent: css({
    maxHeight: { "*": null, base: space[64] },
  }),
}

function getTitle(part: ToolPart, running: boolean) {
  const command = part.input?.command

  if (part.state === "output-available") {
    return part.output.exitCode === 0
      ? `Ran ${command}`
      : `${command} exited with code ${part.output.exitCode}`
  }

  return running ? `Running ${command}` : `Failed to run ${command}`
}

const { part, streaming, defaultOpen } = defineProps<{
  part: ToolPart
  output: string
  streaming: boolean
  defaultOpen?: boolean
}>()
const open = ref(defaultOpen)
const running = computed(
  () =>
    streaming &&
    (part.state === "input-streaming" || part.state === "input-available")
)
const failed = computed(
  () =>
    !running.value &&
    (part.state !== "output-available" || part.output.exitCode !== 0)
)
</script>

<template>
  <TraceCollapsible
    :open="open ?? (running && output.length > 0)"
    @open-change="(details: { open: boolean }) => (open = details.open)"
  >
    <TraceCollapsibleTrigger>
      <TraceLine :status="running ? 'running' : failed ? 'error' : undefined">
        <TraceIcon>
          <IconPlaceholder
            lucide="CommandIcon"
            tabler="IconCommand"
            hugeicons="CommandIcon"
            phosphor="CommandIcon"
            remixicon="RiCommandLine"
          />
        </TraceIcon>
        <TraceTitle>
          {{ getTitle(part, running) }}
        </TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent>
      <CodeBlock size="sm">
        <CodeBlockContent wrap :sx="styles.commandRowCodeBlockContent">{{
          part.state === "output-error" ? part.errorText : output
        }}</CodeBlockContent>
      </CodeBlock>
    </TraceCollapsibleContent>
  </TraceCollapsible>
</template>
```

## Exit Code

A command that exits with any code other than `0` failed. Set `status="error"`.

<!-- ::preview item="terminal-error" height="440" combinations="vue/ark" -->

| Command                  | `status`    | Title                        |
| ------------------------ | ----------- | ---------------------------- |
| Running                  | `"running"` | Running pnpm build           |
| Exited with `0`          | none        | Ran pnpm build               |
| Exited with another code | `"error"`   | pnpm lint exited with code 1 |

The command is a tool call, so its states map the same way as in [Tool](/docs/ai-elements/tool#states).

## Open While Running

Open the line once the first output arrives, so the output is visible while the command runs. Leave it open or closed after that, as in [Trace](/docs/components/trace#open-state).

## AI SDK

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

## API Reference

See [Trace](/docs/components/trace#api-reference).
