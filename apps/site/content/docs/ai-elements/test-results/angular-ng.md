# Test Results

<!-- ::preview item="test-results-demo" height="690" combinations="angular/ng" -->

Test Results is a test run by the agent. The summary line counts what passed and failed. Open it to see each suite, its tests, and the error for each failure.

Test Results is built with `Trace` with a `TraceCollapsible` for the run and for each suite.

## Installation

Test Results is built with the [Trace](/docs/components/trace) and [Code Block](/docs/components/code-block) components.

<!-- ::installation name="trace code-block" combinations="angular/ng" -->

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

```ts showLineNumbers title="test-results-row.ts"
import { Component, computed, input } from "@angular/core"
import type { Test, ToolPart } from "./types"
import { IconPlaceholder } from "@/lib/kirana/icons/angular"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace"
import { TestRow } from "./test-row"

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

@Component({
  selector: "kui-test-results-row",
  imports: [
    TestRow,
    Trace,
    TraceCollapsible,
    TraceCollapsibleContent,
    TraceCollapsibleTrigger,
    TraceIcon,
    TraceLine,
    TraceTitle,
    IconPlaceholder,
  ],
  host: { style: "display: contents" },
  template: `
    @if (part().state !== "output-available") {
      <span kuiTraceLine [status]="running() ? 'running' : 'error'">
        <span kuiTraceIcon>
          <svg
            iconPlaceholder
            lucide="FlaskConicalIcon"
            tabler="IconFlask"
            hugeicons="TestTube01Icon"
            phosphor="FlaskIcon"
            remixicon="RiFlaskLine"
          ></svg>
        </span>
        <span kuiTraceTitle>
          {{ running() ? "Running" : "Failed to run" }}
          {{ command() }}
        </span>
      </span>
    } @else {
      <div kuiTraceCollapsible [defaultOpen]="summary()!.failed > 0">
        <button kuiTraceCollapsibleTrigger>
          <span
            kuiTraceLine
            [status]="summary()!.failed > 0 ? 'error' : undefined"
          >
            <span kuiTraceIcon>
              <svg
                iconPlaceholder
                lucide="FlaskConicalIcon"
                tabler="IconFlask"
                hugeicons="TestTube01Icon"
                phosphor="FlaskIcon"
                remixicon="RiFlaskLine"
              ></svg>
            </span>
            <span kuiTraceTitle>
              Ran
              {{ formatCounts(summary()!) }}
            </span>
          </span>
        </button>
        <div kuiTraceCollapsibleContent keepMounted>
          <div kuiTrace>
            @for (suite of suites(); track suite.name) {
              <div
                kuiTraceCollapsible
                [defaultOpen]="countTests(suite.tests).failed > 0"
              >
                <button kuiTraceCollapsibleTrigger>
                  <span
                    kuiTraceLine
                    [status]="
                      countTests(suite.tests).failed > 0 ? 'error' : undefined
                    "
                  >
                    <span kuiTraceIcon>
                      <svg
                        iconPlaceholder
                        lucide="FileCodeIcon"
                        tabler="IconFileCode"
                        hugeicons="File01Icon"
                        phosphor="FileCodeIcon"
                        remixicon="RiFileCodeLine"
                      ></svg>
                    </span>
                    <span kuiTraceTitle>
                      {{ suite.name }},
                      {{ formatCounts(countTests(suite.tests)) }}
                    </span>
                  </span>
                </button>
                <div kuiTraceCollapsibleContent keepMounted>
                  <div kuiTrace>
                    @for (test of suite.tests; track test.name) {
                      <kui-test-row [test]="test" />
                    }
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    }
  `,
})
export class TestResultsRow {
  readonly part = input.required<ToolPart>()
  readonly streaming = input.required<boolean>()
  protected readonly command = computed(() => this.part().input?.command)
  protected readonly running = computed(
    () => this.streaming() && this.part().state !== "output-error"
  )
  protected readonly summary = computed(() => {
    const part = this.part()
    return part.state === "output-available"
      ? countTests(part.output.suites.flatMap((suite) => suite.tests))
      : undefined
  })
  protected readonly suites = computed(() => {
    const part = this.part()
    return part.state === "output-available" ? part.output.suites : []
  })
  protected readonly countTests = countTests
  protected readonly formatCounts = formatCounts
}
```

```ts showLineNumbers title="test-row.ts"
import { Component, input } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "@/lib/kirana/scales"
import type { Test } from "./types"
import { IconPlaceholder } from "@/lib/kirana/icons/angular"
import { CodeBlock, CodeBlockContent } from "@/components/ui/code-block"
import {
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace"

const styles = {
  testRowCodeBlockContent: css({
    maxHeight: { "*": null, base: space[64] },
  }),
}

@Component({
  selector: "kui-test-row",
  imports: [
    CodeBlock,
    CodeBlockContent,
    TraceCollapsible,
    TraceCollapsibleContent,
    TraceCollapsibleTrigger,
    TraceIcon,
    TraceLine,
    TraceTitle,
    IconPlaceholder,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    @if (test().status === "failed") {
      <div kuiTraceCollapsible defaultOpen>
        <button kuiTraceCollapsibleTrigger>
          <span kuiTraceLine status="error">
            <span kuiTraceIcon>
              <svg
                iconPlaceholder
                lucide="XIcon"
                tabler="IconX"
                hugeicons="Cancel01Icon"
                phosphor="XIcon"
                remixicon="RiCloseLine"
              ></svg>
            </span>
            <span kuiTraceTitle>{{ test().name }}</span>
          </span>
        </button>
        <div kuiTraceCollapsibleContent>
          <div kuiCodeBlock size="sm">
            <pre
              kuiCodeBlockContent
              wrap
              [sx]="styles.testRowCodeBlockContent"
              >{{ test().error }}</pre>
          </div>
        </div>
      </div>
    } @else {
      <span kuiTraceLine>
        <span kuiTraceIcon>
          @if (test().status === "skipped") {
            <svg
              iconPlaceholder
              lucide="CircleDashedIcon"
              tabler="IconCircleDashed"
              hugeicons="DashedLineCircleIcon"
              phosphor="CircleDashedIcon"
              remixicon="RiLoaderLine"
            ></svg>
          } @else {
            <svg
              iconPlaceholder
              lucide="CheckIcon"
              tabler="IconCheck"
              hugeicons="Tick02Icon"
              phosphor="CheckIcon"
              remixicon="RiCheckLine"
            ></svg>
          }
        </span>
        <span kuiTraceTitle>{{
          test().status === "skipped"
            ? \`Skipped \${test().name}\`
            : test().name
        }}</span>
      </span>
    }
  `,
})
export class TestRow {
  readonly test = input.required<Test>()
  protected readonly styles = styles
}
```

## Suites

Group tests by file. Each suite is a collapsible line with a `Trace` of its tests. Open the suites that have a failure.

<!-- ::preview item="test-results-suites" height="600" combinations="angular/ng" -->

## AI SDK

Run the tests as a tool and render its output. The tool states map the same way as in [Tool](/docs/ai-elements/tool#states).

## API Reference

See [Trace](/docs/components/trace#api-reference).
