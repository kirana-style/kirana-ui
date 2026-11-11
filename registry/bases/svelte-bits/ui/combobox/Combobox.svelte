<script lang="ts">
  /**
   * Bits UI's combobox, taking Base UI's API as the Ark UI part does: `items` (strings, objects
   * with a `label` and `value`, or groups with their own `items`), filtered by what is typed as Base
   * UI's are (Bits does not filter), with `ComboboxList` and `ComboboxCollection` drawing each match
   * through their `children` snippet; a value or a list of them (`multiple`), in the shape the items
   * were given, reported as `onValueChange({ value })`.
   */
  import { Combobox } from "bits-ui"
  import { setContext } from "svelte"
  import type { Snippet } from "svelte"

  import { COMBOBOX } from "./context"
  import type { ComboboxContext } from "./context"

  let {
    items = [],
    defaultValue,
    value: controlled,
    onValueChange,
    multiple = false,
    // Bits highlights the first match as the person types, whatever this says.
    autoHighlight: _autoHighlight = false,
    disabled = false,
    itemToStringLabel,
    itemToStringValue,
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
    // `any`: a caller's callback takes its own items' type, which `unknown` would refuse.
    // oxlint-disable-next-line no-explicit-any
    itemToStringLabel?: (item: any) => string
    // oxlint-disable-next-line no-explicit-any
    itemToStringValue?: (item: any) => string
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  const isGroup = (item: unknown): item is { items: unknown[] } =>
    typeof item === "object" && item !== null && Array.isArray((item as { items?: unknown }).items)
  const label = (item: unknown) =>
    itemToStringLabel?.(item) ??
    (typeof item === "object" && item !== null && "label" in item
      ? String((item as { label: unknown }).label)
      : String(item))
  /**
   * An item's value string for Bits. Bits reads an empty value as no choice, where Base UI's items
   * may have one (upstream's "Select country"), so an empty one goes to Bits as a stand-in; every
   * lookup goes through here, both ways.
   */
  const EMPTY = "\u0000empty"
  const value = (item: unknown) => {
    const raw =
      itemToStringValue?.(item) ??
      (typeof item === "object" && item !== null && "value" in item
        ? String((item as { value: unknown }).value)
        : String(item))
    return raw === "" ? EMPTY : raw
  }

  const leaves = $derived(items.flatMap((item) => (isGroup(item) ? item.items : [item])))
  // Bits resolves a chosen value's label (the input's text) from these.
  const entries = $derived(leaves.map((item) => ({ value: value(item), label: label(item) })))

  // What is typed, while it is typed: an input showing the chosen item's label lists every item.
  let query = $state("")
  const matches = (item: unknown) => label(item).toLowerCase().includes(query.trim().toLowerCase())
  const filter = (pool: readonly unknown[]) => pool.filter(matches)
  const filtered = $derived(
    items.flatMap((item) => {
      if (!isGroup(item)) return matches(item) ? [item] : []
      return filter(item.items).length ? [item] : []
    })
  )

  const list = (v: unknown) => (v === undefined || v === null ? [] : Array.isArray(v) ? v : [v])
  // svelte-ignore state_referenced_locally
  let own = $state<unknown[]>(list(defaultValue))
  const selected = $derived(controlled === undefined ? own : list(controlled))
  // The input's text, passed to Bits one way (its prop is not bindable): the chosen item's label at
  // first, what is typed, or nothing once cleared.
  // svelte-ignore state_referenced_locally
  let inputValue = $state(!multiple && own[0] !== undefined ? label(own[0]) : "")

  function report(values: string[]) {
    const chosen = values
      .map((v) => leaves.find((item) => value(item) === v))
      .filter((item) => item !== undefined)
    own = chosen
    query = ""
    // A multiple combobox's input empties once an item is chosen, as Base UI's does.
    if (multiple) inputValue = ""
    onValueChange?.({ value: multiple ? chosen : (chosen[0] ?? null) })
  }
  const remove = (item: unknown) => report(selected.filter((s) => s !== item).map(value))
  function clear() {
    report([])
    inputValue = ""
  }

  let chips = $state(false)
  let anchor = $state<HTMLElement | null>(null)

  setContext<ComboboxContext>(COMBOBOX, {
    get filtered() {
      return filtered
    },
    filter,
    label,
    value,
    get selected() {
      return selected
    },
    remove,
    clear,
    get query() {
      return query
    },
    set query(next) {
      query = next
      // What is typed is the input's text too, so a clear (`""`) reaches Bits even after typing.
      inputValue = next
    },
    get chips() {
      return chips
    },
    set chips(next) {
      chips = next
    },
    get anchor() {
      return anchor
    },
    set anchor(next) {
      anchor = next
    },
  })

  // Closed, what was typed no longer filters: the next opening lists every item, as Base UI's.
  const opened = (open: boolean) => {
    if (!open) query = ""
  }
</script>

<!-- Bits' root renders no element, as Base UI's; closed, the popup leaves the page. -->
{#if multiple}
  <Combobox.Root
    type="multiple"
    items={entries}
    value={selected.map(value)}
    onValueChange={(values) => report(values)}
    {inputValue}
    {disabled}
    onOpenChange={opened}
    {...rest}
  >
    {@render children?.()}
  </Combobox.Root>
{:else}
  <Combobox.Root
    type="single"
    items={entries}
    value={selected[0] !== undefined ? value(selected[0]) : ""}
    onValueChange={(next) => report(next ? [next] : [])}
    {inputValue}
    allowDeselect={false}
    {disabled}
    onOpenChange={opened}
    {...rest}
  >
    {@render children?.()}
  </Combobox.Root>
{/if}
