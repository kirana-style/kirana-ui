<script lang="ts">

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import {
    TraceCollapsible,
    TraceCollapsibleContent,
    TraceCollapsibleTrigger,
    TraceIcon,
    TraceLine,
    TraceTitle,
  } from "../../ui/trace"
  import { css, keyframes } from "@kirana-style/core"


  const spin = keyframes({ to: { transform: "rotate(360deg)" } })

  const styles = {
    reasoningRowIconPlaceholder: css({
      animationDuration: "1s",
      animationIterationCount: "infinite",
      animationName: spin,
      animationTimingFunction: "linear",
    }),
    reasoningRowTraceCollapsibleContent: css({
      whiteSpace: { "*": null, base: "pre-wrap" },
    }),
  }

  let { text, running }: { text: string; running: boolean } = $props()
  // Open while it runs, until the reader opens or closes it.
  let open = $state<boolean>()
</script>

<TraceCollapsible open={open ?? running} onOpenChange={(details: { open: boolean }) => (open = details.open)}>
  <TraceCollapsibleTrigger>
    <TraceLine status={running ? 'running' : undefined}>
      <TraceIcon>
        {#if running}
          <IconPlaceholder lucide="LoaderCircleIcon" tabler="IconLoader2" hugeicons="Loading03Icon" phosphor="CircleNotchIcon" remixicon="RiLoader4Line" sx={styles.reasoningRowIconPlaceholder} />
        {:else}
          <IconPlaceholder lucide="CircleCheckIcon" tabler="IconCircleCheckFilled" hugeicons="CheckmarkCircle01Icon" phosphor="CheckCircleIcon" remixicon="RiCheckboxCircleFill" />
        {/if}
      </TraceIcon>
      <TraceTitle>
        {running ? "Thinking" : "Thought"}
      </TraceTitle>
    </TraceLine>
  </TraceCollapsibleTrigger>
  <TraceCollapsibleContent sx={styles.reasoningRowTraceCollapsibleContent}>
    {text}
  </TraceCollapsibleContent>
</TraceCollapsible>
