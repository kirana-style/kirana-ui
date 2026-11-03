<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { aspectRatio } from "../../../../styles/aspect-ratio.styles"

  let {
    ratio,
    class: className,
    children,
    ...rest
  }: {
    ratio: number
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<div data-slot="aspect-ratio" style:--ratio={ratio} {...rest} sx={[aspectRatio, className as Sx]}>
  {@render children?.()}
</div>
