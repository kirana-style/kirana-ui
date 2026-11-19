<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import { NavigationMenu } from "@kirana-ui/svelte/navigation-menu"

  import { navigationMenu } from "../../../../styles/navigation-menu.styles"

  let {
    class: className,
    ...rest
  }: {
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<NavigationMenu.Icon data-slot="navigation-menu-indicator" {...rest} sx={[navigationMenu.indicator, className as Sx]}>
  <div sx={navigationMenu.arrow}></div>
</NavigationMenu.Icon>
