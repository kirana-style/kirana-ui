<script lang="ts">
  import type { Snippet } from "svelte"
  import type { HTMLAttributes } from "svelte/elements"

  import { card } from "../../../../styles/card.styles"

  let {
    size = "default",
    class: className,
    children,
    ...rest
  }: Omit<HTMLAttributes<HTMLDivElement>, "class"> & {
    size?: "default" | "sm"
    class?: string
    children?: Snippet
  } = $props()
</script>

<div data-slot="card" data-size={size} {...rest} sx={[card.root, className]}>
  {@render children?.()}
</div>
