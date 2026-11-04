<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { PropsFn } from "@ark-ui/svelte"

  import { Ark } from "@ark-ui/svelte"

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

<Ark as="div" data-slot="item" data-variant={variant} data-size={size} {...rest} sx={[item.scope, item.root({ variant, size }), className as Sx]} {asChild}>
  {@render children?.()}
</Ark>
