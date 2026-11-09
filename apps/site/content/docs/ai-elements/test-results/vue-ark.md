# Test Results

<!-- ::preview item="test-results-demo" height="690" combinations="vue/ark" -->

Test Results is a test run by the agent. The summary line counts what passed and failed. Open it to see each suite, its tests, and the error for each failure.

Test Results is built with `Trace` with a `TraceCollapsible` for the run and for each suite.

## Installation

Test Results is built with the [Trace](/docs/components/trace) and [Code Block](/docs/components/code-block) components.

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

```vue showLineNumbers title="TestResultsRow.vue"
<script setup lang="ts">
import { computed } from "vue"

import IconPlaceholder from "@/lib/kirana/icons/IconPlaceholder.vue"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace"
import TestRow from "./TestRow.vue"
import type { Test, ToolPart } from "./types"

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

const { part, streaming } = defineProps<{
  part: ToolPart
  streaming: boolean
}>()
const command = computed(() => part.input?.command)
const running = computed(() => streaming && part.state !== "output-error")
const summary = computed(() =>
  part.state === "output-available"
    ? countTests(part.output.suites.flatMap((suite) => suite.tests))
    : undefined
)
</script>

<template>
  <TraceLine
    v-if="part.state !== 'output-available'"
    :status="running ? 'running' : 'error'"
  >
    <TraceIcon>
      <IconPlaceholder
        lucide="FlaskConicalIcon"
        tabler="IconFlask"
        hugeicons="TestTube01Icon"
        phosphor="FlaskIcon"
        remixicon="RiFlaskLine"
      />
    </TraceIcon>
    <TraceTitle>
      {{ running ? "Running" : "Failed to run" }} {{ command }}
    </TraceTitle>
  </TraceLine>
  <TraceCollapsible v-else :default-open="summary!.failed > 0">
    <TraceCollapsibleTrigger>
      <TraceLine :status="summary!.failed > 0 ? 'error' : undefined">
        <TraceIcon>
          <IconPlaceholder
            lucide="FlaskConicalIcon"
            tabler="IconFlask"
            hugeicons="TestTube01Icon"
            phosphor="FlaskIcon"
            remixicon="RiFlaskLine"
          />
        </TraceIcon>
        <TraceTitle>Ran {{ formatCounts(summary!) }}</TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent keep-mounted>
      <Trace>
        <TraceCollapsible
          v-for="suite in part.output.suites"
          :key="suite.name"
          :default-open="countTests(suite.tests).failed > 0"
        >
          <TraceCollapsibleTrigger>
            <TraceLine
              :status="countTests(suite.tests).failed > 0 ? 'error' : undefined"
            >
              <TraceIcon>
                <IconPlaceholder
                  lucide="FileCodeIcon"
                  tabler="IconFileCode"
                  hugeicons="File01Icon"
                  phosphor="FileCodeIcon"
                  remixicon="RiFileCodeLine"
                />
              </TraceIcon>
              <TraceTitle>
                {{ suite.name }}, {{ formatCounts(countTests(suite.tests)) }}
              </TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent keep-mounted>
            <Trace>
              <TestRow
                v-for="test in suite.tests"
                :key="test.name"
                :test="test"
              />
            </Trace>
          </TraceCollapsibleContent>
        </TraceCollapsible>
      </Trace>
    </TraceCollapsibleContent>
  </TraceCollapsible>
</template>
```

```vue showLineNumbers title="TestRow.vue"
<script setup lang="ts">
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
import type { Test } from "./types"

const styles = {
  testRowCodeBlockContent: css({
    maxHeight: { "*": null, base: space[64] },
  }),
}

defineProps<{ test: Test }>()
</script>

<template>
  <TraceCollapsible v-if="test.status === 'failed'" default-open>
    <TraceCollapsibleTrigger>
      <TraceLine status="error">
        <TraceIcon>
          <IconPlaceholder
            lucide="XIcon"
            tabler="IconX"
            hugeicons="Cancel01Icon"
            phosphor="XIcon"
            remixicon="RiCloseLine"
          />
        </TraceIcon>
        <TraceTitle>{{ test.name }}</TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent>
      <CodeBlock size="sm">
        <CodeBlockContent wrap :sx="styles.testRowCodeBlockContent">{{
          test.error
        }}</CodeBlockContent>
      </CodeBlock>
    </TraceCollapsibleContent>
  </TraceCollapsible>
  <TraceLine v-else>
    <TraceIcon>
      <IconPlaceholder
        v-if="test.status === 'skipped'"
        lucide="CircleDashedIcon"
        tabler="IconCircleDashed"
        hugeicons="DashedLineCircleIcon"
        phosphor="CircleDashedIcon"
        remixicon="RiLoaderLine"
      />
      <IconPlaceholder
        v-else
        lucide="CheckIcon"
        tabler="IconCheck"
        hugeicons="Tick02Icon"
        phosphor="CheckIcon"
        remixicon="RiCheckLine"
      />
    </TraceIcon>
    <TraceTitle>{{
      test.status === "skipped" ? `Skipped ${test.name}` : test.name
    }}</TraceTitle>
  </TraceLine>
</template>
```

## Suites

Group tests by file. Each suite is a collapsible line with a `Trace` of its tests. Open the suites that have a failure.

<!-- ::preview item="test-results-suites" height="600" combinations="vue/ark" -->

## AI SDK

Run the tests as a tool and render its output. The tool states map the same way as in [Tool](/docs/ai-elements/tool#states).

## API Reference

See [Trace](/docs/components/trace#api-reference).
