<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { trace } from "../../../../styles/trace.styles"

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

<div data-slot="trace" {...rest} class={className} sx={trace.root}>
  {@render children?.()}
</div>
