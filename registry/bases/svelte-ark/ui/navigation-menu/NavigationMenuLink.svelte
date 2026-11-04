<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { NavigationMenuLinkProps } from "@ark-ui/svelte/navigation-menu"

  import { NavigationMenuLink } from "@ark-ui/svelte/navigation-menu"

  import { navigationMenu } from "../../../../styles/navigation-menu.styles"

  let {
    asChild, active = false,
    class: className,
    children,
    ...rest
  }: {
  
    /** Base UI's: the current page's link. */
    active?: boolean
    asChild?: NavigationMenuLinkProps["asChild"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<NavigationMenuLink data-slot="navigation-menu-link" current={active} {asChild} {...rest} sx={[navigationMenu.link, className as Sx]}>
  {@render children?.()}
</NavigationMenuLink>
