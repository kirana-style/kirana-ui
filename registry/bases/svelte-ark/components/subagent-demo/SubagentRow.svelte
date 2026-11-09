<script lang="ts">

  import {
    Trace,
    TraceCollapsible,
    TraceCollapsibleContent,
    TraceCollapsibleTrigger,
  } from "../../ui/trace"
  import { css } from "@kirana-style/core"
  import { space } from "../../../../core/scales"
  import StepRow from "./StepRow.svelte"
  import SubagentLine from "./SubagentLine.svelte"
  import type { Part } from "./types"

  let { part, streaming }: {
    part: Extract<Part, { type: "tool-researchAgent" }>
    streaming: boolean
  } = $props()

  const styles = {
    subagentRowTraceCollapsibleContent: css({
      display: { "*": null, base: "flex" },
      flexDirection: { "*": null, base: "column" },
      gap: { "*": null, base: space[3] },
    }),
  }

  const done = $derived.by(
    () => part.state === "output-available" && !part.preliminary
  )
  const running = $derived.by(
    () => !done && part.state !== "output-error" && streaming
  )
  const parts = $derived.by(() => part.state === "output-available" ? part.output.parts : []
  )
  const report = $derived.by(() => parts
      .map((agentPart) => (agentPart.type === "text" ? agentPart.text : ""))
      .join("")
  )
</script>

{#if parts.length === 0}
  <SubagentLine done={done} running={running} />
{:else}
  <TraceCollapsible defaultOpen>
    <TraceCollapsibleTrigger>
      <SubagentLine done={done} running={running} />
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent keepMounted sx={styles.subagentRowTraceCollapsibleContent}>
      <Trace>
        {#each parts as agentPart (
            agentPart.type === 'tool-runCommand'
              ? agentPart.toolCallId
              : undefined
          )}
          {#if agentPart.type === 'tool-runCommand'}
            <StepRow part={agentPart} running={running} />
          {/if}
        {/each}
      </Trace>
      {#if report}
        <p>
          {report}
        </p>
      {/if}
    </TraceCollapsibleContent>
  </TraceCollapsible>
{/if}
