<script lang="ts" module>
  export type Plan = {
    title: string
    steps: { title: string; status: "done" | "running" | "pending" }[]
  }
</script>

<script lang="ts">

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import {
    Trace,
    TraceCollapsible,
    TraceCollapsibleContent,
    TraceCollapsibleTrigger,
    TraceDescription,
    TraceIcon,
    TraceLine,
    TraceTitle,
  } from "../../ui/trace"

  let { plan, streaming }: { plan: Plan; streaming: boolean } = $props()


  const done = $derived.by(
    () => plan.steps.filter((step) => step.status === "done").length
  )
  const running = $derived.by(() => streaming && done < plan.steps.length)
</script>

<TraceCollapsible defaultOpen>
  <TraceCollapsibleTrigger>
    <TraceLine status={running ? 'running' : undefined}>
      <TraceIcon>
        <IconPlaceholder lucide="RouteIcon" tabler="IconRoute" hugeicons="Route01Icon" phosphor="PathIcon" remixicon="RiRouteLine" />
      </TraceIcon>
      <TraceTitle>
        {plan.title}
      </TraceTitle>
      <TraceDescription>
        {done} of {plan.steps.length} done
      </TraceDescription>
    </TraceLine>
  </TraceCollapsibleTrigger>
  <TraceCollapsibleContent>
    <Trace>
      {#each plan.steps as step (step.title)}
        <TraceLine status={
            step.status === 'pending'
              ? 'pending'
              : streaming && step.status === 'running'
                ? 'running'
                : undefined
          }>
          <TraceIcon>
            {#if step.status === 'done'}
              <IconPlaceholder lucide="CircleCheckIcon" tabler="IconCircleCheckFilled" hugeicons="CheckmarkCircle01Icon" phosphor="CheckCircleIcon" remixicon="RiCheckboxCircleFill" />
            {:else}
              {#if step.status === 'running'}
                <IconPlaceholder lucide="CircleDotIcon" tabler="IconCircleDot" hugeicons="RecordIcon" phosphor="RecordIcon" remixicon="RiRecordCircleLine" />
              {:else}
                <IconPlaceholder lucide="CircleIcon" tabler="IconCircle" hugeicons="CircleIcon" phosphor="CircleIcon" remixicon="RiCheckboxBlankCircleLine" />
              {/if}
            {/if}
          </TraceIcon>
          <TraceTitle>
            {step.title}
          </TraceTitle>
        </TraceLine>
      {/each}
    </Trace>
  </TraceCollapsibleContent>
</TraceCollapsible>
