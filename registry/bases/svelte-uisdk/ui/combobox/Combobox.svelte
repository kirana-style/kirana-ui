<script lang="ts">
  import type { Snippet } from "svelte"
  import { Combobox } from "@ui-sdk/svelte/combobox"

  import { popupContainer } from "../../../../lib/svelte/uisdk-slot"
  import { setAnchors, setItems } from "./context"
  import type { ComboboxAnchors } from "./context"

  /**
   * ui-sdk's combobox, taking Base UI's API as Svelte's Ark UI part does: `items` (strings, objects
   * with a `label` and `value`, or groups with their own `items`), which `ComboboxList` and
   * `ComboboxCollection` draw through their snippet and ui-sdk filters as it is typed in; a value or
   * a list of them (`multiple`; `value` bound, or with `onValueChange` called with `{ value }`), in
   * the shape the items were given; `autoHighlight`; `itemToStringLabel` and `itemToStringValue`,
   * ui-sdk's `itemToLabel` and `itemToValue`. Its popup renders in the body, as Base UI's portal
   * puts it.
   */
  let {
    items,
    value = $bindable(),
    onValueChange,
    itemToStringLabel,
    itemToStringValue,
    children,
    ...rest
  }: {
    items?: readonly unknown[]
    defaultValue?: unknown
    value?: unknown
    onValueChange?: (details: { value: unknown }) => void
    multiple?: boolean
    autoHighlight?: boolean
    disabled?: boolean
    // `any`: a caller's callback takes its own items' type, which `unknown` would refuse.
    itemToStringLabel?: (item: any) => string
    itemToStringValue?: (item: any) => string
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  /** An item's label, as Base UI reads it: an object's `label`, else the item as text. */
  const labelOf = (item: unknown) =>
    typeof item === "object" && item !== null && "label" in item
      ? String((item as { label: unknown }).label)
      : String(item)

  setItems(() => items ?? [])
  const anchors = $state<ComboboxAnchors>({ chips: null, input: null, trigger: null })
  setAnchors(anchors)
</script>

<Combobox
  container={popupContainer()}
  itemToLabel={itemToStringLabel ?? labelOf}
  itemToValue={itemToStringValue}
  {value}
  {...rest}
  onValueChange={(next: unknown) => {
    value = next
    onValueChange?.({ value: next })
  }}
>
  {@render children?.()}
</Combobox>
