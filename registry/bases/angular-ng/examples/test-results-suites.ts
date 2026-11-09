import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../ui/trace"
import { TestRow } from "../components/test-results-suites/test-row"

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

@Component({
  selector: "test-results-suites",
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
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiTrace [sx]="styles.trace">
        <div kuiTraceCollapsible defaultOpen>
          <button kuiTraceCollapsibleTrigger>
            <span
              kuiTraceLine
              [status]="summary.failed > 0 ? 'error' : undefined"
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
                {{ formatCounts(summary) }}
              </span>
            </span>
          </button>
          <div kuiTraceCollapsibleContent keepMounted>
            <div kuiTrace>
              @for (suite of suites; track suite.name) {
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
      </div>
    </div>
  `,
})
export default class TestResultsSuites {
  protected readonly styles = styles
  protected readonly suites = suites
  protected readonly countTests = countTests
  protected readonly formatCounts = formatCounts
  protected readonly summary = summary
  protected readonly page = page
}
