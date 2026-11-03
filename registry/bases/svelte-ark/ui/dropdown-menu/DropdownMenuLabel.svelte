<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { MenuItemGroupLabelProps } from "@ark-ui/svelte"

  import { MenuItemGroupLabel } from "@ark-ui/svelte"

  import { menuLabel, menuLabelWeight } from "../../../../styles/menu.styles"

  let {
    inset = false, asChild,
    class: className,
    children,
    ...rest
  }: {
    inset?: boolean
    asChild?: MenuItemGroupLabelProps["asChild"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<MenuItemGroupLabel {asChild} data-slot="dropdown-menu-label" data-inset={inset || undefined} {...rest} sx={[menuLabel, menuLabelWeight, className as Sx]}>
  {@render children?.()}
</MenuItemGroupLabel>
