# Chain of Thought

<!-- ::preview item="chain-of-thought-demo" height="610" combinations="vue/kirana" runtimes="ai-sdk,tanstack-ai" -->

Chain of Thought is a summary line that expands into the steps an agent took. The summary says what happened, like "Researched in 3 steps". The steps sit inside it, each one a line of its own.

Chain of Thought is built with `Trace` with a `TraceCollapsible` for the summary.

## Installation

Chain of Thought is built with the [Trace](/docs/components/trace), [Code Block](/docs/components/code-block) and [Badge](/docs/components/badge) components.

<!-- ::installation name="trace code-block badge" combinations="vue/kirana" -->

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

<!-- ::demo-source item="chain-of-thought-demo" parts="true" combinations="vue/kirana" -->

<!-- ::end:runtime -->

<!-- ::start:runtime tanstack-ai -->

<!-- ::demo-source item="chain-of-thought-demo-tanstack-ai" parts="true" combinations="vue/kirana" -->

<!-- ::end:runtime -->

## Steps

Each step is a `TraceLine`. Set its `status` and write the title in the matching tense.

| Step              | `status`    | Title                         |
| ----------------- | ----------- | ----------------------------- |
| Running           | `"running"` | Searching for …               |
| Done, with detail | none        | Searched for …                |
| Done, links out   | none        | Read the Image component docs |
| Failed            | `"error"`   | Failed to search for …        |

## Search Results

When a step runs a web search, show the results as a `Badge` for each hostname in the step's content.

## In a Chat

<!-- ::start:runtime ai-sdk -->

Render each tool part as a step. `running` is true while tool parts stream and before the reply starts. Set the summary's status and title from the steps. The summary opens while the steps run, as in [Trace](/docs/components/trace#open-state).

`StepLine` renders one tool part as a `TraceLine`, as in [Tool](/docs/ai-elements/tool#states).

<!-- ::end:runtime -->

<!-- ::start:runtime tanstack-ai -->

Render each `tool-call` part as a step. Its result is a `tool-result` part of its own, whose `error` says why a call failed. `running` is true while tool calls stream and before the reply starts. Set the summary's status and title from the steps. The summary opens while the steps run, as in [Trace](/docs/components/trace#open-state).

```ts showLineNumbers
const failed = steps.filter((part) => part.state === "error").length
```

`StepLine` renders one tool call as a `TraceLine`, as in [Tool](/docs/ai-elements/tool#states).

<!-- ::end:runtime -->

## API Reference

See [Trace](/docs/components/trace#api-reference).
