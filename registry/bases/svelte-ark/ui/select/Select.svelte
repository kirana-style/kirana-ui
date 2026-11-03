<script lang="ts">
  /**
   * Ark's select is built from a collection: pass `items` as Base UI's select takes them (an entry
   * whose `value` is `null` is the placeholder), or a `collection` of your own
   * (`createListCollection`). Each `SelectItem` names its entry by `value`, or with `item`. A hidden
   * native select carries the value in a form. `bind:value` is one value (`null` for none), or
   * several in a `multiple` select, as Base UI's.
   */
  import {
    SelectHiddenSelect,
    SelectRoot,
    createListCollection,
    useLocaleContext,
  } from "@ark-ui/svelte"
  import type { ListCollection } from "@ark-ui/svelte"
  import { setContext } from "svelte"
  import type { Snippet } from "svelte"

  import { positioning as place } from "../../../../lib/placement"
  import { select } from "../../../../styles/select.styles"
  import { PLACEHOLDER, REGISTER } from "./placeholder"
  import type { Entry, PlaceholderContext, RegisterContext } from "./placeholder"
  import { PLACEMENT, TRIGGER_ID } from "./placement"
  import type { PlacementState, TriggerIdState } from "./placement"

  let {
    items,
    collection: given,
    defaultValue,
    value = $bindable(),
    children,
    ...rest
  }: {
    items?: readonly Entry[]
    // `any`: a caller's collection is of its own items, which `unknown` would refuse.
    // oxlint-disable-next-line no-explicit-any
    collection?: ListCollection<any>
    /** Base UI's: one value, or several in a `multiple` select. */
    defaultValue?: string | string[]
    value?: string | string[] | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  // Without `items` or a `collection`, the items are read from the markup, as Base UI's are: each
  // `SelectItem` registers its value and text.
  let registered = $state<Entry[]>([])
  setContext<RegisterContext>(REGISTER, (entry) => {
    if (items || given) return
    if (!registered.some((known) => known.value === entry.value))
      registered = [...registered, entry]
  })

  const collection = $derived(
    given ??
      createListCollection({
        // The placeholder's entry is the empty value, which clears the select as Base UI's does.
        items: items ?? registered,
        itemToString: (item: Entry) => item.label,
        itemToValue: (item: Entry) => item.value ?? "",
        isItemDisabled: (item: Entry) => !!item.disabled,
      })
  )
  setContext<PlaceholderContext>(
    PLACEHOLDER,
    () => items?.find((item) => item.value === null)?.label
  )
  // The content's `side`, `align` and offsets (Base UI's), placed from here as Ark places a popup.
  const placement = $state<PlacementState>({})
  setContext(PLACEMENT, placement)
  const trigger = $state<TriggerIdState>({})
  setContext(TRIGGER_ID, trigger)
  const locale = useLocaleContext()
  const positioning = $derived(place(placement, { rtl: locale?.()?.dir === "rtl" }))

  const list = (next: string | string[] | null | undefined) =>
    next === null ? [] : typeof next === "string" ? [next] : next
  /** A value reported in the shape the caller gave it: one, or the list. */
  const report = (next: string[]) =>
    Array.isArray(value) || Array.isArray(defaultValue) ? next : (next[0] ?? null)
</script>

<!-- Closed, the popup leaves the page, as BaseUI's does; Ark keeps it while its exit runs. -->
<SelectRoot
  lazyMount
  unmountOnExit
  {collection}
  defaultValue={list(defaultValue)}
  value={value === undefined ? undefined : list(value)}
  {positioning}
  ids={trigger.id ? { trigger: trigger.id } : undefined}
  sx={select.rootArk}
  {...rest}
  onValueChange={(details) => (value = report(details.value))}
>
  {@render children?.()}
  <SelectHiddenSelect />
</SelectRoot>
