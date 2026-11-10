<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { pagination } from "../../../../styles/pagination.styles"

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

<ul data-slot="pagination-content" {...rest} class={className} sx={pagination.content}>
  {@render children?.()}
</ul>
