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
  import type { Status, TaskPart } from "./types"

  let {
    task, streaming }: {
    task: TaskPart["data"]
    streaming: boolean
  } = $props()

  function getStepStatus(
    status: TaskPart["data"]["steps"][number]["status"],
    live: boolean
  ): Status {
    if (status === "done") {
      return undefined
    }

    return status === "running" && live ? "running" : "error"
  }

  let open = $state<boolean>()
  const steps = $derived.by(() => task.steps.map((step) => ({
      title: step.title,
      status: getStepStatus(step.status, streaming),
    }))
  )
  const status = $derived.by<Status>(() => steps.some((step) => step.status === "error")
      ? "error"
      : steps.some((step) => step.status === "running")
        ? "running"
        : undefined
  )
</script>

<TraceCollapsible open={open ?? status === 'running'} onOpenChange={(details: { open: boolean }) => (open = details.open)}>
  <TraceCollapsibleTrigger>
    <TraceLine status={status}>
      <TraceIcon>
        <StatusIcon status={status} />
      </TraceIcon>
      <TraceTitle>
        {task.title}
      </TraceTitle>
    </TraceLine>
  </TraceCollapsibleTrigger>
  <TraceCollapsibleContent keepMounted>
    <Trace>
      {#each steps as step (step.title)}
        <TraceLine status={step.status}>
          <TraceTitle>
            {step.title}
          </TraceTitle>
        </TraceLine>
      {/each}
    </Trace>
  </TraceCollapsibleContent>
</TraceCollapsible>
