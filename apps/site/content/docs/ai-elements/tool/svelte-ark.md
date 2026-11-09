# Tool

<!-- ::preview item="tool-demo" height="490" combinations="svelte/ark" -->

Tool is a tool call the agent makes, such as running a command or reading a file. The line follows the call from input to output, including errors and calls that wait for approval.

Tool is built with `Trace` with a `TraceCollapsible` for each call that has output.

## Installation

Tool is built with the [Trace](/docs/components/trace) and [Code Block](/docs/components/code-block) components.

<!-- ::installation name="trace code-block" combinations="svelte/ark" -->

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
import type { UIDataTypes, UIMessage } from "ai"

export type ChatMessage = UIMessage<
  unknown,
  UIDataTypes,
  {
    runCommand: {
      input: { command: string }
      output: { stdout: string }
    }
  }
>

export type ToolPart = Extract<
  ChatMessage["parts"][number],
  { type: "tool-runCommand" }
>
```

```svelte showLineNumbers title="ToolRow.svelte"
<script lang="ts">
  import IconPlaceholder from "@/lib/kirana/icons/IconPlaceholder.svelte"
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
  import type { ToolPart } from "./types"

  let { part, streaming, defaultOpen }: {
    part: ToolPart
    streaming: boolean
    defaultOpen?: boolean
  } = $props()

  const styles = {
    toolRowCodeBlockContent: css({
      maxHeight: { "*": null, base: space[64] },
    }),
  }

  const command = $derived.by(() => part.input?.command)
</script>

{#if part.state === 'output-available' || part.state === 'output-error'}
  <TraceCollapsible defaultOpen={defaultOpen}>
    <TraceCollapsibleTrigger>
      <TraceLine status={part.state === 'output-error' ? 'error' : undefined}>
        <TraceIcon>
          <IconPlaceholder lucide="CommandIcon" tabler="IconCommand" hugeicons="CommandIcon" phosphor="CommandIcon" remixicon="RiCommandLine" />
        </TraceIcon>
        <TraceTitle>
          {part.state === "output-error" ? "Failed to run" : "Ran"} {command}
        </TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent>
      <CodeBlock size="sm">
        <CodeBlockContent wrap sx={styles.toolRowCodeBlockContent}>{part.state === "output-error" ? part.errorText : part.output.stdout}</CodeBlockContent>
      </CodeBlock>
    </TraceCollapsibleContent>
  </TraceCollapsible>
{:else}
  <TraceLine status={streaming ? 'running' : 'error'}>
    <TraceIcon>
      <IconPlaceholder lucide="CommandIcon" tabler="IconCommand" hugeicons="CommandIcon" phosphor="CommandIcon" remixicon="RiCommandLine" />
    </TraceIcon>
    <TraceTitle>
      {streaming ? "Running" : "Failed to run"} {command}
    </TraceTitle>
  </TraceLine>
{/if}
```

## States

Trace does not read tool parts. Map each part's `state` to a `status` and a title.

<!-- ::preview item="tool-states" height="300" combinations="svelte/ark" -->

| Tool part state                                           | `status`                             | Title                                                                |
| --------------------------------------------------------- | ------------------------------------ | -------------------------------------------------------------------- |
| `input-streaming`, `input-available`                      | `"running"` while the chat streams   | Running …                                                            |
| `input-streaming`, `input-available` after the chat stops | `"error"`                            | Failed to run …                                                      |
| `approval-requested`                                      | -                                    | Not a line. An `Item` outside `Trace` with Approve and Deny buttons. |
| `approval-responded`                                      | `"running"` if approved, none if not | Running … if approved, Denied … if not                               |
| `output-available`                                        | none                                 | Ran …                                                                |
| `output-error`                                            | `"error"`                            | Failed to run …                                                      |
| `output-denied`                                           | none                                 | Denied …                                                             |

A tool is a plain `TraceLine` while it runs, and a `TraceCollapsible` once its output arrives.

A tool that runs on the client stays `input-available` after the chat stops until you call `addToolOutput`. Treat it as waiting, not failed.

## Output in a Sheet

<!-- ::preview item="tool-sheet" height="410" combinations="svelte/ark" -->

See [Trace](/docs/components/trace#dialog).

## Approval

A pending approval is a question for the person, not a step the agent took, so it sits outside `Trace` as an `Item`. Once the person answers, the tool goes back to being a line. See [Confirmation](/docs/ai-elements/confirmation).

<!-- ::preview item="tool-approval" height="410" combinations="svelte/ark" -->

Pass `sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithApprovalResponses` to the `Chat` so the chat continues once every approval has an answer.

## API Reference

See [Trace](/docs/components/trace#api-reference).
