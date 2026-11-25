<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { timeline } from "../../../../styles/timeline.styles"

  let {
    class: className,
    children,
    ...rest
  }: {
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<div data-slot="timeline-connector" aria-hidden="true" {...rest} class={className} sx={timeline.connector}>
  {@render children?.()}
</div>
