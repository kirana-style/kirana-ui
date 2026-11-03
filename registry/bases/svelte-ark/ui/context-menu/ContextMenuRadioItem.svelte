<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { MenuRadioItemProps } from "@ark-ui/svelte"

  import { MenuItemIndicator, MenuRadioItem } from "@ark-ui/svelte"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import {
    menuCheckableRowPadding,
    menuRowBase,
  } from "../../../../styles/menu.styles"
  import { contextMenu } from "../../../../styles/context-menu.styles"

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

<MenuRadioItem {asChild} data-slot="context-menu-radio-item" value={value} data-inset={inset || undefined} {...rest} sx={[menuRowBase, menuCheckableRowPadding, contextMenu.checkableRow, className as Sx]}>
  <span sx={contextMenu.indicator}>
    <MenuItemIndicator>
      <IconPlaceholder lucide="CheckIcon" tabler="IconCheck" hugeicons="Tick02Icon" phosphor="CheckIcon" remixicon="RiCheckLine" />
    </MenuItemIndicator>
  </span>
  {@render children?.()}
</MenuRadioItem>
