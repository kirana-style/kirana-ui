import { TestRow } from "../components/test-results-suites/test-row"
import { For } from "solid-js"
import { IconPlaceholder } from "../ui/icon-placeholder"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../ui/trace"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

export default function TestResultsSuites() {
  const styles = {
    trace: css({
      maxWidth: { "*": null, base: containerSize.sm },
    }),
  }

  type Test = {
    name: string
    status: "passed" | "failed" | "skipped"
    error?: string
  }

  const suites: { name: string; tests: Test[] }[] = [
    {
      name: "auth.test.ts",
      tests: [
        { name: "logs in with valid credentials", status: "passed" },
        { name: "rejects an invalid password", status: "passed" },
        { name: "refreshes an expired token", status: "passed" },
      ],
    },
    {
      name: "user-api.test.ts",
      tests: [
        { name: "creates a user", status: "passed" },
        {
          name: "updates a user profile",
          status: "failed",
          error: `Expected status 200, received 500

  at Object.<anonymous> (src/user-api.test.ts:45:12)`,
        },
        { name: "deletes a user", status: "skipped" },
      ],
    },
    {
      name: "db.test.ts",
      tests: [
        { name: "connects to the database", status: "passed" },
        {
          name: "times out a slow query",
          status: "failed",
          error: `Exceeded timeout of 5000 ms for a test.

  at Object.<anonymous> (src/db.test.ts:22:3)`,
        },
      ],
    },
  ]

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

  const summary = countTests(suites.flatMap((suite) => suite.tests))

  return (
    <div sx={page.example}>
      <Trace sx={styles.trace}>
        <TraceCollapsible defaultOpen>
          <TraceCollapsibleTrigger>
            <TraceLine status={summary.failed > 0 ? "error" : undefined}>
              <TraceIcon>
                <IconPlaceholder
                  lucide="FlaskConicalIcon"
                  tabler="IconFlask"
                  hugeicons="TestTube01Icon"
                  phosphor="FlaskIcon"
                  remixicon="RiFlaskLine"
                />
              </TraceIcon>
              <TraceTitle>Ran {formatCounts(summary)}</TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent keepMounted>
            <Trace>
              <For each={suites}>
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
      </Trace>
    </div>
  )
}
