<script lang="ts">
  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import {
    Trace,
    TraceCollapsible,
    TraceCollapsibleContent,
    TraceCollapsibleTrigger,
    TraceIcon,
    TraceLine,
    TraceTitle,
  } from "../../ui/trace"
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
