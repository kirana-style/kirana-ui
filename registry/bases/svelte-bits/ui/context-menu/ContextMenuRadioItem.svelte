<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { ContextMenu } from "bits-ui"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import {
    menuCheckableRowPadding,
    menuRowBase,
  } from "../../../../styles/menu.styles"
  import { contextMenu } from "../../../../styles/context-menu.styles"

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

<ContextMenu.RadioItem data-slot="context-menu-radio-item" {value} {closeOnSelect} data-inset={inset || undefined} {...rest} sx={[menuRowBase, menuCheckableRowPadding, contextMenu.checkableRow, className as Sx]}>
  {#snippet children({ checked })}
    <span sx={contextMenu.indicator}>
      {#if checked}
        <IconPlaceholder lucide="CheckIcon" tabler="IconCheck" hugeicons="Tick02Icon" phosphor="CheckIcon" remixicon="RiCheckLine" />
      {/if}
    </span>
    {@render rowChildren?.()}
  {/snippet}
</ContextMenu.RadioItem>
