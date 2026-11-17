<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { CollapsibleTrigger } from "@ui-sdk/svelte/collapsible"

  import type { AsChild } from "../../../../lib/svelte/as-child"
  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"

  // `asChild`, as Svelte's Ark UI parts take it: a snippet given the trigger's props as a function.
  let {
    asChild,
    class: className,
    children,
    ...rest
  }: {
    asChild?: AsChild<"button">
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<UisdkPart
  part={CollapsibleTrigger}
  slotName="collapsible-trigger"
  tag="button"
  {asChild}
  {...rest}
  sx={className as Sx}
>
  {@render children?.()}
</UisdkPart>
