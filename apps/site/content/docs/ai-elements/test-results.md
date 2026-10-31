---
title: Test Results
description: Displays a test run by the agent, with its suites and failures.
section: ai-elements
variants: [react/base, react/aria]
keywords: [test results, ai elements, agent, chat]
---

# Test Results

<!-- ::preview item="test-results-demo" height="690" combinations="react/base,react/aria" -->

Test Results is a test run by the agent. The summary line counts what passed and failed. Open it to see each suite, its tests, and the error for each failure.

Test Results is built with `Trace` with a `TraceCollapsible` for the run and for each suite.

## Installation

Test Results is built with the [Trace](/docs/components/trace) and [Code Block](/docs/components/code-block) components.

<!-- ::installation name="trace code-block" combinations="react/base,react/aria" -->

## Usage

```tsx showLineNumbers
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

```tsx showLineNumbers
const styles = {
  output: css({ maxHeight: space[64] }),
}

<Trace>
  <TraceCollapsible>
    <TraceCollapsibleTrigger>
      <TraceLine status="error">
        <TraceIcon>
          <FlaskConicalIcon />
        </TraceIcon>
        <TraceTitle>Ran 2 tests, 1 failed</TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent>
      <Trace>
        <TraceLine>
          <TraceIcon>
            <CheckIcon />
          </TraceIcon>
          <TraceTitle>creates a user</TraceTitle>
        </TraceLine>
        <TraceCollapsible>
          <TraceCollapsibleTrigger>
            <TraceLine status="error">
              <TraceIcon>
                <XIcon />
              </TraceIcon>
              <TraceTitle>updates a user profile</TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent>
            <CodeBlock size="sm">
              <CodeBlockContent wrap sx={styles.output}>
                Expected status 200, received 500
              </CodeBlockContent>
            </CodeBlock>
          </TraceCollapsibleContent>
        </TraceCollapsible>
      </Trace>
    </TraceCollapsibleContent>
  </TraceCollapsible>
</Trace>
```

## Suites

Group tests by file. Each suite is a collapsible line with a `Trace` of its tests. Open the suites that have a failure.

<!-- ::preview item="test-results-suites" height="600" combinations="react/base,react/aria" -->

<!-- ::start:only react/base -->

```tsx showLineNumbers
<TraceCollapsible defaultOpen={failed > 0}>
  <TraceCollapsibleTrigger>
    <TraceLine status={failed > 0 ? "error" : undefined}>
      <TraceIcon>
        <FileCodeIcon />
      </TraceIcon>
      <TraceTitle>user-api.test.ts, 14 tests, 2 failed</TraceTitle>
    </TraceLine>
  </TraceCollapsibleTrigger>
  <TraceCollapsibleContent>
    <Trace>…</Trace>
  </TraceCollapsibleContent>
</TraceCollapsible>
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx showLineNumbers
<TraceCollapsible defaultExpanded={failed > 0}>
  <TraceCollapsibleTrigger>
    <TraceLine status={failed > 0 ? "error" : undefined}>
      <TraceIcon>
        <FileCodeIcon />
      </TraceIcon>
      <TraceTitle>user-api.test.ts, 14 tests, 2 failed</TraceTitle>
    </TraceLine>
  </TraceCollapsibleTrigger>
  <TraceCollapsibleContent>
    <Trace>…</Trace>
  </TraceCollapsibleContent>
</TraceCollapsible>
```

<!-- ::end:only -->

## AI SDK

Run the tests as a tool and render its output. The tool states map the same way as in [Tool](/docs/ai-elements/tool#states).

<!-- ::start:only react/base -->

```tsx showLineNumbers
const tests = part.output.suites.flatMap((suite) => suite.tests)
const failed = tests.filter((test) => test.status === "failed").length

return (
  <TraceCollapsible defaultOpen={failed > 0}>
    <TraceCollapsibleTrigger>
      <TraceLine status={failed > 0 ? "error" : undefined}>
        <TraceIcon>
          <FlaskConicalIcon />
        </TraceIcon>
        <TraceTitle>
          Ran {tests.length} tests{failed > 0 && `, ${failed} failed`}
        </TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent>…</TraceCollapsibleContent>
  </TraceCollapsible>
)
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx showLineNumbers
const tests = part.output.suites.flatMap((suite) => suite.tests)
const failed = tests.filter((test) => test.status === "failed").length

