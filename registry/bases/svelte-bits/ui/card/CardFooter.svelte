<script lang="ts">
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

<div data-slot="card-footer" {...rest} class={className} sx={card.footer}>
  {@render children?.()}
</div>
