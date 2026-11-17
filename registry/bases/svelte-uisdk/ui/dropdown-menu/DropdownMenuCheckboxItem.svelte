<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { MenuCheckboxItem, MenuItemIndicator } from "@ui-sdk/svelte/menu"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import {
    menuCheckableRowPadding,
    menuIndicator,
    menuRowBase,
  } from "../../../../styles/menu.styles"

  /**
   * ui-sdk's checkbox item, taking Svelte's Ark UI part's props: `checked` (bound, or with
   * `onCheckedChange` called with `{ checked }`), `defaultChecked`, `value`, `inset`. It stays open when
   * checked, as Base UI's does.
   */
  let {
    value,
    checked = $bindable(),
    onCheckedChange,
    inset,
    class: className,
    children,
    ...rest
  }: {
    value?: string
    checked?: boolean
    defaultChecked?: boolean
    onCheckedChange?: (details: { checked: boolean }) => void
    inset?: boolean
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  // Ark UI's item names itself when given no value; ui-sdk's needs one.
  const id = $props.id()
</script>

<UisdkPart
  part={MenuCheckboxItem}
  slotName="dropdown-menu-checkbox-item"
  closeOnSelect={false}
  value={value ?? id}
  {checked}
  data-inset={inset || undefined}
  {...rest}
  onCheckedChange={(next: boolean) => {
    checked = next
    onCheckedChange?.({ checked: next })
  }}
  sx={[menuRowBase, menuCheckableRowPadding, className as Sx]}
>
  <span data-slot="dropdown-menu-checkbox-item-indicator" sx={menuIndicator}>
    <MenuItemIndicator>
      <IconPlaceholder
        lucide="CheckIcon"
        tabler="IconCheck"
        hugeicons="Tick02Icon"
        phosphor="CheckIcon"
        remixicon="RiCheckLine"
      />
    </MenuItemIndicator>
  </span>
  {@render children?.()}
</UisdkPart>
