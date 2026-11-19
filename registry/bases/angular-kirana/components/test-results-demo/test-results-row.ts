import { Component, computed, input } from "@angular/core"
import type { Test, ToolPart } from "./types"
import { IconPlaceholder } from "../../../../icons/angular"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../../ui/trace"
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
