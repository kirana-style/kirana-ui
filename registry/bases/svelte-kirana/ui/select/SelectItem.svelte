<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Select } from "@kirana-ui/svelte/select"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { menuCheckableRowPadding, menuIndicator, menuRowBase } from "../../../../styles/menu.styles"
  import { select } from "../../../../styles/select.styles"

  // Its entry: Base UI's `value` (`null` for the placeholder's), or an `item` with a `value`.
  let {
    item,
    value,
    class: className,
    children,
    ...rest
  }: {
    item?: unknown
    value?: string | null
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  const own = $derived(
    value !== undefined ? value : ((item as { value?: string | null } | undefined)?.value ?? null)
  )
</script>

<Select.Item data-slot="select-item" value={own} {...rest} sx={[menuRowBase, menuCheckableRowPadding, select.item, className as Sx]}>
  <Select.ItemText sx={select.itemText}>
    {@render children?.()}
  </Select.ItemText>
  <Select.ItemIndicator sx={[menuIndicator, select.indicator]}>
    <IconPlaceholder lucide="CheckIcon" tabler="IconCheck" hugeicons="Tick02Icon" phosphor="CheckIcon" remixicon="RiCheckLine" />
  </Select.ItemIndicator>
</Select.Item>
