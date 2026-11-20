<script lang="ts">
  import { untrack } from "svelte"
  import {
    TraceCollapsible,
    TraceCollapsibleContent,
    TraceCollapsibleTrigger,
    TraceLine,
    TraceTitle,
  } from "../../ui/trace"
  import { css } from "@kirana-style/core"

  let { defaultOpen, text, running }: {
    text: string
    running: boolean
    defaultOpen?: boolean
  } = $props()

  const styles = {
    reasoningRowTraceCollapsibleContent: css({
      whiteSpace: { "*": null, base: "pre-wrap" },
    }),
  }

  // Open while it runs, until the reader opens or closes it.
  let open = $state(untrack(() => defaultOpen))
</script>

{#if text.length === 0}
  <TraceLine status={running ? 'running' : undefined}>
    <TraceTitle>
      {running ? "Thinking" : "Thought for 5s"}
    </TraceTitle>
  </TraceLine>
{:else}
  <TraceCollapsible open={open ?? running} onOpenChange={(details: { open: boolean }) => (open = details.open)}>
    <TraceCollapsibleTrigger>
      <TraceLine status={running ? 'running' : undefined}>
        <TraceTitle>
          {running ? "Thinking" : "Thought for 5s"}
        </TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent sx={styles.reasoningRowTraceCollapsibleContent}>
      {text}
    </TraceCollapsibleContent>
  </TraceCollapsible>
{/if}
