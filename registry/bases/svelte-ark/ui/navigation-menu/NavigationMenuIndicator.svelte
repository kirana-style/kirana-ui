<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { NavigationMenuIndicatorProps } from "@ark-ui/svelte/navigation-menu"

  import { NavigationMenuIndicator } from "@ark-ui/svelte/navigation-menu"

  import { navigationMenu } from "../../../../styles/navigation-menu.styles"

  let {
    asChild,
    class: className,
    ...rest
  }: {
    asChild?: NavigationMenuIndicatorProps["asChild"]
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<NavigationMenuIndicator {asChild} data-slot="navigation-menu-indicator" {...rest} sx={[navigationMenu.indicator, className as Sx]}>
  <div sx={navigationMenu.arrow}></div>
</NavigationMenuIndicator>
