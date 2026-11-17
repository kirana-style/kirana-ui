<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { DrawerTitle } from "@ui-sdk/svelte/drawer"

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

<UisdkPart part={DrawerTitle} slotName="drawer-title" tag="h2" {...rest} sx={[drawer.title, className as Sx]}>
  {@render children?.()}
</UisdkPart>
