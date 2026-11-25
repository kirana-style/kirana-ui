<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { tour } from "../../../../styles/tour.styles"
  import { useTourShown } from "./context"

  /** The step's place in the tour, "1 of 3", unless given children. */
  let {
    class: className,
    children,
    ...rest
  }: {
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  const shown = useTourShown()
</script>

<span data-slot="tour-progress" {...rest} class={className} sx={tour.progress}>
  {#if children}
    {@render children()}
  {:else if shown()}
    {`${shown()?.current} of ${shown()?.total}`}
  {/if}
</span>
