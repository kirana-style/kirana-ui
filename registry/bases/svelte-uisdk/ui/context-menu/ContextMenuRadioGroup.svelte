<script lang="ts">
  import type { Snippet } from "svelte"
  import { MenuRadioGroup } from "@ui-sdk/svelte/menu"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"

  /** ui-sdk's radio group, taking Svelte's Ark UI part's props: `value`, and `onValueChange` called with `{ value }`. */
  let {
    value = $bindable(),
    onValueChange,
    children,
    ...rest
  }: {
    value?: string
    defaultValue?: string
    onValueChange?: (details: { value: string }) => void
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<UisdkPart
  part={MenuRadioGroup}
  slotName="context-menu-radio-group"
  {value}
  {...rest}
  onValueChange={(next: string) => {
    value = next
    onValueChange?.({ value: next })
  }}
>
  {@render children?.()}
</UisdkPart>
