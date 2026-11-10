<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { PropsFn } from "../../../../lib/svelte/as-child"

  import Element from "../../../../lib/svelte/Element.svelte"

  import { badge } from "../../../../styles/badge.styles"

  let {
    variant = "default", asChild,
    class: className,
    children,
    ...rest
  }: {
    variant?: BadgeVariants["variant"]
    asChild?: Snippet<[PropsFn<"span">]>
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  type BadgeVariants = NonNullable<Parameters<typeof badge>[0]>
</script>

<Element as="span" data-slot="badge" data-variant={variant} {...rest} sx={[badge({ variant }), className as Sx]} {asChild}>
  {@render children?.()}
</Element>
