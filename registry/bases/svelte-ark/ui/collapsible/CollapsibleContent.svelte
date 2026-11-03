<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { CollapsibleContentProps } from "@ark-ui/svelte"

  import { CollapsibleContent } from "@ark-ui/svelte"

  let {
    asChild,
    class: className,
    children,
    ...rest
  }: {
    asChild?: CollapsibleContentProps["asChild"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<CollapsibleContent {asChild} data-slot="collapsible-content" {...rest} sx={className as Sx}>
  {@render children?.()}
</CollapsibleContent>
