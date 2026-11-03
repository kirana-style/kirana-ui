<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { PropsFn } from "@ark-ui/svelte"

  import { Ark } from "@ark-ui/svelte"

  import { marker } from "../../../../styles/marker.styles"

  let {
    variant = "default", asChild,
    class: className,
    children,
    ...rest
  }: {
    variant?: MarkerVariants["variant"]
    asChild?: Snippet<[PropsFn<"div">]>
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  type MarkerVariants = NonNullable<Parameters<typeof marker.root>[0]>
</script>

<Ark as="div" data-slot="marker" data-variant={variant} {...rest} sx={[marker.scope, marker.root({ variant }), className as Sx]} {asChild}>
  {@render children?.()}
</Ark>
