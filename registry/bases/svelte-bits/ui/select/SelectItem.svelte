<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import { onMount } from "svelte"
  import type { Snippet } from "svelte"
  import { Select } from "bits-ui"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import {
    menuCheckableRowPadding,
    menuIndicator,
    menuRowBase,
  } from "../../../../styles/menu.styles"
  import { select } from "../../../../styles/select.styles"
  import { useSelect } from "./context"
  import type { Entry } from "./context"

  // Its entry: Base UI's `value` (`null` for the placeholder's), or `item`, an entry of `items`.
  let {
    item,
    value,
    disabled,
    class: className,
    children: text,
    ...rest
  }: {
    item?: unknown
    value?: string | null
    disabled?: boolean
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  const context = useSelect()
  const own = $derived(
    value !== undefined
      ? value
      : ((item as { value?: string | null } | undefined)?.value ?? null)
  )
  // Read from the markup, the item registers once its text is in the page (Svelte's children are
  // a snippet, which cannot be read before it renders).
  let label = $state<HTMLElement | null>(null)
  onMount(() => {
    const entry: Entry = {
      value: own,
      label: label?.textContent?.trim() ?? "",
      disabled: !!disabled,
    }
    context?.register(entry)
  })
  const named = $derived(context?.entries.find((entry) => entry.value === own)?.label)
</script>

<Select.Item
  data-slot="select-item"
  value={own ?? ""}
  label={named ?? label?.textContent?.trim()}
  {disabled}
  {...rest}
  sx={[menuRowBase, menuCheckableRowPadding, select.item, className as Sx]}
>
  {#snippet children({ selected })}
    <span bind:this={label} sx={select.itemText}>
      {@render text?.()}
    </span>
    {#if selected}
      <span sx={[menuIndicator, select.indicator]}>
        <IconPlaceholder lucide="CheckIcon" tabler="IconCheck" hugeicons="Tick02Icon" phosphor="CheckIcon" remixicon="RiCheckLine" />
      </span>
    {/if}
  {/snippet}
</Select.Item>
