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
  import { css } from "@kirana-style/core"

  let { text, running }: { text: string; running: boolean } = $props()

  const styles = {
    content: css({
      whiteSpace: { "*": null, base: "pre-wrap" },
    }),
  }

  // Open while it runs, until the reader opens or closes it.
  let open = $state<boolean>()
</script>

{#if text.length === 0}
  <TraceLine status={running ? 'running' : undefined}>
    <TraceIcon>
      <IconPlaceholder lucide="BrainIcon" tabler="IconBrain" hugeicons="AiBrainIcon" phosphor="BrainIcon" remixicon="RiBrainLine" />
    </TraceIcon>
    <TraceTitle>
      {running ? "Thinking" : "Thought"}
    </TraceTitle>
  </TraceLine>
{:else}
  <TraceCollapsible open={open ?? running} onOpenChange={(details: { open: boolean }) => (open = details.open)}>
    <TraceCollapsibleTrigger>
      <TraceLine status={running ? 'running' : undefined}>
        <TraceIcon>
          <IconPlaceholder lucide="BrainIcon" tabler="IconBrain" hugeicons="AiBrainIcon" phosphor="BrainIcon" remixicon="RiBrainLine" />
        </TraceIcon>
        <TraceTitle>
          {running ? "Thinking" : "Thought"}
        </TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent sx={styles.content}>
      {text}
    </TraceCollapsibleContent>
  </TraceCollapsible>
{/if}
