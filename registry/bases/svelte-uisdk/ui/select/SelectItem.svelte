<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import {
    SelectItem,
    SelectItemIndicator,
    SelectItemText,
  } from "@ui-sdk/svelte/select"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import {
    menuCheckableRowPadding,
    menuIndicator,
    menuRowBase,
  } from "../../../../styles/menu.styles"
  import { select } from "../../../../styles/select.styles"

  let {
    value,
    class: className,
    children,
    ...rest
  }: {
   value?: string | null 
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<UisdkPart part={SelectItem} slotName="select-item" tag="div" value={value ?? undefined} {...rest} sx={[menuRowBase, menuCheckableRowPadding, select.item, className as Sx]}>
  <UisdkPart part={SelectItemText} slotName="select-item-text" tag="span" sx={select.itemText}>
    {@render children?.()}
  </UisdkPart>
  <SelectItemIndicator sx={[menuIndicator, select.indicator]}>
    <IconPlaceholder lucide="CheckIcon" tabler="IconCheck" hugeicons="Tick02Icon" phosphor="CheckIcon" remixicon="RiCheckLine" />
  </SelectItemIndicator>
</UisdkPart>
