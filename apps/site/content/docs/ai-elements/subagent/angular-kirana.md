# Subagent

<!-- ::preview item="subagent-demo" height="710" combinations="angular/kirana" runtimes="ai-sdk,tanstack-ai" -->

Subagent is a line for work the agent hands to a subagent. The run is the title, like "Ran the research agent". Open it for the tool calls the subagent made and what it found.

Subagent is built with `Trace` with a `TraceCollapsible` for the run and a nested `Trace` for its tool calls.

## Installation

Subagent is built with the [Trace](/docs/components/trace), [Code Block](/docs/components/code-block) and [Badge](/docs/components/badge) components.

<!-- ::installation name="trace code-block badge" combinations="angular/kirana" -->

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

<!-- ::demo-source item="subagent-demo" parts="true" combinations="angular/kirana" -->

## Running

While the subagent runs, the line has `status="running"` and its content shows the tool calls so far. Add the result when the subagent finishes.

<!-- ::preview item="subagent-running" height="200" combinations="angular/kirana" -->

## Details

Put the task the subagent was given at the top of the content, with its model and tools as [Badge](/docs/components/badge) items. Show how long it ran in a `TraceDescription` after the title.

<!-- ::preview item="subagent-details" height="340" combinations="angular/kirana" -->

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

TanStack AI runs a subagent with `defineAgent` and streams it as a `subagent` part. Render the part as the line, from `part.subagent.status`, and the child's `part.subagent.messages` as the nested `Trace`. Map each nested tool call as in [Tool](/docs/ai-elements/tool#states).

| `part.subagent.status`                     | `TraceLine` status                 | Title           |
| ------------------------------------------ | ---------------------------------- | --------------- |
| `running`                                  | `"running"` while the chat streams | Running …       |
| `finished`                                 | none                               | Ran …           |
| `error`, or `running` after the chat stops | `"error"`                          | Failed to run … |

A `suspended` subagent waits on an interrupt, which the chat lists in `interrupts()`, as in [Confirmation](/docs/ai-elements/confirmation).

The demo's [TanStack AI helper](/docs/helpers/tanstack-ai) cannot stream a child agent, so there the subagent is a tool, and its steps arrive with its report in the tool's result.

<!-- ::end:runtime -->

## API Reference

See [Trace](/docs/components/trace#api-reference).
