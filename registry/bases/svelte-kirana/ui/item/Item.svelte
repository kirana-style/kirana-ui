<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { PropsFn } from "../../../../lib/svelte/as-child"

  import { Primitive } from "@kirana-ui/svelte/primitive"
  import { propsFn } from "../../../../lib/svelte/as-child"

  import { item } from "../../../../styles/item.styles"

  let {
    variant = "default",
    size = "default",
    asChild,
    class: className,
    children,
    ...rest
  }: {
    variant?: ItemVariants["variant"]
    size?: ItemVariants["size"]
    asChild?: Snippet<[PropsFn<"div">]>
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  type ItemVariants = NonNullable<Parameters<typeof item.root>[0]>
</script>

<!-- `asChild` (Ark UI's, given the props as a function) as the primitive's `child`. -->
{#snippet composed({ props }: { props: Record<string, unknown> })}
  {@render asChild?.(propsFn(props))}
{/snippet}

<Primitive as="div" data-slot="item" data-variant={variant} data-size={size} {...rest} sx={[item.scope, item.root({ variant, size }), className as Sx]} child={asChild && composed}>
  {@render children?.()}
</Primitive>