return (
  <TraceCollapsible defaultExpanded={failed > 0}>
    <TraceCollapsibleTrigger>
      <TraceLine status={failed > 0 ? "error" : undefined}>
        <TraceIcon>
          <FlaskConicalIcon />
        </TraceIcon>
        <TraceTitle>
          Ran {tests.length} tests{failed > 0 && `, ${failed} failed`}
        </TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent>…</TraceCollapsibleContent>
  </TraceCollapsible>
)
```

<!-- ::end:only -->

## Migrating from AI SDK Elements

If you added Test Results from [AI SDK Elements](https://elements.ai-sdk.dev), your project has a `components/ai-elements/test-results.tsx` wrapper. Paste this prompt into your coding agent to rebuild it on Trace and Code Block. Every export keeps its name and props, so the code that uses it keeps working.

<!-- ::start:only react/base -->

```txt title="Prompt" prompt
Migrate components/ai-elements/test-results.tsx from AI SDK Elements to kirana/ui's Trace and Code Block components.

Keep every export, with the same name and props, so the code that imports it keeps working. Only change how each part renders.

1. Install the components: npx kirana-style ui add trace code-block
2. Read https://ui.kirana.style/docs/ai-elements/react/base/test-results.md and build Test Results the same way.
3. Rebuild each part:
   - Import CodeBlock and CodeBlockContent from @/components/ui/code-block, not from ./code-block.
   - TestResults renders a Trace with a TraceCollapsible. Keep summary.
   - TestResultsHeader renders a TraceCollapsibleTrigger with a TraceLine, and TestResultsSummary a TraceTitle with the counts, like "Ran 42 tests, 2 failed". Set status="error" when a test failed.
   - TestResultsContent renders a TraceCollapsibleContent with a Trace for the suites.
   - TestSuite renders a TraceCollapsible, open when it has a failure. TestSuiteName renders a TraceCollapsibleTrigger with a TraceLine, and TestSuiteContent a TraceCollapsibleContent with a Trace for the tests.
   - Test renders a TraceLine with a TraceTitle for its name. Set status="error" when it failed.
   - TestError renders a CodeBlock with size="sm", with TestErrorMessage and TestErrorStack in a CodeBlockContent.
   - Keep TestResultsDuration, TestResultsProgress, TestSuiteStats, TestName, TestDuration and TestStatus as they are.
4. Remove the imports the file no longer uses.
5. Run the type checker and fix any errors.
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```txt title="Prompt" prompt
Migrate components/ai-elements/test-results.tsx from AI SDK Elements to kirana/ui's Trace and Code Block components.

Keep every export, with the same name and props, so the code that imports it keeps working. Only change how each part renders.

1. Install the components: npx kirana-style ui add trace code-block
2. Read https://ui.kirana.style/docs/ai-elements/react/aria/test-results.md and build Test Results the same way.
3. Rebuild each part:
   - Import CodeBlock and CodeBlockContent from @/components/ui/code-block, not from ./code-block.
   - TestResults renders a Trace with a TraceCollapsible. Keep summary.
   - TestResultsHeader renders a TraceCollapsibleTrigger with a TraceLine, and TestResultsSummary a TraceTitle with the counts, like "Ran 42 tests, 2 failed". Set status="error" when a test failed.
   - TestResultsContent renders a TraceCollapsibleContent with a Trace for the suites.
   - TestSuite renders a TraceCollapsible, open when it has a failure. TestSuiteName renders a TraceCollapsibleTrigger with a TraceLine, and TestSuiteContent a TraceCollapsibleContent with a Trace for the tests.
   - Test renders a TraceLine with a TraceTitle for its name. Set status="error" when it failed.
   - TestError renders a CodeBlock with size="sm", with TestErrorMessage and TestErrorStack in a CodeBlockContent.
   - Keep TestResultsDuration, TestResultsProgress, TestSuiteStats, TestName, TestDuration and TestStatus as they are.
4. Remove the imports the file no longer uses.
5. Run the type checker and fix any errors.
```

<!-- ::end:only -->

## API Reference

See [Trace](/docs/components/trace#api-reference).
