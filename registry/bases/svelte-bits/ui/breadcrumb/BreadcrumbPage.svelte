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

<span data-slot="breadcrumb-page" role="link" aria-disabled="true" aria-current="page" {...rest} class={className} sx={breadcrumb.page}>
  {@render children?.()}
</span>
