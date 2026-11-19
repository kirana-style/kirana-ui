import { TestRow } from "./test-row"
import { For, createMemo, splitProps } from "solid-js"
import { IconPlaceholder } from "../../ui/icon-placeholder"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../../ui/trace"
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
