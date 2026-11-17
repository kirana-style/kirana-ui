<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { MenuItemIndicator, MenuRadioItem } from "@ui-sdk/svelte/menu"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import {
    menuCheckableRowPadding,
    menuIndicator,
    menuRowBase,
  } from "../../../../styles/menu.styles"

  let {
    inset,
    value,
    class: className,
    children,
    ...rest
  }: {
   value: string; inset?: boolean 
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<UisdkPart part={MenuRadioItem} slotName="context-menu-radio-item" tag="div" closeOnSelect={false} value={value} data-inset={inset || undefined} {...rest} sx={[menuRowBase, menuCheckableRowPadding, className as Sx]}>
  <span data-slot="context-menu-radio-item-indicator" sx={menuIndicator}>
    <MenuItemIndicator >
      <IconPlaceholder lucide="CheckIcon" tabler="IconCheck" hugeicons="Tick02Icon" phosphor="CheckIcon" remixicon="RiCheckLine" />
    </MenuItemIndicator>
  </span>
  {@render children?.()}
</UisdkPart>
