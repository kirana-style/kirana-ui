<script lang="ts">


  import {
    Trace,
    TraceCollapsible,
    TraceCollapsibleContent,
    TraceCollapsibleTrigger,
    TraceIcon,
    TraceLine,
    TraceTitle,
  } from "../../ui/trace"
  import StatusIcon from "./StatusIcon.svelte"
  import StepRow from "./StepRow.svelte"
  import type { UIMessage } from "@tanstack/ai-svelte"
  import { resultOf } from "./types"
  import type { Status, StepPart } from "./types"

  let {
    message, steps, streaming, answering }: {
    message: UIMessage
    steps: StepPart[]
    streaming: boolean
    answering: boolean
  } = $props()

  let open = $state<boolean>()
  const running = $derived.by(() => streaming && !answering)
  const failed = $derived.by(
    () => steps.filter((part) => part.state === "error").length
  )
  const status = $derived.by<Status>(() => running ? "running" : failed > 0 ? "error" : undefined
  )
</script>

<Trace>
  <TraceCollapsible open={open ?? running} onOpenChange={(details: { open: boolean }) => (open = details.open)}>
    <TraceCollapsibleTrigger>
      <TraceLine status={status}>
        <TraceIcon>
          <StatusIcon status={status} />
        </TraceIcon>
        <TraceTitle>
          {running
              ? "Researching"
              : `Researched in ${steps.length} steps${failed > 0 ? `, ${failed} failed` : ""}`}
        </TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent keepMounted>
      <Trace>
        {#each steps as part (part.id)}
          <StepRow part={part} result={resultOf(message, part.id)} streaming={streaming} />
        {/each}
      </Trace>
    </TraceCollapsibleContent>
  </TraceCollapsible>
</Trace>
