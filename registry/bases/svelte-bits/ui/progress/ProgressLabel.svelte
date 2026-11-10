<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { progress } from "../../../../styles/progress.styles"

  // Bits UI has no label part: the element Base UI's label renders.
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

<span data-slot="progress-label" {...rest} class={className} sx={progress.label}>
  {@render children?.()}
</span>
