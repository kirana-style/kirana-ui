<script lang="ts">
  /**
   * Ark UI's combobox, taking Base UI's API: `items` (strings, objects with a `label` and `value`,
   * or groups with their own `items`), filtered by what is typed as Base UI's are, with
   * `ComboboxList` and `ComboboxCollection` drawing each match through their `children` snippet; a
   * value or a list of them (`multiple`), in the shape the items were given; `autoHighlight`.
   */
  import { ComboboxRoot, createListCollection, useLocaleContext } from "@ark-ui/svelte"
  import { setContext } from "svelte"
  import type { Snippet } from "svelte"

  import { positioning as place } from "../../../../lib/placement"
  import type { PlacementProps } from "../../../../lib/placement"
  import { combobox } from "../../../../styles/combobox.styles"
  import { COMBOBOX } from "./context"
  import type { ComboboxContext } from "./context"

  let {
    items = [],
    defaultValue,
    value: controlled,
    onValueChange,
    multiple = false,
    autoHighlight = false,
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
  const value = (item: unknown) =>
    itemToStringValue?.(item) ??
    (typeof item === "object" && item !== null && "value" in item
      ? String((item as { value: unknown }).value)
      : String(item))

  const leaves = $derived(items.flatMap((item) => (isGroup(item) ? item.items : [item])))

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
  const collection = $derived(
    createListCollection({ items: leaves.filter(matches), itemToString: label, itemToValue: value })
  )

  const list = (v: unknown) => (v === undefined || v === null ? [] : Array.isArray(v) ? v : [v])
  // svelte-ignore state_referenced_locally
  let own = $state<unknown[]>(list(defaultValue))
  const selected = $derived(controlled === undefined ? own : list(controlled))
  function report(values: string[]) {
    const chosen = values
      .map((v) => leaves.find((item) => value(item) === v))
      .filter((item) => item !== undefined)
    own = chosen
    onValueChange?.({ value: multiple ? chosen : (chosen[0] ?? null) })
  }
  // Opened, Base UI's single combobox highlights its chosen item; Ark's highlights none.
  let highlighted = $state<string | null>(null)
  function opened(open: boolean) {
    if (open) highlighted = !multiple && selected[0] !== undefined ? value(selected[0]) : null
  }
  const remove = (item: unknown) => report(selected.filter((s) => s !== item).map(value))

  // The content's `side`, `align` and offsets (Base UI's), placed from here as Ark places a popup.
  let placement = $state<PlacementProps>({})
  const locale = useLocaleContext()
  const positioning = $derived(place(placement, { rtl: locale?.()?.dir === "rtl" }))
  let inputId = $state<string>()
  let chips = $state(false)

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
    get chips() {
      return chips
    },
    set chips(next) {
      chips = next
    },
    get placement() {
      return placement
    },
    set placement(next) {
      placement = next
    },
    get inputId() {
      return inputId
    },
    set inputId(next) {
      inputId = next
    },
  })
</script>

<!-- Closed, the popup leaves the page, as Base UI's does. -->
<ComboboxRoot
  lazyMount
  unmountOnExit
  {collection}
  value={selected.map(value)}
  defaultInputValue={!multiple && selected[0] !== undefined ? label(selected[0]) : undefined}
  {multiple}
  {disabled}
  inputBehavior={autoHighlight ? "autohighlight" : "none"}
  selectionBehavior={multiple ? "clear" : "replace"}
  {positioning}
  ids={inputId ? { input: inputId } : undefined}
  openOnClick
  highlightedValue={highlighted ?? undefined}
  sx={combobox.rootArk}
  {...rest}
  onValueChange={(details) => report(details.value)}
  onOpenChange={(details) => opened(details.open)}
  onHighlightChange={(details) => (highlighted = details.highlightedValue)}
  onInputValueChange={(details) =>
    (query = details.reason === "input-change" ? details.inputValue : "")}
>
  {@render children?.()}
</ComboboxRoot>
