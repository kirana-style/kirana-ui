<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import {
    SelectItem,
    SelectItemIndicator,
    SelectItemText,
    useSelectContext,
  } from "@ark-ui/svelte"
  import { getContext, onMount } from "svelte"
  import type { Snippet } from "svelte"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import {
    menuCheckableRowPadding,
    menuIndicator,
    menuRowBase,
  } from "../../../../styles/menu.styles"
  import { select } from "../../../../styles/select.styles"
  import { REGISTER } from "./placeholder"
  import type { Entry, RegisterContext } from "./placeholder"

  // Its entry of the select's collection: `item`, or the one Base UI's `value` names. `unknown`: a
  // caller's items are of its own type.
  let {
    item,
    value,
    disabled,
    class: className,
    children,
    ...rest
  }: {
    item?: unknown
    value?: string | null
    disabled?: boolean
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  const context = useSelectContext()
  const register = getContext<RegisterContext | undefined>(REGISTER)
  // Read from the markup, the item registers once its text is in the page (Svelte's children are
  // a snippet, which cannot be read before it renders); until then it is its own entry.
  let text = $state<HTMLElement | null>(null)
  const own: Entry = $derived({
    value: value ?? null,
    label: text?.textContent?.trim() ?? "",
    disabled: !!disabled,
  })
  onMount(() => register?.(own))
  const entry = $derived(item ?? context().collection.find(value ?? "") ?? own)
</script>

<SelectItem
  data-slot="select-item"
  item={entry}
  {...rest}
  sx={[menuRowBase, menuCheckableRowPadding, select.item, className as Sx]}
>
  <SelectItemText bind:ref={text} sx={select.itemText}>
    {@render children?.()}
  </SelectItemText>
  <SelectItemIndicator sx={[menuIndicator, select.indicator]}>
    <IconPlaceholder
      lucide="CheckIcon"
      tabler="IconCheck"
      hugeicons="Tick02Icon"
      phosphor="CheckIcon"
      remixicon="RiCheckLine"
    />
  </SelectItemIndicator>
</SelectItem>
