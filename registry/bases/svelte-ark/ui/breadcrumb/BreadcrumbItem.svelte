<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { breadcrumb } from "../../../../styles/breadcrumb.styles"

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

<li data-slot="breadcrumb-item" {...rest} sx={[breadcrumb.item, className as Sx]}>
  {@render children?.()}
</li>
