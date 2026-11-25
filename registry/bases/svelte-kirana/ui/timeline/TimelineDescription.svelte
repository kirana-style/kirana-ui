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

<p data-slot="timeline-description" {...rest} class={className} sx={timeline.description}>
  {@render children?.()}
</p>
