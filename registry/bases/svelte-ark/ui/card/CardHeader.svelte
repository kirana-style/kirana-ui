<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue,HTMLAttributes } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { card } from "../../../../styles/card.styles"

  let {
    class: className,
    children,
    ...rest
  }: Omit<HTMLAttributes<HTMLDivElement>, "class"> & {
    class?: ClassValue | null
    children?: Snippet
  } = $props()
</script>

<div data-slot="card-header" {...rest} sx={[card.header, className as Sx]}>
  {@render children?.()}
</div>
