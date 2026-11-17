<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { NavigationMenuItem } from "@ui-sdk/svelte/navigation-menu"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { navigationMenu } from "../../../../styles/navigation-menu.styles"

  let {
    value,
    class: className,
    children,
    ...rest
  }: {
   value?: string 
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<UisdkPart part={NavigationMenuItem} slotName="navigation-menu-item" tag="li" value={value} {...rest} sx={[navigationMenu.item, className as Sx]}>
  {@render children?.()}
</UisdkPart>
