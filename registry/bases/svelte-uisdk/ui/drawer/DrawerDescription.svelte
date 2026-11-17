<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { DrawerDescription } from "@ui-sdk/svelte/drawer"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { drawer } from "../../../../styles/drawer.styles"

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

<UisdkPart part={DrawerDescription} slotName="drawer-description" tag="p" {...rest} sx={[drawer.description, className as Sx]}>
  {@render children?.()}
</UisdkPart>
