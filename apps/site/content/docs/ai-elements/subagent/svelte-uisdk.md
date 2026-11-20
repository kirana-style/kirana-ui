# Subagent

<!-- ::preview item="subagent-demo" runtimes="ai-sdk,tanstack-ai" height="710" combinations="svelte/uisdk" -->

Subagent is a line for work the agent hands to a subagent. The run is the title, like "Ran the research agent". Open it for the tool calls the subagent made and what it found.

Subagent is built with `Trace` with a `TraceCollapsible` for the run and a nested `Trace` for its tool calls.

## Installation

Subagent is built with the [Trace](/docs/components/trace), [Code Block](/docs/components/code-block) and [Badge](/docs/components/badge) components.

<!-- ::installation name="trace code-block badge" combinations="svelte/uisdk" runtimes="ai-sdk,tanstack-ai" -->

## Usage

```ts showLineNumbers
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

<!-- ::demo-source item="subagent-demo" parts="true" combinations="svelte/uisdk" -->

<!-- ::end:runtime -->

<!-- ::start:runtime tanstack-ai -->

<!-- ::demo-source item="subagent-demo-tanstack-ai" parts="true" combinations="svelte/uisdk" -->

<!-- ::end:runtime -->

## Running

While the subagent runs, the line has `status="running"` and its content shows the tool calls so far. Add the result when the subagent finishes.

<!-- ::preview item="subagent-running" height="200" combinations="svelte/uisdk" -->

## Details

Put the task the subagent was given at the top of the content, with its model and tools as [Badge](/docs/components/badge) items. Show how long it ran in a `TraceDescription` after the title.

<!-- ::preview item="subagent-details" height="340" combinations="svelte/uisdk" -->

## In a Chat

<!-- ::start:runtime ai-sdk -->

With the AI SDK, a subagent is a tool whose `execute` yields the subagent's `UIMessage` as it streams. Render the tool part as the line and `part.output.parts` as the nested `Trace`. Map each nested tool part as in [Tool](/docs/ai-elements/tool#states).

Each yield is a preliminary output: the part is `output-available` with `preliminary: true`. The final output replaces it, so check `preliminary` before you show "Ran".

| Tool part state                                         | `TraceLine` status                 | Title           |
| ------------------------------------------------------- | ---------------------------------- | --------------- |
| `input-streaming`, `input-available`                    | `"running"` while the chat streams | Running …       |
| `output-available` with `preliminary: true`             | `"running"` while the chat streams | Running …       |
| `output-available`                                      | none                               | Ran …           |
| `output-error`, or a running state after the chat stops | `"error"`                          | Failed to run … |

<!-- ::end:runtime -->

<!-- ::start:runtime tanstack-ai -->

TanStack AI streams a subagent (`defineAgent`) as a `subagent` part. Its `subagent.messages` grow as the subagent works, and `subagent.status` is `running`, `finished`, `error` or `suspended`. Render the part as the line and the parts of its messages as the nested `Trace`. Map each nested `tool-call` part as in [Tool](/docs/ai-elements/tool#states).

The scripted connection the example streams through cannot send a `subagent` part, nor a tool's output before it ends. Its subagent is a tool whose output is the subagent's whole message, so the line runs until that output arrives.

| `tool-call` state                                     | `TraceLine` status                 | Title           |
| ----------------------------------------------------- | ---------------------------------- | --------------- |
| `awaiting-input`, `input-streaming`, `input-complete` | `"running"` while the chat streams | Running …       |
| `complete`                                            | none                               | Ran …           |
| `error`, or a running state after the chat stops      | `"error"`                          | Failed to run … |

<!-- ::end:runtime -->

## API Reference

See [Trace](/docs/components/trace#api-reference).
