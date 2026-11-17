<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

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

<nav data-slot="breadcrumb" aria-label="breadcrumb" {...rest} class={className}>
  {@render children?.()}
</nav>
