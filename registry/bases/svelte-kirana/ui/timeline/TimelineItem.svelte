<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { timeline } from "../../../../styles/timeline.styles"
  import TimelineConnector from "./TimelineConnector.svelte"

  /** An event: its marker and content, then the line to the next event, which the last one hides. */
  let {
    connector = true,
    class: className,
    children,
    ...rest
  }: {
    connector?: boolean
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<li data-slot="timeline-item" {...rest} class={className} sx={timeline.item}>
  {@render children?.()}
  {#if connector}
    <TimelineConnector />
  {/if}
</li>
