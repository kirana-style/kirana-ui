# Subagent

<!-- ::preview item="subagent-demo" height="710" combinations="vue/uisdk" runtimes="ai-sdk,tanstack-ai" -->

Subagent is a line for work the agent hands to a subagent. The run is the title, like "Ran the research agent". Open it for the tool calls the subagent made and what it found.

Subagent is built with `Trace` with a `TraceCollapsible` for the run and a nested `Trace` for its tool calls.

## Installation

Subagent is built with the [Trace](/docs/components/trace), [Code Block](/docs/components/code-block) and [Badge](/docs/components/badge) components.

<!-- ::installation name="trace code-block badge" combinations="vue/uisdk" runtimes="ai-sdk,tanstack-ai" -->

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

<!-- ::demo-source item="subagent-demo" parts="true" combinations="vue/uisdk" -->

<!-- ::end:runtime -->

<!-- ::start:runtime tanstack-ai -->

<!-- ::demo-source item="subagent-demo-tanstack-ai" parts="true" combinations="vue/uisdk" -->

<!-- ::end:runtime -->

## Running

While the subagent runs, the line has `status="running"` and its content shows the tool calls so far. Add the result when the subagent finishes.

<!-- ::preview item="subagent-running" height="200" combinations="vue/uisdk" -->

## Details

Put the task the subagent was given at the top of the content, with its model and tools as [Badge](/docs/components/badge) items. Show how long it ran in a `TraceDescription` after the title.

<!-- ::preview item="subagent-details" height="340" combinations="vue/uisdk" -->

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

A tool's result in TanStack AI carries no preliminary output, so a subagent run as a tool, `researchAgent` in this example, sends its steps with its report, once it finishes. Render the `tool-call` part as the line, running until the call is `complete`, and the steps of its `output` as the nested `Trace`.

```ts showLineNumbers
const researchAgent = toolDefinition({
  name: "researchAgent",
  description: "Hand a research task to a subagent.",
  inputSchema: z.object({ task: z.string() }),
  outputSchema: z.object({ steps: z.array(step), report: z.string() }),
})
```

| Tool call state                                       | `TraceLine` status                 | Title           |
| ----------------------------------------------------- | ---------------------------------- | --------------- |
| `awaiting-input`, `input-streaming`, `input-complete` | `"running"` while the chat streams | Running …       |
| `complete`                                            | none                               | Ran …           |
| `error`, or a running state after the chat stops      | `"error"`                          | Failed to run … |

<!-- ::end:runtime -->

## API Reference

See [Trace](/docs/components/trace#api-reference).
