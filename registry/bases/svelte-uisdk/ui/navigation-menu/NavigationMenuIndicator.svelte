<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { NavigationMenuIndicator } from "@ui-sdk/svelte/navigation-menu"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { navigationMenu } from "../../../../styles/navigation-menu.styles"

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

<!-- The arrow under the open trigger: ui-sdk's indicator, which follows it. -->
<UisdkPart part={NavigationMenuIndicator} slotName="navigation-menu-indicator" tag="span" {...rest} sx={[navigationMenu.indicator, className as Sx]}>
  <div sx={navigationMenu.arrow}></div>
</UisdkPart>
