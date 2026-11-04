<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { item } from "../../../../styles/item.styles"

  let {
    variant = "default",
    class: className,
    children,
    ...rest
  }: {
    variant?: ItemMediaVariants["variant"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  type ItemMediaVariants = NonNullable<Parameters<typeof item.media>[0]>
</script>

<div data-slot="item-media" data-variant={variant} {...rest} sx={[item.media({ variant }), className as Sx]}>
  {@render children?.()}
</div>
