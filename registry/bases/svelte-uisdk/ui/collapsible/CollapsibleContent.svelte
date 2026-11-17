<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { CollapsiblePanel } from "@ui-sdk/svelte/collapsible"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"

  let {
    class: className,
    children,
    ...rest
  }: {
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<UisdkPart part={CollapsiblePanel} slotName="collapsible-content" {...rest} sx={className as Sx}>
  {@render children?.()}
</UisdkPart>
