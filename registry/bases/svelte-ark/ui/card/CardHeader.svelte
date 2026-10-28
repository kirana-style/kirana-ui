<script lang="ts">
  import type { Snippet } from "svelte"
  import type { HTMLAttributes } from "svelte/elements"

  import { card } from "../../../../styles/card.styles"

  let {
    class: className,
    children,
    ...rest
  }: Omit<HTMLAttributes<HTMLDivElement>, "class"> & {
    class?: string
    children?: Snippet
  } = $props()
</script>

<div data-slot="card-header" {...rest} sx={[card.header, className]}>
  {@render children?.()}
</div>
