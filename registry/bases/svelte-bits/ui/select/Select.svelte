<script lang="ts">
  /**
   * Bits UI's select, taking Ark UI's props as Svelte's other parts do: `items` as Base UI's select
   * takes them (an entry whose `value` is `null` is the placeholder, which clears the choice), or
   * each `SelectItem` read from the markup. `bind:value` (or `value` with `onValueChange`, which gets
   * `{ value }`) is one value (`null` for none), or several in a `multiple` select, as Base UI's.
   * Bits' values are strings: the placeholder's `null` is its empty value.
   */
  import { untrack } from "svelte"
  import type { Snippet } from "svelte"
  import { Select } from "bits-ui"

  import { setSelect } from "./context"
  import type { Entry } from "./context"

  let {
    items,
    defaultValue,
    value = $bindable(),
    multiple = false,
    onValueChange,
    children,
    ...rest
  }: {
    items?: readonly Entry[]
    /** Base UI's: one value, or several in a `multiple` select. */
    defaultValue?: string | string[]
    value?: string | string[] | null
    multiple?: boolean
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  const list = (next: string | readonly string[] | null | undefined): string[] =>
    next === null || next === undefined ? [] : typeof next === "string" ? [next] : [...next]

  // Without `items`, the items are read from the markup, as Base UI's are.
  let registered = $state<Entry[]>([])
  // Read once, as Base UI reads a default.
  let own = $state(untrack(() => list(defaultValue)))
  const chosen = $derived(value === undefined ? own : list(value))
  const entries = $derived(items ?? registered)

  setSelect({
    get entries() {
      return entries
    },
    get placeholder() {
      return items?.find((item) => item.value === null)?.label
    },
    get value() {
      return chosen
    },
    register(entry) {
      if (items) return
      if (!registered.some((known) => known.value === entry.value))
        registered = [...registered, entry]
    },
  })

  /** A value reported in the shape the caller gave it: one, or the list. */
  const report = (next: string[]) =>
    multiple || Array.isArray(value) || Array.isArray(defaultValue)
      ? next
      : (next[0] ?? null)
  const get = () => (multiple ? chosen : (chosen[0] ?? ""))
  const set = (next: string | string[]) => {
    const values = list(next).filter((each) => each !== "")
    own = values
    value = report(values)
    // Undeclared, as on Ark UI: a caller's handler may take the one shape its select gives.
    ;(onValueChange as ((details: { value: string | string[] | null }) => void) | undefined)?.({ value: report(values) })
  }
  const bitsItems = $derived(
    entries.map((entry) => ({
      value: entry.value ?? "",
      label: entry.label,
      disabled: entry.disabled,
    }))
  )
  // Bits' root is typed by its `type`; the getter and setter take either shape.
  const Root = Select.Root as never as typeof Select.Root
</script>

<!-- Closed, the popup leaves the page, as Base UI's does; Bits keeps it while its exit runs. -->
<Root
  type={(multiple ? "multiple" : "single") as "single"}
  bind:value={get as () => string, set as (next: string) => void}
  items={bitsItems}
  {...rest}
>
  {@render children?.()}
</Root>
