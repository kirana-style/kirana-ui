<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { marker } from "../../../../styles/marker.styles"

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

<span data-slot="marker-icon" aria-hidden="true" {...rest} sx={[marker.icon, className as Sx]}>
  {@render children?.()}
</span>
