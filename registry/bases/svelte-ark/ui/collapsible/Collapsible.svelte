<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { CollapsibleRootProps } from "@ark-ui/svelte"

  // Unstyled, as upstream's: a caller's `sx` is all it draws.
  import { CollapsibleRoot } from "@ark-ui/svelte"

  let {
    asChild,
    class: className,
    children,
    ...rest
  }: {
    asChild?: CollapsibleRootProps["asChild"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<!-- A closed panel leaves the page, as Base UI's does. -->
<CollapsibleRoot {asChild} data-slot="collapsible" lazyMount unmountOnExit {...rest} sx={className as Sx}>
  {@render children?.()}
</CollapsibleRoot>
