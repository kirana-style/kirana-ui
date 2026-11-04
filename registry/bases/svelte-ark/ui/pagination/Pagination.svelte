<script lang="ts">
  import type { Sx } from "@kirana-style/core"
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

<nav role="navigation" aria-label="pagination" data-slot="pagination" {...rest} sx={[pagination.root, className as Sx]}>
  {@render children?.()}
</nav>
