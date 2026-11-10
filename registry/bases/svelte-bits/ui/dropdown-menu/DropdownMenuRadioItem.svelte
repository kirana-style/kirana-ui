<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { DropdownMenu } from "bits-ui"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import {
    menuCheckableRowPadding,
    menuIndicator,
    menuRowBase,
  } from "../../../../styles/menu.styles"

  // It stays open when chosen, as Base UI's does, unless `closeOnSelect`.
  let {
    value,
    inset = false,
    closeOnSelect = false,
    class: className,
    children: rowChildren,
    ...rest
  }: {
    value: string
    inset?: boolean
    closeOnSelect?: boolean
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<DropdownMenu.RadioItem data-slot="dropdown-menu-radio-item" {value} {closeOnSelect} data-inset={inset || undefined} {...rest} sx={[menuRowBase, menuCheckableRowPadding, className as Sx]}>
  {#snippet children({ checked })}
    <span data-slot="dropdown-menu-radio-item-indicator" sx={menuIndicator}>
      {#if checked}
        <IconPlaceholder lucide="CheckIcon" tabler="IconCheck" hugeicons="Tick02Icon" phosphor="CheckIcon" remixicon="RiCheckLine" />
      {/if}
    </span>
    {@render rowChildren?.()}
  {/snippet}
</DropdownMenu.RadioItem>
