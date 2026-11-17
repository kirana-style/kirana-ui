<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { MenuGroupLabel } from "@ui-sdk/svelte/menu"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { menuLabel, menuLabelWeight } from "../../../../styles/menu.styles"

  let {
    inset,
    class: className,
    children,
    ...rest
  }: {
   inset?: boolean 
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<UisdkPart part={MenuGroupLabel} slotName="context-menu-label" tag="div" data-inset={inset || undefined} {...rest} sx={[menuLabel, menuLabelWeight, className as Sx]}>
  {@render children?.()}
</UisdkPart>
