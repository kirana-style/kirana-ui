# Test Results

<!-- ::preview item="test-results-demo" height="690" combinations="svelte/ark" -->

Test Results is a test run by the agent. The summary line counts what passed and failed. Open it to see each suite, its tests, and the error for each failure.

Test Results is built with `Trace` with a `TraceCollapsible` for the run and for each suite.

## Installation

Test Results is built with the [Trace](/docs/components/trace) and [Code Block](/docs/components/code-block) components.

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

export type Test = {
  name: string
  status: "passed" | "failed" | "skipped"
  error?: string
}

export type ChatMessage = UIMessage<
  unknown,
  UIDataTypes,
  {
    runTests: {
      input: { command: string }
      output: { suites: { name: string; tests: Test[] }[] }
    }
  }
>

export type ToolPart = Extract<
  ChatMessage["parts"][number],
  { type: "tool-runTests" }
>
```

```svelte showLineNumbers title="TestResultsRow.svelte"
<script lang="ts">
  import IconPlaceholder from "@/lib/kirana/icons/IconPlaceholder.svelte"
  import {
    Trace,
    TraceCollapsible,
    TraceCollapsibleContent,
    TraceCollapsibleTrigger,
    TraceIcon,
    TraceLine,
    TraceTitle,
  } from "@/components/ui/trace"
  import TestRow from "./TestRow.svelte"
  import type { Test, ToolPart } from "./types"

  let { part, streaming }: {
    part: ToolPart
    streaming: boolean
  } = $props()

  function countTests(tests: Test[]) {
    return {
      total: tests.length,
      failed: tests.filter((test) => test.status === "failed").length,
      skipped: tests.filter((test) => test.status === "skipped").length,
    }
  }

  function formatCounts({
    total,
    failed,
    skipped,
  }: ReturnType<typeof countTests>) {
    return [
      `${total} tests`,
      failed > 0 && `${failed} failed`,
      skipped > 0 && `${skipped} skipped`,
    ]
      .filter(Boolean)
      .join(", ")
  }

  const command = $derived.by(() => part.input?.command)
  const running = $derived.by(() => streaming && part.state !== "output-error")
  const summary = $derived.by(() => part.state === "output-available"
      ? countTests(part.output.suites.flatMap((suite) => suite.tests))
      : undefined
  )
</script>

{#if part.state !== 'output-available'}
  <TraceLine status={running ? 'running' : 'error'}>
    <TraceIcon>
      <IconPlaceholder lucide="FlaskConicalIcon" tabler="IconFlask" hugeicons="TestTube01Icon" phosphor="FlaskIcon" remixicon="RiFlaskLine" />
    </TraceIcon>
    <TraceTitle>
      {running ? "Running" : "Failed to run"} {command}
    </TraceTitle>
  </TraceLine>
{:else}
  <TraceCollapsible defaultOpen={summary!.failed > 0}>
    <TraceCollapsibleTrigger>
      <TraceLine status={summary!.failed > 0 ? 'error' : undefined}>
        <TraceIcon>
          <IconPlaceholder lucide="FlaskConicalIcon" tabler="IconFlask" hugeicons="TestTube01Icon" phosphor="FlaskIcon" remixicon="RiFlaskLine" />
        </TraceIcon>
        <TraceTitle>
          Ran {formatCounts(summary!)}
        </TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent keepMounted>
      <Trace>
        {#each part.output.suites as suite (suite.name)}
          <TraceCollapsible defaultOpen={countTests(suite.tests).failed > 0}>
            <TraceCollapsibleTrigger>
              <TraceLine status={countTests(suite.tests).failed > 0 ? 'error' : undefined}>
                <TraceIcon>
                  <IconPlaceholder lucide="FileCodeIcon" tabler="IconFileCode" hugeicons="File01Icon" phosphor="FileCodeIcon" remixicon="RiFileCodeLine" />
                </TraceIcon>
                <TraceTitle>
                  {suite.name}, {formatCounts(countTests(suite.tests))}
                </TraceTitle>
              </TraceLine>
            </TraceCollapsibleTrigger>
            <TraceCollapsibleContent keepMounted>
              <Trace>
                {#each suite.tests as test (test.name)}
                  <TestRow test={test} />
                {/each}
              </Trace>
            </TraceCollapsibleContent>
          </TraceCollapsible>
        {/each}
      </Trace>
    </TraceCollapsibleContent>
  </TraceCollapsible>
{/if}
```

```svelte showLineNumbers title="TestRow.svelte"
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
  import type { Test } from "./types"

  const styles = {
    testRowCodeBlockContent: css({
      maxHeight: { "*": null, base: space[64] },
    }),
  }

  let { test }: { test: Test } = $props()
</script>

{#if test.status === 'failed'}
  <TraceCollapsible defaultOpen>
    <TraceCollapsibleTrigger>
      <TraceLine status="error">
        <TraceIcon>
          <IconPlaceholder lucide="XIcon" tabler="IconX" hugeicons="Cancel01Icon" phosphor="XIcon" remixicon="RiCloseLine" />
        </TraceIcon>
        <TraceTitle>
          {test.name}
        </TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent>
      <CodeBlock size="sm">
        <CodeBlockContent wrap sx={styles.testRowCodeBlockContent}>{test.error}</CodeBlockContent>
      </CodeBlock>
    </TraceCollapsibleContent>
  </TraceCollapsible>
{:else}
  <TraceLine>
    <TraceIcon>
      {#if test.status === 'skipped'}
        <IconPlaceholder lucide="CircleDashedIcon" tabler="IconCircleDashed" hugeicons="DashedLineCircleIcon" phosphor="CircleDashedIcon" remixicon="RiLoaderLine" />
      {:else}
        <IconPlaceholder lucide="CheckIcon" tabler="IconCheck" hugeicons="Tick02Icon" phosphor="CheckIcon" remixicon="RiCheckLine" />
      {/if}
    </TraceIcon>
    <TraceTitle>
      {test.status === "skipped" ? `Skipped ${test.name}` : test.name}
    </TraceTitle>
  </TraceLine>
{/if}
```

## Suites

Group tests by file. Each suite is a collapsible line with a `Trace` of its tests. Open the suites that have a failure.

<!-- ::preview item="test-results-suites" height="600" combinations="svelte/ark" -->

## AI SDK

Run the tests as a tool and render its output. The tool states map the same way as in [Tool](/docs/ai-elements/tool#states).

## API Reference

See [Trace](/docs/components/trace#api-reference).
