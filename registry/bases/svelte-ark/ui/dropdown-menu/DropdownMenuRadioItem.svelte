<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { MenuRadioItemProps } from "@ark-ui/svelte"

  import { MenuItemIndicator, MenuRadioItem } from "@ark-ui/svelte"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import {
    menuCheckableRowPadding,
    menuIndicator,
    menuRowBase,
  } from "../../../../styles/menu.styles"

  let {
    value, inset = false, asChild,
    class: className,
    children,
    ...rest
  }: {
    value: string
    inset?: boolean
    asChild?: MenuRadioItemProps["asChild"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  // Ark's required `value` is declared here and passed on, so a project's type checker sees it.
</script>

<MenuRadioItem {asChild} data-slot="dropdown-menu-radio-item" closeOnSelect={false} value={value} data-inset={inset || undefined} {...rest} sx={[menuRowBase, menuCheckableRowPadding, className as Sx]}>
  <span data-slot="dropdown-menu-radio-item-indicator" sx={menuIndicator}>
    <MenuItemIndicator>
      <IconPlaceholder lucide="CheckIcon" tabler="IconCheck" hugeicons="Tick02Icon" phosphor="CheckIcon" remixicon="RiCheckLine" />
    </MenuItemIndicator>
  </span>
  {@render children?.()}
</MenuRadioItem>
