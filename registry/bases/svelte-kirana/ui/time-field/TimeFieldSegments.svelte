<script lang="ts">
  import type { Snippet } from "svelte"
  import type { TimeFieldSegment as Segment } from "@kirana-ui/svelte"
  import { TimeField } from "@kirana-ui/svelte/time-field"

  import TimeFieldSegment from "./TimeFieldSegment.svelte"

  /** The time's segments, in the locale's order: each drawn as a `TimeFieldSegment` unless given a snippet. */
  let {
    children: draw,
  }: {
    children?: Snippet<[Segment]>
  } = $props()
</script>

<TimeField.Segments>
  {#snippet children(segment: Segment)}
    {#if draw}
      {@render draw(segment)}
    {:else}
      <TimeFieldSegment {segment} />
    {/if}
  {/snippet}
</TimeField.Segments>
