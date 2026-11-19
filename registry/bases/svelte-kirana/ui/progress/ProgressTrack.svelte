<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { progress } from "../../../../styles/progress.styles"

  // Bits UI has no track part: the element Base UI's track renders.
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

<div data-slot="progress-track" {...rest} class={className} sx={progress.track}>
  {@render children?.()}
</div>
