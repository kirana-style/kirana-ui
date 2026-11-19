<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Combobox } from "@kirana-ui/svelte/combobox"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { combobox } from "../../../../styles/combobox.styles"
  import { menuCheckableRowPadding, menuIndicator, menuRowBase } from "../../../../styles/menu.styles"
  import { useCombobox } from "./context"

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

  const context = useCombobox()
</script>

<Combobox.Item data-slot="combobox-item" {value} label={context.label(value)} {...rest} sx={[menuRowBase, menuCheckableRowPadding, combobox.item, className as Sx]}>
  {@render children?.()}
  <Combobox.ItemIndicator sx={[menuIndicator, combobox.indicator]}>
    <IconPlaceholder lucide="CheckIcon" tabler="IconCheck" hugeicons="Tick02Icon" phosphor="CheckIcon" remixicon="RiCheckLine" />
  </Combobox.ItemIndicator>
</Combobox.Item>
