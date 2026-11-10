<script lang="ts">
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

<ol data-slot="breadcrumb-list" {...rest} class={className} sx={breadcrumb.list}>
  {@render children?.()}
</ol>
