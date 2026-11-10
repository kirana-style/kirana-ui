<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import { untrack } from "svelte"
  import type { Snippet } from "svelte"
  import { ContextMenu } from "bits-ui"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import {
    menuCheckableRowPadding,
    menuRowBase,
  } from "../../../../styles/menu.styles"
  import { contextMenu } from "../../../../styles/context-menu.styles"

  /**
   * `bind:checked` (or `checked` with `onCheckedChange`, which gets `{ checked }`, as Svelte's other
   * parts report), or `defaultChecked` for an item that keeps its own, as Base UI's. It stays open
   * when chosen, as Base UI's does, unless `closeOnSelect`.
   */
  let {
    value: _value,
    defaultChecked = false,
    inset = false,
    checked = $bindable(null),
    closeOnSelect = false,
    onCheckedChange,
    class: className,
    children: rowChildren,
    ...rest
  }: {
    value?: string
    defaultChecked?: boolean
    inset?: boolean
    checked?: boolean | null
    closeOnSelect?: boolean
    onCheckedChange?: (details: { checked: boolean }) => void
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  // Read once, as Base UI reads a default.
  let own = $state(untrack(() => defaultChecked))
  const get = () => checked ?? own
  const set = (next: boolean) => {
    own = next
    checked = next
    onCheckedChange?.({ checked: next })
  }
</script>

<ContextMenu.CheckboxItem data-slot="context-menu-checkbox-item" bind:checked={get, set} {closeOnSelect} data-inset={inset || undefined} {...rest} sx={[menuRowBase, menuCheckableRowPadding, contextMenu.checkableRow, className as Sx]}>
  {#snippet children({ checked: on })}
    <span sx={contextMenu.indicator}>
      {#if on}
        <IconPlaceholder lucide="CheckIcon" tabler="IconCheck" hugeicons="Tick02Icon" phosphor="CheckIcon" remixicon="RiCheckLine" />
      {/if}
    </span>
    {@render rowChildren?.()}
  {/snippet}
</ContextMenu.CheckboxItem>
