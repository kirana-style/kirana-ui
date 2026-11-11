<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Combobox } from "bits-ui"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { combobox } from "../../../../styles/combobox.styles"
  import {
    menuCheckableRowPadding,
    menuIndicator,
    menuRowBase,
  } from "../../../../styles/menu.styles"
  import { useCombobox } from "./context"

  let {
    value,
    class: className,
    children: text,
    ...rest
  }: {
    /** Base UI's `value`: the item itself, as the combobox's `items` hold it. */
    value: unknown
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  const ctx = useCombobox()
</script>

<Combobox.Item
  data-slot="combobox-item"
  value={ctx.value(value)}
  label={ctx.label(value)}
  {...rest}
  sx={[menuRowBase, menuCheckableRowPadding, combobox.item, className as Sx]}
>
  {#snippet children({ selected })}
    {@render text?.()}
    {#if selected}
      <span sx={[menuIndicator, combobox.indicator]}>
        <IconPlaceholder lucide="CheckIcon" tabler="IconCheck" hugeicons="Tick02Icon" phosphor="CheckIcon" remixicon="RiCheckLine" />
      </span>
    {/if}
  {/snippet}
</Combobox.Item>
