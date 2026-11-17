<script lang="ts">
  import type { Snippet } from "svelte"

  import {
    TraceCollapsible,
    TraceCollapsibleContent,
    TraceCollapsibleTrigger,
    TraceIcon,
    TraceLine,
    TraceTitle,
  } from "../../ui/trace"
  import StatusIcon from "./StatusIcon.svelte"
  import type { Status } from "./types"


  /** A step: a line, or a collapsible line when it has `content` to show. */
  let { title, status, defaultOpen, content, children }: { title: string
    status?: Status
    defaultOpen?: boolean
    content: boolean
    children?: Snippet } = $props()
</script>

{#if content}
  <TraceCollapsible defaultOpen={defaultOpen}>
    <TraceCollapsibleTrigger>
      <TraceLine status={status}>
        <TraceIcon>
          <StatusIcon status={status} />
        </TraceIcon>
        <TraceTitle>
          {title}
        </TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent>
      {@render children?.()}
    </TraceCollapsibleContent>
  </TraceCollapsible>
{:else}
  <TraceLine status={status}>
    <TraceIcon>
      <StatusIcon status={status} />
    </TraceIcon>
    <TraceTitle>
      {title}
    </TraceTitle>
  </TraceLine>
{/if}
