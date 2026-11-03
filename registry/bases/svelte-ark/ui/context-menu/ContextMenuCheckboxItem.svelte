<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { MenuCheckboxItemProps } from "@ark-ui/svelte"

  import { MenuCheckboxItem, MenuItemIndicator } from "@ark-ui/svelte"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import {
    menuCheckableRowPadding,
    menuRowBase,
  } from "../../../../styles/menu.styles"
  import { contextMenu } from "../../../../styles/context-menu.styles"

  let {
    value,
    defaultChecked = false,
    inset = false,
    checked = $bindable(null),
    asChild,
    class: className,
    children,
    ...rest
  }: {
    value?: string
    defaultChecked?: boolean
    inset?: boolean
    /** `bind:checked`, or `defaultChecked` for an item that keeps its own, as Base UI's. */
    checked?: boolean | null
    asChild?: MenuCheckboxItemProps["asChild"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
  // The item's own state while the caller keeps none (`checked` is `null` then: a boolean would
  // read an absent one as `false`).
  // svelte-ignore state_referenced_locally
  let own = $state(defaultChecked)
  // Ark names every item with `value`, which its select events report; one without it gets its own.
  const id = $props.id()
</script>

<MenuCheckboxItem {asChild} data-slot="context-menu-checkbox-item" value={value ?? id} checked={checked ?? own} onCheckedChange={(next: boolean) => ((own = next), (checked = next))} data-inset={inset || undefined} {...rest} sx={[menuRowBase, menuCheckableRowPadding, contextMenu.checkableRow, className as Sx]}>
  <span sx={contextMenu.indicator}>
    <MenuItemIndicator>
      <IconPlaceholder lucide="CheckIcon" tabler="IconCheck" hugeicons="Tick02Icon" phosphor="CheckIcon" remixicon="RiCheckLine" />
    </MenuItemIndicator>
  </span>
  {@render children?.()}
</MenuCheckboxItem>
