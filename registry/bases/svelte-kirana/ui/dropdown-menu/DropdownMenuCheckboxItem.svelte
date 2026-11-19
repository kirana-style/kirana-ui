<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import { untrack } from "svelte"
  import type { Snippet } from "svelte"
  import { Menu } from "@kirana-ui/svelte/menu"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import {
    menuCheckableRowPadding,
    menuIndicator,
    menuRowBase,
  } from "../../../../styles/menu.styles"

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

<Menu.CheckboxItem data-slot="dropdown-menu-checkbox-item" bind:checked={get, set} closeOnClick={closeOnSelect} data-inset={inset || undefined} {...rest} sx={[menuRowBase, menuCheckableRowPadding, className as Sx]}>
  <span data-slot="dropdown-menu-checkbox-item-indicator" sx={menuIndicator}>
    <Menu.CheckboxItemIndicator>
      <IconPlaceholder lucide="CheckIcon" tabler="IconCheck" hugeicons="Tick02Icon" phosphor="CheckIcon" remixicon="RiCheckLine" />
    </Menu.CheckboxItemIndicator>
  </span>
  {@render rowChildren?.()}
</Menu.CheckboxItem>
