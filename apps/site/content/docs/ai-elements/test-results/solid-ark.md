# Test Results

<!-- ::preview item="test-results-demo" height="690" combinations="solid/ark" -->

Test Results is a test run by the agent. The summary line counts what passed and failed. Open it to see each suite, its tests, and the error for each failure.

Test Results is built with `Trace` with a `TraceCollapsible` for the run and for each suite.

## Installation

Test Results is built with the [Trace](/docs/components/trace) and [Code Block](/docs/components/code-block) components.

<!-- ::installation name="trace code-block" combinations="solid/ark" -->

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

```tsx showLineNumbers title="test-results-row.tsx"
import { TestRow } from "./test-row"
import { For, createMemo, splitProps } from "solid-js"
import { IconPlaceholder } from "@/components/ui/icon-placeholder"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace"
import type { Sx } from "@kirana-style/core"
import type { Test, ToolPart } from "./types"

export function TestResultsRow(props: {
  part: ToolPart
  streaming: boolean
  sx?: Sx
  class?: string
}) {
  const [local] = splitProps(props, ["part", "streaming", "sx", "class"])
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

  const command = createMemo(() => local.part.input?.command)
  const running = createMemo(
    () => local.streaming && local.part.state !== "output-error"
  )
  const summary = createMemo(() =>
    local.part.state === "output-available"
      ? countTests(local.part.output.suites.flatMap((suite) => suite.tests))
      : undefined
  )

  return (
    <>
      {local.part.state !== "output-available" ? (
        <TraceLine status={running() ? "running" : "error"}>
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
            {running() ? "Running" : "Failed to run"} {command()}
          </TraceTitle>
        </TraceLine>
      ) : (
        <TraceCollapsible defaultOpen={summary()!.failed > 0}>
          <TraceCollapsibleTrigger>
            <TraceLine status={summary()!.failed > 0 ? "error" : undefined}>
              <TraceIcon>
                <IconPlaceholder
                  lucide="FlaskConicalIcon"
                  tabler="IconFlask"
                  hugeicons="TestTube01Icon"
                  phosphor="FlaskIcon"
                  remixicon="RiFlaskLine"
                />
              </TraceIcon>
              <TraceTitle>Ran {formatCounts(summary()!)}</TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent keepMounted>
            <Trace>
              <For each={local.part.output.suites}>
                {(suite) => (
                  <TraceCollapsible
                    defaultOpen={countTests(suite.tests).failed > 0}
                  >
                    <TraceCollapsibleTrigger>
                      <TraceLine
                        status={
                          countTests(suite.tests).failed > 0
                            ? "error"
                            : undefined
                        }
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
                          {suite.name}, {formatCounts(countTests(suite.tests))}
                        </TraceTitle>
                      </TraceLine>
                    </TraceCollapsibleTrigger>
                    <TraceCollapsibleContent keepMounted>
                      <Trace>
                        <For each={suite.tests}>
                          {(test) => <TestRow test={test} />}
                        </For>
                      </Trace>
                    </TraceCollapsibleContent>
                  </TraceCollapsible>
                )}
              </For>
            </Trace>
          </TraceCollapsibleContent>
        </TraceCollapsible>
      )}
    </>
  )
}
```

```tsx showLineNumbers title="test-row.tsx"
import { splitProps } from "solid-js"
import { IconPlaceholder } from "@/components/ui/icon-placeholder"
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
import type { Sx } from "@kirana-style/core"
import type { Test } from "./types"

export function TestRow(props: { test: Test; sx?: Sx; class?: string }) {
  const [local] = splitProps(props, ["test", "sx", "class"])
  const styles = {
    testRowCodeBlockContent: css({
      maxHeight: { "*": null, base: space[64] },
    }),
  }

  return (
    <>
      {local.test.status === "failed" ? (
        <TraceCollapsible defaultOpen>
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
              <TraceTitle>{local.test.name}</TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent>
            <CodeBlock size="sm">
              <CodeBlockContent wrap sx={styles.testRowCodeBlockContent}>
                {local.test.error}
              </CodeBlockContent>
            </CodeBlock>
          </TraceCollapsibleContent>
        </TraceCollapsible>
      ) : (
        <TraceLine>
          <TraceIcon>
            {local.test.status === "skipped" ? (
              <IconPlaceholder
                lucide="CircleDashedIcon"
                tabler="IconCircleDashed"
                hugeicons="DashedLineCircleIcon"
                phosphor="CircleDashedIcon"
                remixicon="RiLoaderLine"
              />
            ) : (
              <IconPlaceholder
                lucide="CheckIcon"
                tabler="IconCheck"
                hugeicons="Tick02Icon"
                phosphor="CheckIcon"
                remixicon="RiCheckLine"
              />
            )}
          </TraceIcon>
          <TraceTitle>
            {local.test.status === "skipped"
              ? `Skipped ${local.test.name}`
              : local.test.name}
          </TraceTitle>
        </TraceLine>
      )}
    </>
  )
}
```

## Suites

Group tests by file. Each suite is a collapsible line with a `Trace` of its tests. Open the suites that have a failure.

<!-- ::preview item="test-results-suites" height="600" combinations="solid/ark" -->

## AI SDK

Run the tests as a tool and render its output. The tool states map the same way as in [Tool](/docs/ai-elements/tool#states).

## API Reference

See [Trace](/docs/components/trace#api-reference).
