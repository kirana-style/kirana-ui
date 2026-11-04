<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { ComboboxItemProps } from "@ark-ui/svelte"

  import { ComboboxItem, ComboboxItemIndicator } from "@ark-ui/svelte"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { combobox } from "../../../../styles/combobox.styles"
  import {
    menuCheckableRowPadding,
    menuIndicator,
    menuRowBase,
  } from "../../../../styles/menu.styles"

  let {
    value, asChild,
    class: className,
    children,
    ...rest
  }: {
    value: unknown
    asChild?: ComboboxItemProps["asChild"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  // Base UI's `value`: the item itself, as the combobox's `items` hold it.
</script>

<ComboboxItem {asChild} data-slot="combobox-item" item={value} {...rest} sx={[menuRowBase, menuCheckableRowPadding, combobox.item, className as Sx]}>
  {@render children?.()}
  <ComboboxItemIndicator>
    {#snippet asChild(props)}
      <span {...props()} class={props().class} style={props().style} sx={[menuIndicator, combobox.indicator]}>
        <IconPlaceholder lucide="CheckIcon" tabler="IconCheck" hugeicons="Tick02Icon" phosphor="CheckIcon" remixicon="RiCheckLine" />
      </span>
    {/snippet}
  </ComboboxItemIndicator>
</ComboboxItem>
