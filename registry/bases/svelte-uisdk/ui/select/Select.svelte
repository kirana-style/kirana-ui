<script lang="ts">
  import type { Snippet } from "svelte"
  import { Select } from "@ui-sdk/svelte/select"

  import { popupContainer } from "../../../../lib/svelte/uisdk-slot"
  import { setItems } from "./context"
  import type { Entry } from "./context"

  /**
   * ui-sdk's select, with Svelte's Ark UI part's props: `items` (an entry of value `null` is the
   * placeholder, which ui-sdk reads from `placeholder`), `defaultValue`, and `value` (bound, or
   * with `onValueChange` called with `{ value }`), one value (`null` for none) or several with
   * `multiple`. Its popup renders in the body, as Base UI's portal puts it.
   */
  let {
    items,
    value = $bindable(),
    onValueChange,
    children,
    ...rest
  }: {
    items?: readonly Entry[]
    /** Base UI's: one value, or several in a `multiple` select. */
    defaultValue?: string | string[]
    value?: string | string[] | null
    multiple?: boolean
    // `any`: one value or several, and a caller types its handler for its own.
    onValueChange?: (details: { value: any }) => void
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  setItems(() => items)
  const list = $derived(
    items
      ?.filter((item) => item.value !== null)
      .map((item) => ({
        value: item.value as string,
        label: item.label,
        disabled: item.disabled,
      }))
  )
  const placeholder = $derived(items?.find((item) => item.value === null)?.label)
</script>

<Select
  container={popupContainer()}
  items={list}
  {placeholder}
  {value}
  {...rest}
  onValueChange={(next: string | string[] | null) => {
    value = next
    onValueChange?.({ value: next })
  }}
>
  {@render children?.()}
</Select>
