<script lang="ts">
  import type { ClassValue,HTMLAttributes } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { card } from "../../../../styles/card.styles"

  let {
    size = "default",
    class: className,
    children,
    ...rest
  }: Omit<HTMLAttributes<HTMLDivElement>, "class"> & {
    size?: "default" | "sm"
    class?: ClassValue | null
    children?: Snippet
  } = $props()
</script>

<div data-slot="card" data-size={size} {...rest} class={className} sx={card.root}>
  {@render children?.()}
</div>
