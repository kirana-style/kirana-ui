# Test Results

<!-- ::preview item="test-results-demo" runtimes="ai-sdk,tanstack-ai" height="690" combinations="svelte/kirana" -->

Test Results is a test run by the agent. The summary line counts what passed and failed. Open it to see each suite, its tests, and the error for each failure.

Test Results is built with `Trace` with a `TraceCollapsible` for the run and for each suite.

## Installation

Test Results is built with the [Trace](/docs/components/trace) and [Code Block](/docs/components/code-block) components.

<!-- ::installation name="trace code-block" combinations="svelte/kirana" -->

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

<!-- ::demo-source item="test-results-demo" parts="true" combinations="svelte/kirana" -->

<!-- ::end:runtime -->

<!-- ::start:runtime tanstack-ai -->

<!-- ::demo-source item="test-results-demo-tanstack-ai" parts="true" combinations="svelte/kirana" -->

<!-- ::end:runtime -->

## Suites

Group tests by file. Each suite is a collapsible line with a `Trace` of its tests. Open the suites that have a failure.

<!-- ::preview item="test-results-suites" height="600" combinations="svelte/kirana" -->

## In a Chat

<!-- ::start:runtime ai-sdk -->

Run the tests as a tool and render its output. The tool states map the same way as in [Tool](/docs/ai-elements/tool#states).

<!-- ::end:runtime -->

<!-- ::start:runtime tanstack-ai -->

Run the tests as a tool and render the output of its `tool-call` part. The tool states map the same way as in [Tool](/docs/ai-elements/tool#states).

<!-- ::end:runtime -->

## API Reference

See [Trace](/docs/components/trace#api-reference).
