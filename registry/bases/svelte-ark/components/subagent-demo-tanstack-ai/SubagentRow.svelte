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
  import { isStep } from "./types"
  import type { AgentPart } from "./types"

  let { part, streaming }: {
    part: AgentPart
    streaming: boolean
  } = $props()

  const styles = {
    subagentRowTraceCollapsibleContent: css({
      display: { "*": null, base: "flex" },
      flexDirection: { "*": null, base: "column" },
      gap: { "*": null, base: space[3] },
    }),
  }

  // The subagent's message arrives whole with the call's result.
  const done = $derived.by(() => part.state === "complete")
  const running = $derived.by(
    () => !done && part.state !== "error" && streaming
  )
  const parts = $derived.by(() => (done && part.output?.parts) || [])
  const report = $derived.by(() => parts
      .map((agentPart) => (agentPart.type === "text" ? agentPart.content : ""))
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
            agentPart.type === 'tool-call' ? agentPart.id : undefined
          )}
          {#if isStep(agentPart)}
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
