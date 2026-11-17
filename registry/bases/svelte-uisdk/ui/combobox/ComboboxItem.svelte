<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { ComboboxItem, ComboboxItemIndicator } from "@ui-sdk/svelte/combobox"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { combobox } from "../../../../styles/combobox.styles"
  import {
    menuCheckableRowPadding,
    menuIndicator,
    menuRowBase,
  } from "../../../../styles/menu.styles"

  // Base UI's `value`: the item itself, as the combobox's `items` hold it.
  let {
    value,
    class: className,
    children,
    ...rest
  }: {
    value: unknown
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<UisdkPart
  part={ComboboxItem}
  slotName="combobox-item"
  {value}
  {...rest}
  sx={[menuRowBase, menuCheckableRowPadding, combobox.item, className as Sx]}
>
  {@render children?.()}
  <ComboboxItemIndicator>
    {#snippet render({ props }: { props: Record<PropertyKey, unknown> })}
      <span {...props} sx={[menuIndicator, combobox.indicator]}>
        <IconPlaceholder
          lucide="CheckIcon"
          tabler="IconCheck"
          hugeicons="Tick02Icon"
          phosphor="CheckIcon"
          remixicon="RiCheckLine"
        />
      </span>
    {/snippet}
  </ComboboxItemIndicator>
</UisdkPart>
