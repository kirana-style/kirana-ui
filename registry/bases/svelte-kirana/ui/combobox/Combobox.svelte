<script lang="ts">
  import type { Snippet } from "svelte"
  import { Combobox } from "@kirana-ui/svelte/combobox"
  import { untrack } from "svelte"

  import { setCombobox } from "./context"

  /**
   * Kirana UI's combobox, with Base UI's items-driven API as Svelte's Ark UI parts take it: `items`
   * go to the list's snippet (Kirana UI filters the items by their text), and their labels to
   * Kirana UI's `items`, so the input shows a chosen item before the list opens; `multiple` makes
   * `value` and `defaultValue` lists. The values are the items themselves.
   */
  let {
    items = [],
    defaultValue,
    value: controlled,
    onValueChange,
    multiple = false,
    autoHighlight = false,
    disabled = false,
    itemToStringLabel,
    itemToStringValue: _itemToStringValue,
    children,
    ...rest
  }: {
    items?: readonly unknown[]
    defaultValue?: unknown
    /** One item (`null` for none), or a list in a `multiple` combobox, with `onValueChange`. */
    value?: unknown
    onValueChange?: (details: { value: unknown }) => void
    multiple?: boolean
    autoHighlight?: boolean
    disabled?: boolean
    // oxlint-disable-next-line no-explicit-any
    itemToStringLabel?: (item: any) => string
    /** Base UI's object values' keys: Kirana UI compares values itself, so taken only. */
    // oxlint-disable-next-line no-explicit-any
    itemToStringValue?: (item: any) => string
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  const isGroup = (item: unknown): item is { items: unknown[] } =>
    typeof item === "object" &&
    item !== null &&
    Array.isArray((item as { items?: unknown }).items)
  const label = (item: unknown) =>
    itemToStringLabel?.(item) ??
    (typeof item === "object" && item !== null && "label" in item
      ? String((item as { label: unknown }).label)
      : String(item))
  const leaves = $derived(items.flatMap((item) => (isGroup(item) ? item.items : [item])))
  const labels = $derived(leaves.map((item) => ({ value: item, label: label(item) })))
  const list = (v: unknown) => (v === undefined || v === null ? [] : Array.isArray(v) ? v : [v])

  // What `ComboboxValue` hands its snippet: the caller's while controlled, else the last chosen.
  // Raw, so an object item stays the item itself, which the root compares its values with, and not
  // a proxy of it.
  let own = $state.raw<unknown[]>(untrack(() => list(defaultValue)))
  const selected = $derived(controlled === undefined ? own : list(controlled))
  const report = (next: unknown) => {
    own = list(next)
    onValueChange?.({ value: next })
  }

  setCombobox({
    get items() {
      return items
    },
    get selected() {
      return selected
    },
    label,
  })
</script>

{#if multiple}
  <Combobox.Root
    multiple
    items={labels}
    value={selected}
    onValueChange={(next: unknown[]) => report(next)}
    {autoHighlight}
    {disabled}
    {...rest}
  >
    {@render children?.()}
  </Combobox.Root>
{:else}
  <Combobox.Root
    items={labels}
    value={selected[0] ?? null}
    onValueChange={(next: unknown) => report(next)}
    {autoHighlight}
    {disabled}
    {...rest}
  >
    {@render children?.()}
  </Combobox.Root>
{/if}
