<script lang="ts">
  import type { Snippet } from "svelte"
  import { Select } from "@kirana-ui/svelte/select"
  import { untrack } from "svelte"

  import { setSelect } from "./context"
  import type { Entry } from "./context"

  /**
   * Kirana UI's select, with Svelte's Ark UI parts' props: `items` (an item of value `null` names
   * the placeholder), `value` (bindable) and `defaultValue`, a list with `multiple`, as Kirana UI's
   * `values`; `onValueChange` gets `{ value }`.
   */
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
    defaultValue?: string | string[]
    value?: string | string[] | null
    multiple?: boolean
    /** Given `{ value }`, typed by the caller: one value, or a list with `multiple`. */
    // oxlint-disable-next-line no-explicit-any
    onValueChange?: (details: { value: any }) => void
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  const list = (next: string | readonly string[] | null | undefined): string[] =>
    next === null || next === undefined ? [] : typeof next === "string" ? [next] : [...next]

  let own = $state(untrack(() => list(defaultValue)))
  const chosen = $derived(value === undefined ? own : list(value))
  const labels = $derived(
    items
      ?.filter((item) => item.value !== null)
      .map((item) => ({ value: item.value as string, label: item.label }))
  )

  setSelect({
    get entries() {
      return items ?? []
    },
    get placeholder() {
      return items?.find((item) => item.value === null)?.label
    },
    get value() {
      return chosen
    },
    register() {},
  })

  const report = (next: string[]) => {
    own = next
    const told = multiple ? next : (next[0] ?? null)
    value = told
    onValueChange?.({ value: told })
  }
</script>

{#if multiple}
  <Select.Root
    multiple
    items={labels}
    values={chosen}
    onValuesChange={(next: unknown[]) => report(next as string[])}
    {...rest}
  >
    {@render children?.()}
  </Select.Root>
{:else}
  <Select.Root
    items={labels}
    value={chosen[0] ?? null}
    onValueChange={(next: unknown) => report(next == null ? [] : [next as string])}
    {...rest}
  >
    {@render children?.()}
  </Select.Root>
{/if}
