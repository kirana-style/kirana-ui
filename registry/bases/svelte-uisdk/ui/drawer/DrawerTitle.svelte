<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { DrawerTitle } from "@ui-sdk/svelte/drawer"

  import type { AsChild } from "../../../../lib/svelte/as-child"
  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { drawer } from "../../../../styles/drawer.styles"

  let {
    asChild,
    class: className,
    children,
    ...rest
  }: {
    asChild?: AsChild<"h2">
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<UisdkPart part={DrawerTitle} slotName="drawer-title" tag="h2" {asChild} {...rest} sx={[drawer.title, className as Sx]}>
  {@render children?.()}
</UisdkPart>
